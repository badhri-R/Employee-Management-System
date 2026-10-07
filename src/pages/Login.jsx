import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { login } from '../utils/storage';

export default function Login() {
  const [f, setF] = useState({ email: '', password: '' });
  const [err, setErr] = useState({});
  const nav = useNavigate();

  const submit = (ev) => {
    ev.preventDefault();
    const e = {};
    if (!/^\S+@\S+\.\S+$/.test(f.email)) e.email = 'Please enter a valid email.';
    if (f.password.length < 6) e.password = 'Password must be at least 6 characters.';
    if (!e.email && !e.password && (f.email !== 'admin@gmail.com' || f.password !== 'admin123')) e.form = 'Invalid email or password.';
    setErr(e);
    if (Object.keys(e).length === 0) { login(); nav('/dashboard', { replace: true }); }
  };

  return (
    <div className="grid min-h-screen place-items-center">
      <Card className="w-[min(380px,92vw)]">
        <form className="grid gap-4" onSubmit={submit} noValidate>
          <CardHeader><CardTitle className="text-xl">Employee Management</CardTitle></CardHeader>
          <Label>Email<Input value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} />
            {err.email && <small className="text-[13px] font-normal text-destructive">{err.email}</small>}</Label>
          <Label>Password<Input type="password" value={f.password} onChange={(e) => setF({ ...f, password: e.target.value })} />
            {err.password && <small className="text-[13px] font-normal text-destructive">{err.password}</small>}</Label>
          {err.form && <p className="text-[13px] text-destructive">{err.form}</p>}
          <Button type="submit">Login</Button>
        </form>
      </Card>
    </div>
  );
}