import { useState } from 'react';
import client from '../api/client';
import { CalendarTable } from '../components/CalendarTable';
import { MonthStatus, useMonths } from '../hooks/useMonths';

export function CalendarPage() {
  const { months, setMonths, loading, error } = useMonths();
  const [generating, setGenerating] = useState(false);

  const handleGenerate = () => {
    setGenerating(true);
    client
      .post<MonthStatus[]>('/months/generate', {})
      .then((response) => setMonths(response.data))
      .finally(() => setGenerating(false));
  };

  const handleTogglePaid = async (id: string, paid: boolean) => {
    await client.patch<MonthStatus>(`/months/${id}/paid`, { paid });
    setMonths((current) => current.map((month) => (month.id === id ? { ...month, paid } : month)));
  };

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Calendario &amp; Alertas</h1>
          <p className="text-sm text-slate-500">Controla tus fechas críticas y pagos mes a mes.</p>
        </div>
        <button
          onClick={handleGenerate}
          className="rounded bg-sky-600 px-4 py-2 font-semibold text-white hover:bg-sky-700 disabled:opacity-50"
          disabled={generating}
        >
          {generating ? 'Generando...' : 'Generar 12 meses'}
        </button>
      </header>

      {loading ? (
        <p className="text-sm text-slate-500">Cargando calendario...</p>
      ) : error ? (
        <p className="text-sm text-red-500">{error}</p>
      ) : (
        <CalendarTable months={months} onTogglePaid={handleTogglePaid} />
      )}
    </div>
  );
}
