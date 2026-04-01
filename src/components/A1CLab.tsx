'use client';

import { useState } from 'react';

export default function A1CLab({ t }: { t: any }) {
  const [avg, setAvg] = useState('');
  const [a1c, setA1c] = useState<string | null>(null);

  const calcA1C = () => {
    const valAvg = parseFloat(avg);
    if (!valAvg) return;
    const res = ((valAvg + 46.7) / 28.7).toFixed(1);
    setA1c(res);
  };

  return (
    <section id="a1c">
      <div className="section-header">
        <h1 className="section-title">HbA1c Estimator</h1>
        <p className="section-sub">Project your next lab result based on your home monitoring daily averages (eAG).</p>
      </div>
      <div className="card">
        <div className="field">
          <label>Average Blood Glucose (mg/dL)</label>
          <input type="number" value={avg} onChange={(e) => setAvg(e.target.value)} placeholder="e.g. 154" />
        </div>
        <button className="btn bp" onClick={calcA1C}>Estimate Lab Result</button>
        
        {a1c !== null && (
          <div className="notice ni" style={{ marginTop: '2rem' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '0.5rem' }}>Estimated Result: {a1c}%</div>
            <small>Standard ADAG conversion (eAG to HbA1c). Clinical correlation required.</small>
          </div>
        )}
      </div>
    </section>
  );
}
