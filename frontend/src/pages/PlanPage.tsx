import { useEffect, useState } from 'react';
import client from '../api/client';

type PlanItem = {
  goal: string;
  description: string;
  category: string;
};

export function PlanPage() {
  const [items, setItems] = useState<PlanItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    client
      .get<PlanItem[]>('/plan')
      .then((response) => setItems(response.data))
      .catch(() => setError('No fue posible cargar el plan informativo.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-slate-800">Plan de Uso Inteligente</h1>
        <p className="text-sm text-slate-500">Recomendaciones para sacar el máximo provecho a tu CMR.</p>
      </header>

      {loading ? (
        <p className="text-sm text-slate-500">Cargando plan...</p>
      ) : error ? (
        <p className="text-sm text-red-500">{error}</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-3">
          {items.map((item) => (
            <article key={item.goal} className="rounded-lg bg-white p-5 shadow">
              <h2 className="text-lg font-semibold text-slate-700">{item.goal}</h2>
              <p className="mt-2 text-sm text-slate-600">{item.description}</p>
              <span className="mt-4 inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase text-slate-500">
                {item.category}
              </span>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
