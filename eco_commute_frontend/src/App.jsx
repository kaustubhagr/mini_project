import React, { useState } from 'react';
import CommuteForm from './components/CommuteForm';
import EmissionCard from './components/EmissionCard';

export default function App() {
  const [points, setPoints] = useState(120);
  const [loading, setLoading] = useState(false);
  const [claimed, setClaimed] = useState(false);
  
  const [formData, setFormData] = useState({
    origin: 'Connaught Place, Delhi',
    destination: 'Cyber Hub, Gurugram',
    vehicleType: 'petrol_sedan',
    trafficDensity: '1.3'
  });

  const [emissions, setEmissions] = useState({
    solo: '6.01 kg',
    carpool: '2.10 kg',
    transit: '0.91 kg',
    treesSaved: 14,
    costSaved: '₹280',
    distance: 32.5
  });

  const handlePredict = (e) => {
    e.preventDefault();
    setLoading(true);

    const factorMap = { petrol_sedan: 142, diesel_suv: 185, cng_car: 95, two_wheeler: 60 };
    const dist = 32.5;
    const rate = factorMap[formData.vehicleType] || 140;
    const traffic = parseFloat(formData.trafficDensity);
    
    const solo = (dist * rate * traffic) / 1000;
    const carpool = (solo * 1.05) / 3;
    const transit = (dist * 28) / 1000;

    setTimeout(() => {
      setEmissions({
        solo: `${solo.toFixed(2)} kg`,
        carpool: `${carpool.toFixed(2)} kg`,
        transit: `${transit.toFixed(2)} kg`,
        treesSaved: Math.round((solo - transit) * 3),
        costSaved: `₹${Math.round(dist * 8.5)}`,
        distance: dist
      });
      setClaimed(false);
      setLoading(false);
    }, 250);
  };

  const handleClaimPoints = () => {
    setPoints((prev) => prev + 25);
    setClaimed(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-slate-100 flex flex-col font-sans">
      
      {/* Top Navbar */}
      <header className="bg-slate-900/60 backdrop-blur-md border-b border-emerald-900/40 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-xl shadow-lg shadow-emerald-500/20">
            🌱
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
              EcoCommute <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full uppercase tracking-wider font-semibold">AI Suite</span>
            </h1>
            <p className="text-xs text-slate-400">Urban Transit & Carbon Impact Analyzer</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-slate-800/80 border border-emerald-500/30 px-4 py-2 rounded-xl flex items-center gap-2.5 shadow-sm">
            <span className="text-xs text-slate-400 font-medium">Eco Score</span>
            <span className="text-emerald-400 font-bold text-base">{points} pts</span>
            <span className="text-sm">🎖️</span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 pt-8 pb-4 w-full">
        <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-900/40 backdrop-blur p-8 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl z-10">
            <span className="inline-block px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full text-xs font-semibold mb-3">
              Smart Mobility Optimizer
            </span>
            <h2 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
              Turn your daily commute into <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">climate action</span>.
            </h2>
            <p className="mt-3 text-sm text-slate-400 leading-relaxed">
              Compare transit modes with live emission metrics. Save money, reduce congestion, and earn rewards for choosing greener travel.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 w-full md:w-auto z-10">
            <div className="bg-slate-800/80 border border-slate-700/60 p-4 rounded-2xl text-center">
              <span className="text-2xl">🌲</span>
              <div className="text-xl font-bold text-emerald-400 mt-1">{emissions.treesSaved}</div>
              <div className="text-[11px] text-slate-400">Trees Offset Equiv.</div>
            </div>
            <div className="bg-slate-800/80 border border-slate-700/60 p-4 rounded-2xl text-center">
              <span className="text-2xl">💰</span>
              <div className="text-xl font-bold text-teal-300 mt-1">{emissions.costSaved}</div>
              <div className="text-[11px] text-slate-400">Est. Fuel Savings</div>
            </div>
          </div>
          <div className="absolute -right-16 -top-16 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        </div>
      </div>

      {/* Main Content Layout */}
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 max-w-7xl mx-auto w-full">
        
        {/* Left: Input Form */}
        <div className="lg:col-span-5">
          <CommuteForm 
            formData={formData} 
            setFormData={setFormData} 
            onSubmit={handlePredict} 
            loading={loading}
          />
        </div>

        {/* Right: Visual Cards & Transit Selection */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-sm font-semibold tracking-wider uppercase text-slate-400">Mode Comparison</h3>
            <span className="text-xs text-slate-500 font-mono">Trip: {emissions.distance} km</span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            
            <EmissionCard 
              title="Solo Vehicle" 
              badge="High Impact" 
              badgeColor="rose" 
              description="Single-occupancy car commute"
              value={emissions.solo}
              unit="CO₂ / trip"
              theme="rose"
              image="https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=400&q=80"
            />

            <EmissionCard 
              title="Shared Ride / Carpool" 
              badge="-66% Emission" 
              badgeColor="amber" 
              description="Divided across 3 co-passengers"
              value={emissions.carpool}
              unit="CO₂ / person"
              theme="amber"
              image="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=400&q=80"
            />

            <EmissionCard 
              title="Metro & Mass Transit" 
              badge="Eco Choice" 
              badgeColor="emerald" 
              description="High efficiency electric rapid transit"
              value={emissions.transit}
              unit="CO₂ / person"
              theme="emerald"
              image="https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=400&q=80"
            />

          </div>

          {/* Gamification Action Button */}
          <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 mt-2">
            <div>
              <h4 className="text-sm font-semibold text-white">Commit to a Greener Ride</h4>
              <p className="text-xs text-slate-400">Lock in your transit choice to record carbon savings.</p>
            </div>
            <button 
              onClick={handleClaimPoints}
              disabled={claimed}
              className={`w-full sm:w-auto px-6 py-3 rounded-xl border text-sm transition whitespace-nowrap ${
                claimed 
                  ? 'bg-slate-800/90 text-emerald-400 border-slate-700 opacity-90 cursor-default'
                  : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 border-emerald-400 font-semibold shadow-lg shadow-emerald-500/20 active:scale-95'
              }`}
            >
              {claimed ? 'Trip Logged (+25 Pts)' : 'Choose Transit (+25 Pts)'}
            </button>
          </div>

        </div>

      </main>
    </div>
  );
}