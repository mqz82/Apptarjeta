import { useEffect, useState } from 'react';
import client from '../api/client';

export interface MonthStatus {
  id: string;
  monthKey: string;
  startBilling: string;
  endBilling: string;
  idealStart: string;
  idealEnd: string;
  avoidStart: string;
  avoidEnd: string;
  dueDate: string;
  paid: boolean;
}

export interface MonthlySummary {
  monthKey: string;
  totalSpent: number;
  cupo: number;
  usageRatio: number;
  points: number;
  trafficLight: 'GREEN' | 'YELLOW' | 'RED';
}

export function useMonths() {
  const [months, setMonths] = useState<MonthStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    client
      .get<MonthStatus[]>('/months')
      .then((response) => setMonths(response.data))
      .catch(() => setError('No fue posible obtener el calendario.'))
      .finally(() => setLoading(false));
  }, []);

  return { months, setMonths, loading, error } as const;
}

export function fetchSummary(monthKey: string) {
  return client.get<MonthlySummary>(`/months/${monthKey}/summary`).then((response) => response.data);
}
