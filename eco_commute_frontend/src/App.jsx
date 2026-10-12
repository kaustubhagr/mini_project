import React, { useState } from 'react';
import CommuteForm from './components/CommuteForm';
import EmissionCard from './components/EmissionCard';
import MapView from './components/MapView';

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

  const [coords] = useState([
    [28.6315, 77.2167],
    [28.4986, 77.0878]
  ]);

  const [emissions, setEmissions] = useState({
    solo: '6.01 kg',
    carpool: '2.10 kg',
    transit: '0.91 kg',
    distance: 32.5
  });

  const handlePredict = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      /*
      const res = await fetch('http://localhost:8000/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      setEmissions(data);
      */
      
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
          distance: dist
        });
        setClaimed(false);
        setLoading(false);
      }, 300);

    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleClaimPoints = () => {
    setPoints((prev) => prev + 25);
    setClaimed(true);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      <header className="bg-slate-800/80 backdrop-blur border-b border-slate-700 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="bg-emerald-500/20 text-emerald-400 p-2 rounded-xl text-lg">🌱</div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white">EcoCommute</h1>
            <p className="text-xs text-slate-400">Emission Optimizer</p>
          </div>
        </div>

        <div className="bg-emerald-950/60 border border-emerald-500/30 px-4 py-1.5 rounded-full flex items-center gap-2">
          <span className="text-xs text-emerald-400 font-medium">Points:</span>
          <span className="text-sm font-bold text-emerald-300">{points}</span>
        </div>
      </header>

      <main className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 max-w-7xl mx-auto w-full">
        <div className="lg:col-span-5 flex flex-col gap-6">
          <CommuteForm 
            formData={formData} 
            setFormData={setFormData} 
            onSubmit={handlePredict} 
            loading={loading}
          />

          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-semibold tracking-wider uppercase text-slate-400">Predicted CO₂</h3>
            
            <EmissionCard 
              title="Solo Drive" 
              badge="High" 
              badgeColor="rose" 
              description="Single passenger vehicle"
              value={emissions.solo}
              unit="CO₂ / trip"
              theme="rose"
            />

            <EmissionCard 
              title="Carpool (3 pax)" 
              badge="-66%" 
              badgeColor="amber" 
              description="Shared personal vehicle"
              value={emissions.carpool}
              unit="CO₂ / person"
              theme="amber"
            />

            <EmissionCard 
              title="Public Transit" 
              badge="Recommended" 
              badgeColor="emerald" 
              description="Metro or mass transit"
              value={emissions.transit}
              unit="CO₂ / person"
              theme="emerald"
            />

            <button 
              onClick={handleClaimPoints}
              disabled={claimed}
              className={`mt-2 py-2.5 rounded-xl border text-sm font-medium transition ${
                claimed 
                  ? 'bg-slate-800 text-emerald-400 border-slate-700 opacity-80 cursor-default'
                  : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 border-emerald-500 font-semibold'
              }`}
            >
              {claimed ? 'Trip Logged (+25 Pts)' : 'Choose Transit (+25 Pts)'}
            </button>
          </div>
        </div>

        <div className="lg:col-span-7">
          <MapView coords={coords} distance={emissions.distance} />
        </div>
      </main>
    </div>
  );
}