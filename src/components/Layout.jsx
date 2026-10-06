import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { logout } from '../utils/storage';

export default function Layout() {
  const [open, setOpen] = useState(false);
  const nav = useNavigate();
  const out = () => { logout(); nav('/login', { replace: true }); };
  return (
    <div className="app">
      <header><button className="menu" onClick={() => setOpen(!open)}>☰</button> Employee Management</header>
      <aside className={open ? 'open' : ''} onClick={() => setOpen(false)}>
        <NavLink to="/dashboard">📊 Dashboard</NavLink>
        <NavLink to="/employees">👥 Employees</NavLink>
        <a onClick={out}>🚪 Logout</a>
      </aside>
      <main><Outlet /></main>
    </div>
  );
}                                                       