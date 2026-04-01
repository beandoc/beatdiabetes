'use client';

import { useState } from 'react';

export default function Calculators({ t }: { t: any }) {
  const [bg, setBg] = useState('');
  const [tgt, setTgt] = useState('100');
  const [isf, setIsf] = useState('');
  const [dose, setDose] = useState<string | null>(null);

  const calcInsulin = () => {
    const valBg = parseFloat(bg);
    const valTgt = parseFloat(tgt);
    const valIsf = parseFloat(isf);
    if (!valBg || !valIsf) return;
    const res = Math.max(0, (valBg - valTgt) / valIsf).toFixed(1);
    setDose(res);
  };

  return (
    <section id="insulin">
      <div className="section-header">
        <h1 className="section-title">Insulin Precision Tools</h1>
      </div>

      <div className="g2">
        <div className="card">
          <div className="card-title"><span>➗</span> {t.dashboard === 'डॅशबोर्ड' || t.dashboard === 'डैशबोर्ड' ? 'करेक्शन डोस (ISF)' : 'Correction Dose (ISF)'}</div>
          <div className="field">
            <label>{t.bgLevel} (mg/dL)</label>
            <input type="number" value={bg} onChange={(e) => setBg(e.target.value)} placeholder="e.g. 180" />
          </div>
          <div className="field">
            <label>Target BG (mg/dL)</label>
            <input type="number" value={tgt} onChange={(e) => setTgt(e.target.value)} />
          </div>
          <div className="field">
            <label>Sensitivity Factor (ISF)</label>
            <input type="number" value={isf} onChange={(e) => setIsf(e.target.value)} placeholder="e.g. 50" />
          </div>
          <button className="btn bp" style={{ width: '100%' }} onClick={calcInsulin}>Calculate Dose</button>
          
          {dose !== null && (
            <div className="notice ni" style={{ marginTop: '2rem' }}>
              <strong>Estimated Correction: {dose} Units</strong><br />
              <small>Formula: (Current - Target) / ISF</small>
            </div>
          )}
        </div>

        <div className="card">
          <div className="card-title"><span>⏳</span> Insulin Storage Guide</div>
          <ul style={{ paddingLeft: '1.5rem', fontSize: '0.9rem', color: 'var(--text-muted)', listStyle: 'disc' }}>
            <li style={{ marginBottom: '0.75rem' }}><strong>In-use Pen:</strong> Room temp (&lt;30°C) for 28 days.</li>
            <li style={{ marginBottom: '0.75rem' }}><strong>Unopened Vials:</strong> Refrigerator (2-8°C). Do not freeze.</li>
            <li style={{ marginBottom: '0.75rem' }}><strong>Travel:</strong> Use a cooling pouch (FRIO). Avoid direct sunlight.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
