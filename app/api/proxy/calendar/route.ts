import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

interface BRJEvent {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  isAllDay: boolean;
  locationTitle?: string;
}

interface BRJApiResponse {
  events: BRJEvent[];
}

// Handle CORS preflight requests
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

export async function GET(request: NextRequest) {
  try {
    const apiKey = process.env.BRJ_API_KEY;
    if (!apiKey) {
      console.error('BRJ_API_KEY is not configured');
      return NextResponse.json(
        { error: 'Chyba konfigurace serveru' },
        { 
          status: 500,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          }
        }
      );
    }

    const calendarCode = 'n4ovet83LZ0Poc3edn5gI919K9Tp75km';
    const step = request.nextUrl.searchParams.get('step') || 'month';
    const selectorFrom = request.nextUrl.searchParams.get('selectorFrom') || '';

    // Build URL with proper encoding
    const url = new URL('https://brj.app/api/v1/calendar/event-list');
    url.searchParams.set('apiKey', apiKey);
    url.searchParams.set('code', calendarCode);
    url.searchParams.set('step', step);
    if (selectorFrom) {
      url.searchParams.set('selectorFrom', selectorFrom);
    }

    // Call BRJ API to get calendar events
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'VideoKurz.cz/1.0',
      },
      // Add timeout and cache control
      next: { revalidate: 300 }, // Cache for 5 minutes
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('BRJ API Error:', response.status, errorText);
      return NextResponse.json(
        { error: 'Chyba při načítání událostí z kalendáře' },
        { 
          status: response.status,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          }
        }
      );
    }

    const result: BRJApiResponse = await response.json();
    
    // Add CORS headers for better browser compatibility
    return NextResponse.json(result, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    });

  } catch (error) {
    console.error('Calendar events fetch error:', error);
    return NextResponse.json(
      { error: 'Došlo k neočekávané chybě' },
      { 
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        }
      }
    );
  }
}