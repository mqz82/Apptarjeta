import { FormEvent, useState } from 'react';
import client from '../api/client';
import { Config } from '../hooks/useConfig';

interface Props {
  config: Config;
  onSaved: (config: Config) => void;
}

export function ConfigForm({ config, onSaved }: Props) {
  const [form, setForm] = useState(config);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    client
      .put<Config>('/config', form)
      .then((response) => {
        onSaved(response.data);
        setMessage('Configuración guardada correctamente.');
      })
      .catch(() => setMessage('No fue posible guardar la configuración.'))
      .finally(() => setSaving(false));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-lg bg-white p-6 shadow">
      <div>
        <label className="block text-sm font-medium text-slate-600">Cupo de la tarjeta (CLP)</label>
        <input
          type="number"
          className="mt-1 w-full rounded border border-slate-300 p-2"
          value={form.cupo}
          min={10000}
          onChange={(event) => setForm({ ...form, cupo: Number(event.target.value) })}
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-slate-600">Día de cierre</label>
          <input
            type="number"
            className="mt-1 w-full rounded border border-slate-300 p-2"
            value={form.diaCierre}
            min={1}
            max={31}
            onChange={(event) => setForm({ ...form, diaCierre: Number(event.target.value) })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-600">Día de pago</label>
          <input
            type="number"
            className="mt-1 w-full rounded border border-slate-300 p-2"
            value={form.diaPago}
            min={1}
            max={31}
            onChange={(event) => setForm({ ...form, diaPago: Number(event.target.value) })}
          />
        </div>
      </div>
      <button
        type="submit"
        className="rounded bg-sky-600 px-4 py-2 font-semibold text-white transition hover:bg-sky-700 disabled:opacity-50"
        disabled={saving}
      >
        {saving ? 'Guardando...' : 'Guardar'}
      </button>
      {message && <p className="text-sm text-slate-500">{message}</p>}
    </form>
  );
}
