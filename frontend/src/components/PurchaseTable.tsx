import { FormEvent, useState } from 'react';
import { Purchase, PurchasePayload } from '../hooks/usePurchases';

interface Props {
  purchases: Purchase[];
  onCreate: (payload: PurchasePayload) => Promise<void>;
  onUpdate: (id: string, payload: PurchasePayload) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onTogglePaid: (id: string, paid: boolean) => Promise<void>;
}

const defaultForm: PurchasePayload = {
  date: new Date().toISOString().slice(0, 10),
  merchant: '',
  amount: 0,
  installments: 1,
  type: 'NATIONAL',
  paid: false,
  notes: ''
};

const formatMonthKey = (key: string) =>
  new Date(`${key}-01`).toLocaleDateString('es-CL', { month: 'long', year: 'numeric' });

export function PurchaseTable({ purchases, onCreate, onUpdate, onDelete, onTogglePaid }: Props) {
  const [form, setForm] = useState<PurchasePayload>(defaultForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    try {
      if (editingId) {
        await onUpdate(editingId, form);
        setMessage('Compra actualizada');
      } else {
        await onCreate(form);
        setMessage('Compra creada');
      }
      setForm({ ...defaultForm, date: new Date().toISOString().slice(0, 10) });
      setEditingId(null);
    } catch (error) {
      console.error(error);
      setMessage('No fue posible guardar la compra.');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (purchase: Purchase) => {
    setEditingId(purchase.id);
    setForm({
      date: purchase.date,
      merchant: purchase.merchant,
      amount: purchase.amount,
      installments: purchase.installments,
      type: purchase.type,
      paid: purchase.paid,
      notes: purchase.notes ?? ''
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Eliminar la compra seleccionada?')) {
      return;
    }
    await onDelete(id);
    setMessage('Compra eliminada');
    if (editingId === id) {
      setEditingId(null);
      setForm({ ...defaultForm, date: new Date().toISOString().slice(0, 10) });
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="grid gap-4 rounded-lg bg-white p-6 shadow md:grid-cols-4">
        <div className="md:col-span-1">
          <label className="block text-xs font-semibold uppercase text-slate-500">Fecha</label>
          <input
            type="date"
            className="mt-1 w-full rounded border border-slate-300 p-2"
            value={form.date}
            onChange={(event) => setForm({ ...form, date: event.target.value })}
          />
        </div>
        <div className="md:col-span-1">
          <label className="block text-xs font-semibold uppercase text-slate-500">Comercio</label>
          <input
            type="text"
            className="mt-1 w-full rounded border border-slate-300 p-2"
            value={form.merchant}
            onChange={(event) => setForm({ ...form, merchant: event.target.value })}
          />
        </div>
        <div className="md:col-span-1">
          <label className="block text-xs font-semibold uppercase text-slate-500">Monto</label>
          <input
            type="number"
            className="mt-1 w-full rounded border border-slate-300 p-2"
            value={form.amount}
            min={1}
            onChange={(event) => setForm({ ...form, amount: Number(event.target.value) })}
          />
        </div>
        <div className="md:col-span-1">
          <label className="block text-xs font-semibold uppercase text-slate-500">Cuotas</label>
          <input
            type="number"
            className="mt-1 w-full rounded border border-slate-300 p-2"
            value={form.installments}
            min={1}
            onChange={(event) => setForm({ ...form, installments: Number(event.target.value) })}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase text-slate-500">Tipo</label>
          <select
            className="mt-1 w-full rounded border border-slate-300 p-2"
            value={form.type}
            onChange={(event) => setForm({ ...form, type: event.target.value as PurchasePayload['type'] })}
          >
            <option value="NATIONAL">Nacional</option>
            <option value="INTERNATIONAL">Internacional</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase text-slate-500">Pagado</label>
          <input
            type="checkbox"
            className="mt-2"
            checked={form.paid}
            onChange={(event) => setForm({ ...form, paid: event.target.checked })}
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-xs font-semibold uppercase text-slate-500">Observaciones</label>
          <textarea
            className="mt-1 w-full rounded border border-slate-300 p-2"
            value={form.notes}
            onChange={(event) => setForm({ ...form, notes: event.target.value })}
          />
        </div>
        <div className="md:col-span-4 flex items-center gap-2">
          <button
            type="submit"
            className="rounded bg-emerald-600 px-4 py-2 font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
            disabled={saving}
          >
            {saving ? 'Guardando...' : editingId ? 'Actualizar' : 'Agregar'}
          </button>
          {editingId && (
            <button
              type="button"
              className="rounded bg-slate-200 px-4 py-2 text-sm font-semibold text-slate-700"
              onClick={() => {
                setEditingId(null);
                setForm({ ...defaultForm, date: new Date().toISOString().slice(0, 10) });
              }}
            >
              Cancelar
            </button>
          )}
          {message && <span className="text-sm text-slate-500">{message}</span>}
        </div>
      </form>

      <div className="overflow-x-auto rounded-lg bg-white shadow">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">Fecha</th>
              <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">Comercio</th>
              <th className="px-3 py-2 text-right text-xs font-semibold uppercase tracking-wide text-slate-600">Monto</th>
              <th className="px-3 py-2 text-center text-xs font-semibold uppercase tracking-wide text-slate-600">Cuotas</th>
              <th className="px-3 py-2 text-center text-xs font-semibold uppercase tracking-wide text-slate-600">Tipo</th>
              <th className="px-3 py-2 text-center text-xs font-semibold uppercase tracking-wide text-slate-600">Mes</th>
              <th className="px-3 py-2 text-center text-xs font-semibold uppercase tracking-wide text-slate-600">Pagado</th>
              <th className="px-3 py-2 text-center text-xs font-semibold uppercase tracking-wide text-slate-600">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {purchases.map((purchase) => (
              <tr key={purchase.id} className="hover:bg-slate-50">
                <td className="whitespace-nowrap px-3 py-2 text-sm text-slate-600">
                  {new Date(purchase.date).toLocaleDateString('es-CL')}
                </td>
                <td className="px-3 py-2 text-sm font-semibold text-slate-700">{purchase.merchant}</td>
                <td className="whitespace-nowrap px-3 py-2 text-right text-sm text-slate-600">
                  ${purchase.amount.toLocaleString('es-CL')}
                </td>
                <td className="px-3 py-2 text-center text-sm text-slate-600">{purchase.installments}</td>
                <td className="px-3 py-2 text-center text-sm text-slate-600">
                  {purchase.type === 'NATIONAL' ? 'Nacional' : 'Internacional'}
                </td>
                <td className="px-3 py-2 text-center text-sm capitalize text-slate-600">{formatMonthKey(purchase.monthKey)}</td>
                <td className="px-3 py-2 text-center text-sm text-slate-600">
                  <input
                    type="checkbox"
                    checked={purchase.paid}
                    onChange={(event) => onTogglePaid(purchase.id, event.target.checked)}
                  />
                </td>
                <td className="px-3 py-2 text-center text-sm">
                  <div className="flex justify-center gap-2">
                    <button className="text-sky-600 hover:underline" onClick={() => handleEdit(purchase)}>
                      Editar
                    </button>
                    <button className="text-red-500 hover:underline" onClick={() => handleDelete(purchase.id)}>
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {purchases.length === 0 && (
              <tr>
                <td colSpan={8} className="px-3 py-6 text-center text-sm text-slate-500">
                  Aún no registras compras.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
