'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Container, Typography, Button, Alert } from '@mui/material';

/**
 * Shows current total by readinggetCart and, on click,
 * confirms the order to get checkout which saves to DB and clears the cart.
 */
export default function Checkout(){
  const [ok, setOk] = useState(false);  // whether order was placed
  const [msg, setMsg] = useState('');   // success message
  const [total, setTotal] = useState(0);// preview total before placing order

  // compute the current total using the same items used by /view_cart
  useEffect(()=>{ (async()=>{
    const r = await fetch('/api/getCart');
    if(r.ok){
      const items = await r.json();
      setTotal(items.reduce((a,b)=> a + (Number(b.price)||0), 0));
    }
  })(); },[]);

 
  async function placeOrder(){
    const r = await fetch('/api/checkout');
    if(!r.ok){ 
      setMsg(await r.text()); 
      return; 
    }
    const d = await r.json();
    setOk(true);
    setMsg(`Order ${d.orderId} placed! Total €${(Number(d.total)||0).toFixed(2)}`);
  }

  return (
    <main>
      <Container sx={{ mt: 3 }}>
       <div style={{ marginBottom: 12 }}><b>Domino&apos;s</b>
       </div>

        <Typography variant="h6" gutterBottom>Checkout</Typography>
        <div style={{ marginBottom: 10 }}>Current total: <b>€{total.toFixed(2)}</b></div>

        {/* show success once order is placed; otherwise show the button */}
        {ok ? (
          <Alert severity="success">{msg}</Alert>
        ) : (
          <Button variant="contained" onClick={placeOrder}>Confirm Order</Button>
        )}

        <div style={{ marginTop: 12 }}>
          <Link href="/customer">Back to menu</Link>
        </div>
      </Container>
    </main>
  );
}
