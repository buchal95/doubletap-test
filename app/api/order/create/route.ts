import { NextRequest, NextResponse } from 'next/server';

interface OrderRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  preferredMonth: string;
  consent: boolean;
}

interface BRJOrderData {
  customer: {
    email: string;
    name: string;
    firstName: string;
    lastName: string;
    phone: string;
    newsletter: boolean;
    primaryLocale: string;
    customerRealIp: string;
  };
  items: Array<{
    label: string;
    price: number;
    vat: number;
    count: number;
    sale: number;
    unit: string;
  }>;
  locale: string;
  currency: string;
  publicNotice: string;
  internalNotice: string;
  returnUrl: string;
}

interface BRJOrderResponse {
  orderNumber: string;
  hash: string;
  links: {
    payLink: string;
    orderPageLink: string;
  };
}

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Phone validation regex (Czech format)
const phoneRegex = /^(\+420)?[0-9\s]{9,}$/;

export async function POST(request: NextRequest) {
  try {
    const body: OrderRequest = await request.json();
    const { firstName, lastName, email, phone, preferredMonth, consent } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !preferredMonth) {
      return NextResponse.json(
        { error: 'Všechna povinná pole musí být vyplněna' },
        { status: 400 }
      );
    }

    // Validate consent
    if (!consent) {
      return NextResponse.json(
        { error: 'Musíte souhlasit se zpracováním osobních údajů' },
        { status: 400 }
      );
    }

    // Validate email format
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Neplatný formát e-mailové adresy' },
        { status: 400 }
      );
    }

    // Validate phone format
    if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
      return NextResponse.json(
        { error: 'Neplatný formát telefonního čísla' },
        { status: 400 }
      );
    }

    // Validate preferred month
    const validMonths = ['Leden', 'Únor', 'Březen', 'Duben', 'Květen', 'Červen', 
                        'Červenec', 'Srpen', 'Září', 'Říjen', 'Listopad', 'Prosinec'];
    if (!validMonths.includes(preferredMonth)) {
      return NextResponse.json(
        { error: 'Neplatný preferovaný měsíc' },
        { status: 400 }
      );
    }

    const apiKey = process.env.BRJ_API_KEY;
    if (!apiKey) {
      console.error('BRJ_API_KEY is not configured');
      return NextResponse.json(
        { error: 'Chyba konfigurace serveru' },
        { status: 500 }
      );
    }

    // Get client IP address
    const clientIp = request.headers.get('x-forwarded-for') || 
                    request.headers.get('x-real-ip') || 
                    '127.0.0.1';

    // Get return URL
    const origin = request.headers.get('origin') || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    // Prepare order data for BRJ API
    const orderData: BRJOrderData = {
      customer: {
        email: email.toLowerCase().trim(),
        name: `${firstName.trim()} ${lastName.trim()}`,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        phone: phone.trim(),
        newsletter: false,
        primaryLocale: 'cs',
        customerRealIp: clientIp.split(',')[0].trim(), // Take first IP if multiple
      },
      items: [{
        label: 'Kurz profesionální tvorby videí',
        price: 2700,
        vat: 0,
        count: 1,
        sale: 0,
        unit: 'ks'
      }],
      locale: 'cs',
      currency: 'CZK',
      publicNotice: `Preferovaný měsíc: ${preferredMonth}`,
      internalNotice: `Registrace na kurz - preferovaný měsíc: ${preferredMonth}`,
      returnUrl: `${origin}/dekujeme`
    };

    // Call BRJ API
    const response = await fetch(`https://brj.app/api/v1/shop/order/create?apiKey=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'VideoKurz.cz/1.0',
      },
      body: JSON.stringify(orderData)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('BRJ API Error:', response.status, errorText);
      return NextResponse.json(
        { error: 'Chyba při vytváření objednávky' },
        { status: response.status }
      );
    }

    const result: BRJOrderResponse = await response.json();
    
    return NextResponse.json({
      success: true,
      orderNumber: result.orderNumber,
      hash: result.hash,
      payLink: result.links.payLink,
      orderPageLink: result.links.orderPageLink
    });

  } catch (error) {
    console.error('Order creation error:', error);
    return NextResponse.json(
      { error: 'Došlo k neočekávané chybě' },
      { status: 500 }
    );
  }
}