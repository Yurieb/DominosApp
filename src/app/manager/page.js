'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Container, Typography } from '@mui/material';


export default function Manager(){
  // dashboard state returned by the API
  const [orders, setOrders]   = useState([]);
  const [count, setCount]     = useState(0);
  const [revenue, setRevenue] = useState(0);

  // load once on mount
  useEffect(()=>{ (async()=>{
    const r = await fetch('/api/getOrders');

    // if user isn't a manager, API sends 403
    if (r.status === 403) { 
      window.location.href = '/login'; 
      return; 
    }

    const d = await r.json();
    setOrders(d.orders||[]);
    setCount(d.totalOrders||0);
    setRevenue(d.totalRevenue||0);
  })(); },[]);

  return (
    <main>
      <Container sx={{ mt: 3 }}>
     <div style={{ marginBottom: 12 }}><b>Domino&apos;s</b>
     </div>

        <Typography variant="h6" gutterBottom>Manager Dashboard</Typography>
        <div style={{ marginBottom: 10 }}>
          <b>Total Orders:</b> {count} &nbsp; | &nbsp; <b>Total Revenue:</b> €{Number(revenue).toFixed(2)}
        </div>

        {/* list each order with the fields required by the brief */}
        {orders.map(o=>(
          <div key={o._id} style={{ padding:'8px 0', borderBottom:'1px solid #eee' }}>
            <div><b>Order ID:</b> {o._id}</div>
            <div><b>User:</b> {o.email}</div>
            <div><b>When:</b> {new Date(o.ts).toLocaleString()}</div>
            <div><b>Items:</b> {o.items.map(i=>i.pname).join(', ')}</div>
            <div><b>Total:</b> €{(Number(o.total)||0).toFixed(2)}</div>
          </div>
        ))}
      </Container>
    </main>
  );
}
