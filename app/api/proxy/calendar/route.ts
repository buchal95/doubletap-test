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
    
    // Enhanced logging for debugging
    console.log('BRJ_API_KEY exists:', !!apiKey);
    
    if (!apiKey) {
      console.error('BRJ_API_KEY is not configured');
      return NextResponse.json(
        { error: 'Chyba konfigurace serveru - chybí API klíč' },
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

    // This is the calendar code provided in your project
    const calendarCode = 'n4ovet83LZ0Poc3edn5gI919K9Tp75km';
    
    // Get current date for selectorFrom parameter
    const currentDate = new Date();
    
    // Format date as YYYY-MM-DD for the API
    const selectorFrom = currentDate.toISOString().split('T')[0];
    
    // Build URL with proper encoding
    const url = new URL('https://brj.app/api/v1/calendar/event-list');
    url.searchParams.set('apiKey', apiKey);
    url.searchParams.set('code', calendarCode);
    url.searchParams.set('step', 'year'); // Changed from 'month' to 'year' to get events for the whole year
    url.searchParams.set('selectorFrom', selectorFrom);
    url.searchParams.set('returnPlainList', 'true'); // Try with plain list format

    console.log('Calling BRJ API with params:', {
      code: calendarCode,
      step: 'year', // Updated log to reflect the change
      selectorFrom: selectorFrom,
      url: url.toString().replace(apiKey, 'HIDDEN_API_KEY')
    });

    // Call BRJ API to get calendar events with enhanced error handling
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'VideoKurz.cz/1.0',
        'Accept': 'application/json',
      },
      // Add timeout
      signal: AbortSignal.timeout(15000), // 15 second timeout
    });

    console.log('BRJ API Response Status:', response.status);
    console.log('BRJ API Response Headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const errorText = await response.text();
      console.error('BRJ API Error Details:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText,
        url: url.toString().replace(apiKey, 'HIDDEN_API_KEY')
      });
      
      // Return a more specific error message based on status code
      let errorMessage = 'Chyba při načítání událostí z kalendáře';
      if (response.status === 401) {
        errorMessage = 'Neplatný API klíč';
      } else if (response.status === 403) {
        errorMessage = 'Přístup zamítnut';
      } else if (response.status === 404) {
        errorMessage = 'Kalendář nenalezen';
      } else if (response.status >= 500) {
        errorMessage = 'Chyba serveru kalendáře';
      }
      
      return NextResponse.json(
        { error: errorMessage, details: `HTTP ${response.status}` },
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

    const responseText = await response.text();
    console.log('BRJ API Response Body (first 500 chars):', responseText.substring(0, 500));

    let result: BRJApiResponse;
    try {
      result = JSON.parse(responseText);
      
      // If the API returns an empty events array or no events property, return empty events
      if (!result.events || !Array.isArray(result.events)) {
        console.log('No events found in API response');
        result = { events: [] };
      }
      
    } catch (parseError) {
      console.error('Failed to parse BRJ API response as JSON:', parseError);
      console.error('Response text:', responseText);
      
      // Return empty events array if parsing fails
      result = { events: [] };
    }

    console.log('Successfully processed events:', {
      eventsCount: result?.events?.length || 0,
      hasEvents: Array.isArray(result?.events),
      firstEvent: result?.events?.[0] || null
    });
    
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
    
    // Provide more specific error information
    let errorMessage = 'Došlo k neočekávané chybě';
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        errorMessage = 'Časový limit požadavku vypršel';
      } else if (error.message.includes('fetch')) {
        errorMessage = 'Chyba připojení k serveru kalendáře';
      }
    }
    
    // Return empty events array for error cases
    return NextResponse.json(
      { events: [] },
      { 
        status: 200, // Return 200 with empty data instead of error
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        }
      }
    );
  }
}