import { db } from '@/lib/db';

export async function GET(){
  const dbo = await db();
  const products = await dbo.collection('products').find().toArray();
  return Response.json(products);
}
