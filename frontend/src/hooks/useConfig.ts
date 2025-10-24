import { useEffect, useState } from 'react';
import client from '../api/client';

export interface Config {
  cupo: number;
  diaCierre: number;
  diaPago: number;
}

export function useConfig() {
  const [config, setConfig] = useState<Config | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    client
      .get<Config>('/config')
      .then((response) => {
        setConfig(response.data);
      })
      .catch(() => setError('No fue posible cargar la configuración.'))
      .finally(() => setLoading(false));
  }, []);

  return { config, setConfig, loading, error } as const;
}
