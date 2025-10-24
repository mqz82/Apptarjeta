interface Props {
  status: 'GREEN' | 'YELLOW' | 'RED';
}

const colors: Record<Props['status'], string> = {
  GREEN: 'bg-traffic-green text-white',
  YELLOW: 'bg-traffic-yellow text-slate-900',
  RED: 'bg-traffic-red text-white'
};

const labels: Record<Props['status'], string> = {
  GREEN: 'Saludable',
  YELLOW: 'Atento',
  RED: 'Crítico'
};

export function TrafficLightBadge({ status }: Props) {
  return <span className={`px-3 py-1 rounded-full text-xs font-semibold ${colors[status]}`}>{labels[status]}</span>;
}
