import React from 'react';

export interface ComparisonRow {
  feature: string;
  free: string | boolean;
  pro: string | boolean;
  enterprise: string | boolean;
}

export const ComparisonTable: React.FC<{ rows: ComparisonRow[] } > = ({ rows }) => {
  const cell = (v: any) => typeof v === 'boolean' ? (v ? '✓' : '—') : v;
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="text-left text-neutral-700">
            <th className="py-2 pr-4">Feature</th>
            <th className="py-2 pr-4">Free</th>
            <th className="py-2 pr-4">Pro</th>
            <th className="py-2">Enterprise</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-t border-neutral-200">
              <td className="py-2 pr-4 text-neutral-900">{r.feature}</td>
              <td className="py-2 pr-4">{cell(r.free)}</td>
              <td className="py-2 pr-4">{cell(r.pro)}</td>
              <td className="py-2">{cell(r.enterprise)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
