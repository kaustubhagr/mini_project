import React from 'react';

export default function EmissionCard({ title, badge, badgeColor, description, value, unit, theme, image }) {
  const themes = {
    rose: "border-rose-500/30 bg-gradient-to-r from-slate-900/90 to-rose-950/20 text-rose-400",
    amber: "border-amber-500/30 bg-gradient-to-r from-slate-900/90 to-amber-950/20 text-amber-400",
    emerald: "border-emerald-500/40 bg-gradient-to-r from-slate-900/90 to-emerald-950/30 text-emerald-400 ring-1 ring-emerald-500/20"
  };

  const badgeStyles = {
    rose: "bg-rose-900/60 text-rose-300 border-rose-700/40",
    amber: "bg-amber-900/60 text-amber-300 border-amber-700/40",
    emerald: "bg-emerald-900/60 text-emerald-300 border-emerald-700/40"
  };

  return (
    <div className={`border p-4 rounded-2xl flex flex-col sm:flex-row items-center gap-4 transition duration-200 hover:-translate-y-1 shadow-md ${themes[theme]}`}>
      {/* Mode Thumbnail Image */}
      <img 
        src={image} 
        alt={title} 
        className="w-full sm:w-24 h-20 sm:h-20 object-cover rounded-xl border border-slate-700/60"
      />

      <div className="flex-1 w-full sm:w-auto">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold uppercase tracking-wider text-slate-100">{title}</span>
          {badge && (
            <span className={`text-[10px] border px-2 py-0.5 rounded-full font-medium ${badgeStyles[badgeColor]}`}>
              {badge}
            </span>
          )}
        </div>
        <p className="text-xs text-slate-400 mt-1">{description}</p>
      </div>

      <div className="text-left sm:text-right w-full sm:w-auto border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-800">
        <div className="text-2xl font-black">{value}</div>
        <span className="text-[11px] text-slate-400 font-medium">{unit}</span>
      </div>
    </div>
  );
}