import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getEmployees } from '../utils/storage';

export default function Dashboard() {
  const list = getEmployees();
  const active = list.filter((e) => e.status === 'Active').length;
  const depts = new Set(list.map((e) => e.department)).size;

  const cards = [
    ['Total Employees', list.length, '/employees'],
    ['Active Employees', active, '/employees?status=Active'],
    ['Inactive Employees', list.length - active, '/employees?status=Inactive'],
    ['Departments', depts, '/employees'],
  ];

  return (
    <>
      <h2 className="mb-4 text-2xl font-semibold">Dashboard</h2>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-4">
        {cards.map(([t, n, to]) => (
          <Link key={t} to={to}>
            <Card className="transition-shadow hover:shadow-md">
              <CardHeader><CardTitle className="text-sm font-normal text-muted-foreground">{t}</CardTitle></CardHeader>
              <CardContent><b className="text-3xl">{n}</b></CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
}