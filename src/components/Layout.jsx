import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, LogOut, Menu, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { logout } from '../utils/storage';

const link = ({ isActive }) =>
  cn('flex items-center gap-2 rounded-md p-2.5 text-sm cursor-pointer hover:bg-muted', isActive && 'bg-accent text-accent-foreground font-medium');

export default function Layout() {
  const [open, setOpen] = useState(false);
  const nav = useNavigate();
  const out = () => { logout(); nav('/login', { replace: true }); };
  return (
    <div className="grid min-h-screen grid-cols-1 grid-rows-[56px_1fr] md:grid-cols-[220px_1fr]">
      <header className="col-span-full flex items-center gap-2.5 bg-primary px-4 font-semibold text-primary-foreground">
        <Button variant="ghost" size="icon" className="md:hidden hover:bg-white/15 hover:text-white" onClick={() => setOpen(!open)}><Menu /></Button>
        Employee Management
      </header>
      <aside
        className={cn('flex-col border-r bg-card p-3 md:flex', open ? 'fixed bottom-0 left-0 top-14 z-40 flex w-[220px]' : 'hidden')}
        onClick={() => setOpen(false)}
      >
        <NavLink to="/dashboard" className={link}><LayoutDashboard className="size-4" /> Dashboard</NavLink>
        <NavLink to="/employees" className={link}><Users className="size-4" /> Employees</NavLink>
        <a className={link({ isActive: false })} onClick={out}><LogOut className="size-4" /> Logout</a>
      </aside>
      <main className="min-w-0 p-5"><Outlet /></main>
    </div>
  );
}