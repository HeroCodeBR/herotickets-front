import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, response: NextResponse) {
  const query = request.nextUrl.searchParams.get('input');
  console.log('🚀 ~ file: route.ts:5 ~ GET ~ query:', query);
  const result = await fetch(
    `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${query}&language=pt_BR&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`,
  );
  const data = await result.json();

  return NextResponse.json(data);
}
