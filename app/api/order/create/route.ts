import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone, preferredMonth } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !preferredMonth) {
      return NextResponse.json(
        { error: 'Všechna povinná pole musí být vyplněna' },
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

    // Prepare order data for BRJ API
    const orderData = {
      customer: {
        email: email,
        name: `${firstName} ${lastName}`,
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        newsletter: false,
        primaryLocale: 'cs',
        customerRealIp: request.ip || '127.0.0.1'
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
      returnUrl: `${request.nextUrl.origin}/dekujeme`
    };

    // Call BRJ API
    const response = await fetch(`https://brj.app/api/v1/shop/order/create?apiKey=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderData)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('BRJ API Error:', response.status, errorText);
      return NextResponse.json(
        { error: 'Chyba při vytváření objednávky' },
        { status: 500 }
      );
    }

    const result = await response.json();
    
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