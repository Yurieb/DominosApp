import { db } from '@/lib/db';
import { getCustomSession } from '../sessionCode';
import { makeTransport } from '@/lib/email';
export const dynamic = 'force-dynamic';


export async function GET(){
  const s = await getCustomSession();
  if(!s.email) return new Response('Unauthorized', { status: 401 });

  const dbo = await db();
  const cart = await dbo.collection('shopping_cart').find({ email: s.email }).toArray();
  if(cart.length === 0) return new Response('Cart empty', { status: 400 });

  // Sum prices if present; otherwise count items
  const total = cart.reduce((a, b) => a + (Number(b.price) || 0), 0);
  const order = {
    email: s.email,
    items: cart.map(c => ({ pname: c.pname, price: Number(c.price) || null })),
    total,
    ts: new Date()
  };
  const { insertedId } = await dbo.collection('orders').insertOne(order);
  await dbo.collection('shopping_cart').deleteMany({ email: s.email });

  try {
    const t = makeTransport();
    await t.sendMail({
      from: process.env.SMTP_FROM || 'no-reply@example.com',
      to: s.email,
      subject: 'Order placed',
      html: `<p>Order ${insertedId} placed.</p>`
    });
  } catch (e) {
    console.log('Email failed (ok for demo):', e.message);
  }

  return Response.json({ ok: true, orderId: String(insertedId), total });
}
