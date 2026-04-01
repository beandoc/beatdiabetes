'use client';

import { useState } from 'react';

export default function Lifestyle({ t }: { t: any }) {
  const [exType, setExType] = useState('3.5');
  const [dur, setDur] = useState('');
  const [wt, setWt] = useState('');
  const [burn, setBurn] = useState<number | null>(null);

  const calcBurn = () => {
    const met = parseFloat(exType);
    const valDur = parseFloat(dur);
    const valWt = parseFloat(wt);
    if (!valDur || !valWt) return;
    const res = Math.round((met * 3.5 * valWt / 200) * valDur);
    setBurn(res);
  };

  return (
    <section id="lifestyle">
      <div className="section-header">
        <h1 className="section-title">Lifestyle & Exercise</h1>
        <p className="section-sub">Manage your T1D during physical activity to prevent delayed hypoglycemia.</p>
      </div>
      <div className="g2">
        <div className="card">
          <div className="card-title">Exercise Safety Rules</div>
          <p style={{ fontSize: '0.95rem', marginBottom: '1.5rem', color: 'var(--text-muted)' }}>Exercise works like insulin — it lowers blood sugar. Always carry fast-acting glucose.</p>
          <div className="notice nw"><strong>Pre-Check:</strong> If BG is &lt; 100 mg/dL, eat 15g carbs before starting.</div>
          <div className="notice nd"><strong>Stop!</strong> Don't exercise if BG &gt; 250 mg/dL and ketones are positive.</div>
        </div>
        <div className="card">
          <div className="card-title">Activity Burn Estimator</div>
          <div className="field">
            <label>Activity</label>
            <select value={exType} onChange={(e) => setExType(e.target.value)}>
              <option value="3.5">Walking (Brisk)</option>
              <option value="7.0">Running (8km/h)</option>
              <option value="6.0">Cycling (Moderate)</option>
              <option value="8.0">Swimming (Laps)</option>
            </select>
          </div>
          <div className="field">
            <label>Duration (min)</label>
            <input type="number" value={dur} onChange={(e) => setDur(e.target.value)} placeholder="45" />
          </div>
          <div className="field">
            <label>Weight (kg)</label>
            <input type="number" value={wt} onChange={(e) => setWt(e.target.value)} placeholder="70" />
          </div>
          <button className="btn bp" style={{ width: '100%' }} onClick={calcBurn}>Estimate Burn</button>
          
          {burn !== null && (
            <div className="notice ni" style={{ marginTop: '2rem' }}>
              <strong>Projected Burn: {burn} Calories</strong><br />
              <small>May require approx. 15-30g carbs for stable BG maintenance.</small>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
