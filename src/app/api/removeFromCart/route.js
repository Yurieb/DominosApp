import { db } from '@/lib/db';
import { getCustomSession } from '../sessionCode';

export async function GET(req){
  const s = await getCustomSession();
  if(!s.email) return new Response('Unauthorized', { status: 401 });
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  const { ObjectId } = await import('mongodb');
  const dbo = await db();
  await dbo.collection('shopping_cart').deleteOne({ _id: new ObjectId(id), email: s.email });
  return Response.json({ ok: true });
}
