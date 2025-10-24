import { NavLink, Route, Routes } from 'react-router-dom';
import { CalendarPage } from './pages/CalendarPage';
import { ConfigPage } from './pages/ConfigPage';
import { DashboardPage } from './pages/DashboardPage';
import { LedgerPage } from './pages/LedgerPage';
import { PlanPage } from './pages/PlanPage';

const navItems = [
  { path: '/', label: 'Dashboard' },
  { path: '/config', label: 'Configuración' },
  { path: '/plan', label: 'Plan' },
  { path: '/calendar', label: 'Calendario' },
  { path: '/ledger', label: 'Bitácora' }
];

export default function App() {
  return (
    <div className="min-h-screen bg-slate-100">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6">
        <nav className="flex flex-wrap items-center gap-2 rounded-full bg-white px-4 py-2 shadow">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-semibold transition ${
                  isActive ? 'bg-sky-600 text-white' : 'text-slate-600 hover:bg-slate-100'
                }`
              }
              end={item.path === '/'}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <main>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/config" element={<ConfigPage />} />
            <Route path="/plan" element={<PlanPage />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/ledger" element={<LedgerPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
