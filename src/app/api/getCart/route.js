import { db } from '@/lib/db';
import { getCustomSession } from '../sessionCode';
export const dynamic = 'force-dynamic';

export async function GET(){
  const s = await getCustomSession();
  if(!s.email) return new Response('Unauthorized', { status: 401 });
  const dbo = await db();
  const items = await dbo.collection('shopping_cart').find({ email: s.email }).toArray();
  return Response.json(items);
}
