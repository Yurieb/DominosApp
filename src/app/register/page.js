'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Container, Typography, TextField, Button, MenuItem, Alert } from '@mui/material';


export default function Register(){
  // form state
  const [email, setEmail] = useState('');
  const [pass, setPass]   = useState('');
  const [role, setRole]   = useState('customer'); // "customer" or "manager"
  const [err, setErr]     = useState('');

  // GET with query params
  async function submit(e){
    e.preventDefault();
    setErr('');

    const url = `/api/register?email=${encodeURIComponent(email)}&pass=${encodeURIComponent(pass)}&role=${encodeURIComponent(role)}`;
    const r = await fetch(url);

    if(!r.ok){
      setErr('Registration failed');
      return;
    }

    const data = await r.json();
    // redirect to correct dashboard immediately
    window.location.href = data.role === 'manager' ? '/manager' : '/customer';
  }

  return (
    <main>
      <Container sx={{ mt: 3 }}>
        <div style={{ marginBottom: 12 }}>
          <b>Domino&apos;s</b> &nbsp;|&nbsp;
          <Link href="/customer">Customer</Link> &nbsp;|&nbsp;
          <Link href="/view_cart">Cart</Link> &nbsp;|&nbsp;
          <Link href="/manager">Manager</Link>
        </div>

        <Typography variant="h6" gutterBottom>Register</Typography>
        {err && <Alert severity="error" sx={{ mb: 2 }}>{err}</Alert>}

        {/* simple form */}
        <form onSubmit={submit}>
          <TextField fullWidth label="Email"    sx={{ mb: 2 }} value={email} onChange={e=>setEmail(e.target.value)} />
          <TextField fullWidth label="Password" sx={{ mb: 2 }} type="password" value={pass} onChange={e=>setPass(e.target.value)} />
          <TextField fullWidth label="Role" select sx={{ mb: 2 }} value={role} onChange={e=>setRole(e.target.value)}>
            <MenuItem value="customer">Customer</MenuItem>
            <MenuItem value="manager">Manager</MenuItem>
          </TextField>
          <Button type="submit" variant="contained">Create account</Button>
        </form>

        <div style={{ marginTop: 12 }}>
          Have an account? <Link href="/login">Login</Link>
        </div>
      </Container>
    </main>
  );
}
