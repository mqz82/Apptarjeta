import { useEffect, useMemo, useState } from 'react';
import { SummaryCards } from '../components/SummaryCards';
import { MonthPicker } from '../components/MonthPicker';
import { useConfig } from '../hooks/useConfig';
import { fetchSummary, useMonths } from '../hooks/useMonths';

export function DashboardPage() {
  const { config, loading: configLoading, error: configError } = useConfig();
  const { months, loading: monthsLoading } = useMonths();
  const [selectedMonth, setSelectedMonth] = useState<string>('');
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [summary, setSummary] = useState<Awaited<ReturnType<typeof fetchSummary>> | null>(null);

  const monthOptions = useMemo(() => months.map((month) => month.monthKey), [months]);

  useEffect(() => {
    if (monthOptions.length > 0) {
      const current = monthOptions[0];
      setSelectedMonth((value) => value || current);
    }
  }, [monthOptions]);

  useEffect(() => {
    if (!selectedMonth) return;
    setSummaryLoading(true);
    fetchSummary(selectedMonth)
      .then(setSummary)
      .catch(() => setSummary(null))
      .finally(() => setSummaryLoading(false));
  }, [selectedMonth]);

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
          <p className="text-sm text-slate-500">Resumen del uso inteligente de tu tarjeta CMR.</p>
        </div>
        {monthOptions.length > 0 && (
          <MonthPicker months={monthOptions} value={selectedMonth} onChange={setSelectedMonth} />
        )}
      </header>

      {configLoading || monthsLoading ? (
        <p className="text-sm text-slate-500">Cargando información...</p>
      ) : configError ? (
        <p className="text-sm text-red-500">{configError}</p>
      ) : !config ? (
        <p className="text-sm text-red-500">Configura tu tarjeta para comenzar.</p>
      ) : (
        <SummaryCards summary={summary} loading={summaryLoading} />
      )}

      {config && (
        <section className="rounded-lg bg-white p-6 shadow">
          <h2 className="text-lg font-semibold text-slate-700">Parámetros actuales</h2>
          <dl className="mt-4 grid gap-4 md:grid-cols-3">
            <div>
              <dt className="text-xs uppercase text-slate-500">Cupo</dt>
              <dd className="text-lg font-semibold text-slate-800">${config.cupo.toLocaleString('es-CL')}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase text-slate-500">Día de cierre</dt>
              <dd className="text-lg font-semibold text-slate-800">{config.diaCierre}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase text-slate-500">Día de pago</dt>
              <dd className="text-lg font-semibold text-slate-800">{config.diaPago}</dd>
            </div>
          </dl>
        </section>
      )}
    </div>
  );
}
