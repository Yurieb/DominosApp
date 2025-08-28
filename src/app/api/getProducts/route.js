import { db } from '@/lib/db';
export const dynamic = 'force-dynamic';

export async function GET(){
  const dbo = await db();
  const products = await dbo.collection('products').find().toArray();
  return Response.json(products);
}
