'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Container, Typography, TextField, Button, Alert } from '@mui/material';


export default function Login(){
  // form state for the two inputs
  const [email, setEmail] = useState('');
  const [pass, setPass]   = useState('');
  const [err, setErr]     = useState(''); // show error banner if login fails

  // submit handler: uses the assignment's GET-with-query style endpoint
  async function submit(e){
    e.preventDefault();
    setErr('');

    // call the login API
    const r = await fetch(`/api/login?email=${encodeURIComponent(email)}&pass=${encodeURIComponent(pass)}`);
    const data = await r.json();

  
    if (data.data !== 'valid'){
      setErr('Invalid login');
      return;
    }

    // simple role-based redirect
    window.location.href = data.role === 'manager' ? '/manager' : '/customer';
  }

  return (
    <main>
      <Container sx={{ mt: 3 }}>
       <div style={{ marginBottom: 12 }}><b>Domino&apos;s</b>
       </div>

        <Typography variant="h6" gutterBottom>Login</Typography>
        {/* show error, if any */}
        {err && <Alert severity="error" sx={{ mb: 2 }}>{err}</Alert>}

        {/* simple form */}
        <form onSubmit={submit}>
          <TextField fullWidth label="Email"    sx={{ mb: 2 }} value={email} onChange={e=>setEmail(e.target.value)} />
          <TextField fullWidth label="Password" sx={{ mb: 2 }} type="password" value={pass} onChange={e=>setPass(e.target.value)} />
          <Button type="submit" variant="contained">Login</Button>
        </form>

        <div style={{ marginTop: 12 }}>
          No account? <Link href="/register">Register</Link>
        </div>
      </Container>
    </main>
  );
}
