import { MonthlySummary } from '../hooks/useMonths';
import { TrafficLightBadge } from './TrafficLightBadge';

interface Props {
  summary: MonthlySummary | null;
  loading: boolean;
}

export function SummaryCards({ summary, loading }: Props) {
  if (loading) {
    return <p className="text-sm text-slate-500">Cargando resumen...</p>;
  }

  if (!summary) {
    return <p className="text-sm text-red-500">No fue posible calcular el resumen.</p>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-4">
      <div className="rounded-lg bg-white p-4 shadow">
        <h3 className="text-xs uppercase text-slate-500">Total gastado</h3>
        <p className="text-2xl font-bold">${summary.totalSpent.toLocaleString('es-CL')}</p>
      </div>
      <div className="rounded-lg bg-white p-4 shadow">
        <h3 className="text-xs uppercase text-slate-500">Uso del cupo</h3>
        <p className="text-2xl font-bold">{(summary.usageRatio * 100).toFixed(1)}%</p>
      </div>
      <div className="rounded-lg bg-white p-4 shadow">
        <h3 className="text-xs uppercase text-slate-500">Puntos estimados</h3>
        <p className="text-2xl font-bold">{summary.points}</p>
      </div>
      <div className="flex flex-col items-start justify-between rounded-lg bg-white p-4 shadow">
        <h3 className="text-xs uppercase text-slate-500">Semáforo</h3>
        <TrafficLightBadge status={summary.trafficLight} />
      </div>
    </div>
  );
}
