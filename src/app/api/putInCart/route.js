import { db } from '@/lib/db';
import { getCustomSession } from '../sessionCode';
export const dynamic = 'force-dynamic';

export async function GET(req){
  const { searchParams } = new URL(req.url);
  const pname = searchParams.get('pname');
  const price = searchParams.get('price'); 

  const s = await getCustomSession();
  const email = s.email || 'guest@example.com';

  const dbo = await db();
  await dbo.collection('shopping_cart').insertOne({
    email,
    pname,
    price: price ? Number(price) : null,
    ts: new Date()
  });

  return Response.json({ data: 'inserted' });
}
