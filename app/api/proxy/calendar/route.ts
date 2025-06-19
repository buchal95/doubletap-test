import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

interface GoogleCalendarEvent {
  id: string;
  summary: string;
  start: {
    date?: string;
    dateTime?: string;
    timeZone?: string;
  };
  end: {
    date?: string;
    dateTime?: string;
    timeZone?: string;
  };
  location?: string;
  description?: string;
}

interface GoogleCalendarResponse {
  items: GoogleCalendarEvent[];
  nextPageToken?: string;
  summary?: string;
}

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
    const apiKey = process.env.GOOGLE_CALENDAR_API_KEY;
    const calendarId = process.env.GOOGLE_CALENDAR_ID;
    
    // Enhanced logging for debugging
    console.log('Google Calendar API Key exists:', !!apiKey);
    console.log('Google Calendar ID exists:', !!calendarId);
    
    if (!apiKey) {
      console.error('GOOGLE_CALENDAR_API_KEY is not configured');
      return NextResponse.json(
        { error: 'Chyba konfigurace serveru - chybí Google Calendar API klíč' },
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

    if (!calendarId) {
      console.error('GOOGLE_CALENDAR_ID is not configured');
      return NextResponse.json(
        { error: 'Chyba konfigurace serveru - chybí ID kalendáře' },
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
    
    // Get current date for timeMin parameter
    const currentDate = new Date();
    const timeMin = currentDate.toISOString();
    
    // Calculate timeMax (1 year from now) to limit results
    const timeMax = new Date();
    timeMax.setFullYear(timeMax.getFullYear() + 1);
    const timeMaxString = timeMax.toISOString();
    
    // Build Google Calendar API URL
    const url = new URL('https://www.googleapis.com/calendar/v3/calendars/' + encodeURIComponent(calendarId) + '/events');
    url.searchParams.set('key', apiKey);
    url.searchParams.set('timeMin', timeMin);
    url.searchParams.set('timeMax', timeMaxString);
    url.searchParams.set('singleEvents', 'true');
    url.searchParams.set('orderBy', 'startTime');
    url.searchParams.set('maxResults', '10');

    console.log('Calling Google Calendar API with params:', {
      calendarId: calendarId,
      timeMin: timeMin,
      timeMax: timeMaxString,
      url: url.toString().replace(apiKey, 'HIDDEN_API_KEY')
    });

    // Call Google Calendar API with enhanced error handling
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

    console.log('Google Calendar API Response Status:', response.status);
    console.log('Google Calendar API Response Headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Google Calendar API Error Details:', {
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
        errorMessage = 'Přístup zamítnut - zkontrolujte oprávnění kalendáře';
      } else if (response.status === 404) {
        errorMessage = 'Kalendář nenalezen';
      } else if (response.status >= 500) {
        errorMessage = 'Chyba serveru Google Calendar';
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
    console.log('Google Calendar API Response Body (first 500 chars):', responseText.substring(0, 500));

    let googleResult: GoogleCalendarResponse;
    try {
      googleResult = JSON.parse(responseText);
      
      // If the API returns an empty items array or no items property, return empty events
      if (!googleResult.items || !Array.isArray(googleResult.items)) {
        console.log('No events found in Google Calendar API response');
        googleResult = { items: [] };
      }
      
    } catch (parseError) {
      console.error('Failed to parse Google Calendar API response as JSON:', parseError);
      console.error('Response text:', responseText);
      
      // Return empty events array if parsing fails
      googleResult = { items: [] };
    }

    // Convert Google Calendar events to BRJ format for compatibility
    const convertedEvents: BRJEvent[] = googleResult.items.map((event: GoogleCalendarEvent) => {
      // Determine if event is all-day
      const isAllDay = !!(event.start.date && event.end.date);
      
      // Get start and end times
      let startTime: string;
      let endTime: string;
      
      if (isAllDay) {
        // For all-day events, use the date and add default times
        startTime = new Date(event.start.date + 'T09:00:00').toISOString();
        endTime = new Date(event.end.date + 'T17:00:00').toISOString();
      } else {
        // For timed events, use dateTime
        startTime = event.start.dateTime || new Date().toISOString();
        endTime = event.end.dateTime || new Date().toISOString();
      }

      return {
        id: event.id,
        title: event.summary || 'Kurz tvorby videí',
        startTime: startTime,
        endTime: endTime,
        isAllDay: isAllDay,
        locationTitle: event.location
      };
    });

    // Create response in BRJ format for compatibility
    const result: BRJApiResponse = {
      events: convertedEvents
    };

    console.log('Successfully processed events:', {
      eventsCount: result.events.length,
      hasEvents: Array.isArray(result.events),
      firstEvent: result.events[0] || null
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