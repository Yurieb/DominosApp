export const dynamic = 'force-dynamic';
export async function GET(){
  const lat = process.env.WEATHER_LAT || '53.3498';
  const lon = process.env.WEATHER_LON || '-6.2603';
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
  const res = await fetch(url, { cache: 'no-store' });
  const data = await res.json();
  return Response.json({ city: 'Dublin', current: data.current_weather });
}
