import React from 'react';

export default function EmissionCard({ title, badge, badgeColor, description, value, unit, theme }) {
  const themes = {
    rose: "border-rose-500/30 bg-rose-950/20 text-rose-400",
    amber: "border-amber-500/30 bg-amber-950/20 text-amber-400",
    emerald: "border-emerald-500/40 bg-emerald-950/30 text-emerald-400 ring-1 ring-emerald-500/20"
  };

  const badgeStyles = {
    rose: "bg-rose-900/60 text-rose-300",
    amber: "bg-amber-900/60 text-amber-300",
    emerald: "bg-emerald-900/60 text-emerald-300"
  };

  return (
    <div className={`border p-4 rounded-xl flex items-center justify-between transition hover:-translate-y-0.5 ${themes[theme]}`}>
      <div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wide">{title}</span>
          {badge && (
            <span className={`text-[10px] px-2 py-0.5 rounded-full ${badgeStyles[badgeColor]}`}>
              {badge}
            </span>
          )}
        </div>
        <p className="text-xs text-slate-400 mt-1">{description}</p>
      </div>
      <div className="text-right">
        <div className="text-xl font-extrabold">{value}</div>
        <span className="text-[11px] text-slate-400">{unit}</span>
      </div>
    </div>
  );
}