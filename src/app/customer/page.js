'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Container, Typography, Button } from '@mui/material';

export default function Customer(){
  const [list, setList] = useState([]);     // products from MongoDB
  const [weather, setWeather] = useState(); // simple weather banner

  // Load products and weather once on mount
  useEffect(()=>{
    fetch('/api/getProducts').then(r=>r.json()).then(setList);
    fetch('/api/weather').then(r=>r.json()).then(setWeather);
  },[]);

  // Add to cart using the assignment's GET-with-query endpoint
  function add(p){
    fetch(`/api/putInCart?pname=${encodeURIComponent(p.pname)}&price=${encodeURIComponent(p.price)}`);
    alert(`${p.pname} added to cart`);
  }

  return (
    <main>
      <Container sx={{ mt: 3 }}>
       <div style={{ marginBottom: 12 }}><b>Domino&apos;s</b>
       </div>

        {/* weather banner (required) */}
        {weather && (
          <div style={{ padding: 8, border: '1px solid #eee', marginBottom: 12 }}>
            <b>Weather:</b> {weather.city}, {weather.current?.temperature}°C
          </div>
        )}

        {/* very plain list with thumbnail + text */}
        {list.map((p, i)=>(
          <div key={i} style={{ 
            display:'flex', gap:12, alignItems:'center',
            padding:'8px 0', borderBottom:'1px solid #eee'
          }}>
            {/* product image from /public; fallback to /default.jpg if missing */}
            <img
              src={p.image || '/default.jpg'}
              alt={p.pname}
              width={96}
              height={96}
              style={{ objectFit:'cover', borderRadius:8, background:'#f3f3f3' }}
            />
            <div style={{ flex:1 }}>
              <div><b>{p.pname}</b> — €{p.price}</div>
              {p.desc && <div style={{ fontSize: 13, color: '#666' }}>{p.desc}</div>}
              <Button size="small" variant="outlined" onClick={()=>add(p)} style={{ marginTop: 6 }}>
                Add to cart
              </Button>
            </div>
          </div>
        ))}

        <div style={{ marginTop: 12 }}>
          <Link href="/view_cart">Go to Cart</Link>
        </div>
      </Container>
    </main>
  );
}
