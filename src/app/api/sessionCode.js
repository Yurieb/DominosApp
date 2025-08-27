import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';

export async function getCustomSession(){
  const password = process.env.SESSION_PASSWORD || '';
  if(password.length < 32) throw new Error('SESSION_PASSWORD must be >=32 chars');
  return getIronSession(cookies(), {
    password,
    cookieName: 'dominos_simple',
    ttl: 60*60*24*7
  });
}
