import { ConfigForm } from '../components/ConfigForm';
import { useConfig } from '../hooks/useConfig';

export function ConfigPage() {
  const { config, setConfig, loading, error } = useConfig();

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-slate-800">Configuración</h1>
        <p className="text-sm text-slate-500">Ajusta los parámetros base para tu plan inteligente.</p>
      </header>

      {loading ? (
        <p className="text-sm text-slate-500">Cargando configuración...</p>
      ) : error ? (
        <p className="text-sm text-red-500">{error}</p>
      ) : config ? (
        <ConfigForm config={config} onSaved={setConfig} />
      ) : (
        <p className="text-sm text-red-500">No fue posible cargar la configuración.</p>
      )}
    </div>
  );
}
