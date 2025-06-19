import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// Test endpoint to verify Google Calendar integration
export async function GET(request: NextRequest) {
  try {
    const apiKey = process.env.GOOGLE_CALENDAR_API_KEY;
    const calendarId = process.env.GOOGLE_CALENDAR_ID;
    
    console.log('🔍 Testing Google Calendar Integration...');
    console.log('API Key present:', !!apiKey);
    console.log('Calendar ID present:', !!calendarId);
    console.log('Calendar ID value:', calendarId);
    
    if (!apiKey || !calendarId) {
      return NextResponse.json({
        success: false,
        error: 'Missing environment variables',
        apiKey: !!apiKey,
        calendarId: !!calendarId
      });
    }

    // Test Google Calendar API call
    const currentDate = new Date();
    const timeMin = currentDate.toISOString();
    
    const url = new URL('https://www.googleapis.com/calendar/v3/calendars/' + encodeURIComponent(calendarId) + '/events');
    url.searchParams.set('key', apiKey);
    url.searchParams.set('timeMin', timeMin);
    url.searchParams.set('singleEvents', 'true');
    url.searchParams.set('orderBy', 'startTime');
    url.searchParams.set('maxResults', '5');

    console.log('🚀 Making test request to Google Calendar API...');
    
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'VideoKurz.cz/1.0',
        'Accept': 'application/json',
      },
      signal: AbortSignal.timeout(10000),
    });

    console.log('📡 Response status:', response.status);
    console.log('📡 Response headers:', Object.fromEntries(response.headers.entries()));

    const responseText = await response.text();
    console.log('📄 Response body (first 200 chars):', responseText.substring(0, 200));

    if (!response.ok) {
      return NextResponse.json({
        success: false,
        error: 'Google Calendar API error',
        status: response.status,
        statusText: response.statusText,
        body: responseText
      });
    }

    const data = JSON.parse(responseText);
    
    return NextResponse.json({
      success: true,
      message: 'Google Calendar integration working!',
      eventsFound: data.items?.length || 0,
      events: data.items?.slice(0, 3).map((event: any) => ({
        id: event.id,
        summary: event.summary,
        start: event.start,
        end: event.end,
        location: event.location
      })) || [],
      calendarSummary: data.summary
    });

  } catch (error) {
    console.error('❌ Test error:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Unexpected error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}