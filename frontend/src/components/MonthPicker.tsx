interface Props {
  months: string[];
  value: string;
  onChange: (value: string) => void;
}

const formatMonth = (key: string) =>
  new Date(`${key}-01`).toLocaleDateString('es-CL', { month: 'long', year: 'numeric' });

export function MonthPicker({ months, value, onChange }: Props) {
  return (
    <label className="flex items-center gap-2 text-sm text-slate-600">
      Mes
      <select
        className="rounded border border-slate-300 p-2 text-sm capitalize"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {months.map((month) => (
          <option key={month} value={month} className="capitalize">
            {formatMonth(month)}
          </option>
        ))}
      </select>
    </label>
  );
}
