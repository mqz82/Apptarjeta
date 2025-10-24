import { useEffect, useState } from 'react';
import client from '../api/client';

export interface Purchase {
  id: string;
  date: string;
  merchant: string;
  amount: number;
  installments: number;
  type: 'NATIONAL' | 'INTERNATIONAL';
  paid: boolean;
  monthKey: string;
  notes?: string | null;
}

export interface PurchasePayload {
  date: string;
  merchant: string;
  amount: number;
  installments: number;
  type: 'NATIONAL' | 'INTERNATIONAL';
  paid: boolean;
  notes?: string;
}

export function usePurchases() {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    client
      .get<Purchase[]>('/purchases')
      .then((response) => setPurchases(response.data))
      .catch(() => setError('No fue posible cargar las compras.'))
      .finally(() => setLoading(false));
  }, []);

  return { purchases, setPurchases, loading, error } as const;
}

export function createPurchase(payload: PurchasePayload) {
  return client.post<Purchase>('/purchases', payload).then((response) => response.data);
}

export function updatePurchase(id: string, payload: PurchasePayload) {
  return client.put<Purchase>(`/purchases/${id}`, payload).then((response) => response.data);
}

export function deletePurchase(id: string) {
  return client.delete(`/purchases/${id}`);
}

export function setPurchasePaid(id: string, paid: boolean) {
  return client.patch<Purchase>(`/purchases/${id}/paid`, { paid }).then((response) => response.data);
}
