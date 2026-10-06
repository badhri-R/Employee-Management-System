import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    <div className="login">
      <form className="card" onSubmit={submit} noValidate>
        <h2>Employee Management</h2>
        <label>Email<input value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} />
          {err.email && <small className="error">{err.email}</small>}</label>
        <label>Password<input type="password" value={f.password} onChange={(e) => setF({ ...f, password: e.target.value })} />
          {err.password && <small className="error">{err.password}</small>}</label>
        {err.form && <p className="error">{err.form}</p>}
        <button className="primary">Login</button>
      </form>
    </div>
  );
}