import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const apiKey = process.env.BRJ_API_KEY;
    if (!apiKey) {
      console.error('BRJ_API_KEY is not configured');
      return NextResponse.json(
        { error: 'Chyba konfigurace serveru' },
        { status: 500 }
      );
    }

    const calendarCode = 'n4ovet83LZ0Poc3edn5gI919K9Tp75km';
    const step = request.nextUrl.searchParams.get('step') || 'month';
    const selectorFrom = request.nextUrl.searchParams.get('selectorFrom') || '';

    // Call BRJ API to get calendar events
    const response = await fetch(
      `https://brj.app/api/v1/calendar/event-list?apiKey=${apiKey}&code=${calendarCode}&step=${step}${selectorFrom ? `&selectorFrom=${selectorFrom}` : ''}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('BRJ API Error:', response.status, errorText);
      return NextResponse.json(
        { error: 'Chyba při načítání událostí z kalendáře' },
        { status: 500 }
      );
    }

    const result = await response.json();
    return NextResponse.json(result);

  } catch (error) {
    console.error('Calendar events fetch error:', error);
    return NextResponse.json(
      { error: 'Došlo k neočekávané chybě' },
      { status: 500 }
    );
  }
}