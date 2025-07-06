/**
 * Health Check API Route
 * 
 * Simple endpoint to check if the API is running
 */

import { NextResponse } from 'next/server';
import { CORS_HEADERS } from '../../../constants';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    return NextResponse.json(
      { 
        status: 'healthy',
        timestamp: new Date().toISOString(),
        version: process.env.npm_package_version || '1.0.0'
      },
      { 
        status: 200,
        headers: CORS_HEADERS
      }
    );
  } catch (error) {
    console.error('Health check failed:', error);
    
    return NextResponse.json(
      { 
        status: 'unhealthy',
        error: 'Internal server error',
        timestamp: new Date().toISOString()
      },
      { 
        status: 500,
        headers: CORS_HEADERS
      }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: CORS_HEADERS,
  });
}
