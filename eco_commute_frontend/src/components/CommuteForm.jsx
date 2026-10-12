import React from 'react';

export default function CommuteForm({ formData, setFormData, onSubmit, loading }) {
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={onSubmit} className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-xl space-y-4">
      <h2 className="text-lg font-semibold text-white">Route Setup</h2>
      
      <div>
        <label className="block text-xs font-medium text-slate-400 mb-1">Origin</label>
        <input 
          type="text" 
          name="origin" 
          value={formData.origin}
          onChange={handleChange}
          required
          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-slate-400 mb-1">Destination</label>
        <input 
          type="text" 
          name="destination" 
          value={formData.destination}
          onChange={handleChange}
          required
          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">Vehicle</label>
          <select 
            name="vehicleType" 
            value={formData.vehicleType}
            onChange={handleChange}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
          >
            <option value="petrol_sedan">Petrol Car (1.5L)</option>
            <option value="diesel_suv">Diesel SUV (2.0L)</option>
            <option value="cng_car">CNG Car</option>
            <option value="two_wheeler">Two-Wheeler</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">Traffic</label>
          <select 
            name="trafficDensity" 
            value={formData.trafficDensity}
            onChange={handleChange}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
          >
            <option value="1.0">Light (1.0x)</option>
            <option value="1.3">Moderate (1.3x)</option>
            <option value="1.7">Heavy (1.7x)</option>
          </select>
        </div>
      </div>

      <button 
        type="submit" 
        disabled={loading}
        className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-slate-950 font-semibold py-3 rounded-xl transition shadow-lg shadow-emerald-500/20 active:scale-[0.98]"
      >
        {loading ? 'Evaluating...' : 'Predict Emissions'}
      </button>
    </form>
  );
}