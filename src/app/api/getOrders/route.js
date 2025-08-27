import { db } from '@/lib/db';
import { getCustomSession } from '../sessionCode';

export async function GET(){
  const s = await getCustomSession();
  if(s.role !== 'manager') return new Response('Forbidden', { status: 403 });

  const dbo = await db();
  const orders = await dbo.collection('orders').find().sort({ ts: -1 }).toArray();
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((a,b)=> a + (Number(b.total) || 0), 0);

  return Response.json({ orders, totalOrders, totalRevenue });
}
