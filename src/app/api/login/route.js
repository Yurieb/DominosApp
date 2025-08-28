import { db } from '@/lib/db';
import { getCustomSession } from '../sessionCode';
export const dynamic = 'force-dynamic';

export async function GET(req){
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');
  const pass  = searchParams.get('pass');

  const dbo = await db();
  const user = await dbo.collection('users').findOne({ email, pass });

  const s = await getCustomSession();
  if(user){
    s.email = user.email;
    s.role  = user.role || 'customer';
    await s.save();
  }

  return Response.json({ data: user ? 'valid' : 'invalid', role: user?.role || 'customer' });
}
