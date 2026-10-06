import { Link } from 'react-router-dom';
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
      <h2>Dashboard</h2>
      <div className="cards">
        {cards.map(([t, n, to]) => (
          <Link className="card stat" key={t} to={to}>
            <span>{t}</span>
            <b>{n}</b>
          </Link>
        ))}
      </div>
    </>
  );
}