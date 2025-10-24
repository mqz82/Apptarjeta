import { MonthStatus } from '../hooks/useMonths';

interface Props {
  months: MonthStatus[];
  onTogglePaid: (id: string, paid: boolean) => Promise<void>;
}

const formatDate = (value: string) => new Date(value).toLocaleDateString('es-CL');
const formatMonth = (key: string) =>
  new Date(`${key}-01`).toLocaleDateString('es-CL', { month: 'long', year: 'numeric' });

export function CalendarTable({ months, onTogglePaid }: Props) {
  return (
    <div className="overflow-x-auto rounded-lg bg-white shadow">
      <table className="min-w-full divide-y divide-slate-200">
        <thead className="bg-slate-50">
          <tr>
            <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">Mes</th>
            <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">Período facturado</th>
            <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">Semana ideal</th>
            <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">Días a evitar</th>
            <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">Vencimiento</th>
            <th className="px-3 py-2 text-center text-xs font-semibold uppercase tracking-wide text-slate-600">Pago</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {months.map((month) => (
            <tr key={month.id} className="hover:bg-slate-50">
              <td className="whitespace-nowrap px-3 py-2 text-sm font-semibold capitalize text-slate-700">
                {formatMonth(month.monthKey)}
              </td>
              <td className="px-3 py-2 text-sm text-slate-600">
                {formatDate(month.startBilling)} – {formatDate(month.endBilling)}
              </td>
              <td className="px-3 py-2 text-sm text-slate-600">
                {formatDate(month.idealStart)} – {formatDate(month.idealEnd)}
              </td>
              <td className="px-3 py-2 text-sm text-slate-600">
                {formatDate(month.avoidStart)} – {formatDate(month.avoidEnd)}
              </td>
              <td className="px-3 py-2 text-sm text-slate-600">{formatDate(month.dueDate)}</td>
              <td className="px-3 py-2 text-center text-sm text-slate-600">
                <input
                  type="checkbox"
                  checked={month.paid}
                  onChange={(event) => onTogglePaid(month.id, event.target.checked)}
                />
              </td>
            </tr>
          ))}
          {months.length === 0 && (
            <tr>
              <td colSpan={6} className="px-3 py-6 text-center text-sm text-slate-500">
                Genera tu calendario para comenzar a planificar.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
