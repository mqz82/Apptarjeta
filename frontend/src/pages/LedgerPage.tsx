import { useMemo, useState } from 'react';
import {
  Purchase,
  PurchasePayload,
  createPurchase,
  deletePurchase,
  setPurchasePaid,
  updatePurchase,
  usePurchases
} from '../hooks/usePurchases';
import { PurchaseTable } from '../components/PurchaseTable';
import { TrafficLightBadge } from '../components/TrafficLightBadge';

const calculateSummary = (purchases: Purchase[]) => {
  const total = purchases.reduce((sum, purchase) => sum + purchase.amount, 0);
  return { total };
};

export function LedgerPage() {
  const { purchases, setPurchases, loading, error } = usePurchases();
  const [saving, setSaving] = useState(false);

  const { total } = useMemo(() => calculateSummary(purchases), [purchases]);

  const handleCreate = async (payload: PurchasePayload) => {
    setSaving(true);
    const purchase = await createPurchase(payload);
    setPurchases((current) => [purchase, ...current]);
    setSaving(false);
  };

  const handleUpdate = async (id: string, payload: PurchasePayload) => {
    setSaving(true);
    const updated = await updatePurchase(id, payload);
    setPurchases((current) => current.map((purchase) => (purchase.id === id ? updated : purchase)));
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    setSaving(true);
    await deletePurchase(id);
    setPurchases((current) => current.filter((purchase) => purchase.id !== id));
    setSaving(false);
  };

  const handleTogglePaid = async (id: string, paid: boolean) => {
    const updated = await setPurchasePaid(id, paid);
    setPurchases((current) => current.map((purchase) => (purchase.id === id ? updated : purchase)));
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-slate-800">Bitácora de Compras</h1>
        <p className="text-sm text-slate-500">Registra tus movimientos para seguir el semáforo en tiempo real.</p>
      </header>

      {loading ? (
        <p className="text-sm text-slate-500">Cargando compras...</p>
      ) : error ? (
        <p className="text-sm text-red-500">{error}</p>
      ) : (
        <>
          <section className="rounded-lg bg-white p-6 shadow">
            <h2 className="text-lg font-semibold text-slate-700">Resumen</h2>
            <div className="mt-4 flex flex-wrap items-center gap-6 text-sm text-slate-600">
              <span className="font-semibold text-slate-700">Total gastado: ${total.toLocaleString('es-CL')}</span>
              <span className="flex items-center gap-2">
                Estado:
                <TrafficLightBadge status={total === 0 ? 'GREEN' : total < 300000 ? 'YELLOW' : 'RED'} />
              </span>
            </div>
          </section>

          <PurchaseTable
            purchases={purchases}
            onCreate={handleCreate}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
            onTogglePaid={handleTogglePaid}
          />
        </>
      )}
    </div>
  );
}
