'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Container, Typography, Button } from '@mui/material';


export default function ViewCart(){
  const [items, setItems] = useState([]); // items in the user's cart

  async function load(){
    const r = await fetch('/api/getCart');
    if(!r.ok){ 
      // if not logged in, API sends 401; redirect to login
      window.location.href = '/login'; 
      return; 
    }
    setItems(await r.json());
  }
  useEffect(()=>{ load(); },[]);

  // remove an item by _id via GET endpoint
  async function removeItem(id){
    await fetch(`/api/removeFromCart?id=${encodeURIComponent(id)}`);
    load();
  }

  // sum prices to show a total if price exists
  const total = items.reduce((a,b)=> a + (Number(b.price)||0), 0);

  return (
    <main>
      <Container sx={{ mt: 3 }}>
      <div style={{ marginBottom: 12 }}><b>Domino&apos;s</b>
      </div>

        <Typography variant="h6" gutterBottom>Your Cart</Typography>

        {/* empty state */}
        {items.length === 0 && <div>No items yet.</div>}

        {/* simple list of items */}
        {items.map(it=>(
          <div key={it._id} style={{ display:'flex', justifyContent:'space-between', padding:'6px 0', borderBottom:'1px solid #eee' }}>
            <div>{it.pname}</div>
            <div>{(Number(it.price)||0) ? `€${Number(it.price).toFixed(2)}` : ''}</div>
            <Button size="small" onClick={()=>removeItem(it._id)}>Remove</Button>
          </div>
        ))}

        {/* total row */}
        <div style={{ display:'flex', justifyContent:'space-between', marginTop: 10, fontWeight: 700 }}>
          <div>Total</div>
          <div>€{total.toFixed(2)}</div>
        </div>

        <div style={{ marginTop: 12 }}>
          <Link href="/checkout">Proceed to checkout</Link>
        </div>
      </Container>
    </main>
  );
}

