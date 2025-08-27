import { db } from '@/lib/db';
import { getCustomSession } from '../sessionCode';

export async function GET(req){
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');
  const pass  = searchParams.get('pass');
  const role  = searchParams.get('role') || 'customer';

  const dbo = await db();
  await dbo.collection('users').insertOne({ email, pass, role });

  const s = await getCustomSession();
  s.email = email; s.role = role; await s.save();

  return Response.json({ ok: true, role });
}
