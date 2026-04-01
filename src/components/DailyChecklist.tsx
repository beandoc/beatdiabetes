'use client';

export default function DailyChecklist({ t }: { t: any }) {
  return (
    <section id="daily">
      <div className="section-header">
        <h1 className="section-title">Daily Care Protocol</h1>
        <p className="section-sub">Your essential routine for long-term health and complication prevention.</p>
      </div>
      <div className="card">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2.5rem' }}>
          <div>
            <h4 style={{ marginBottom: '1rem', color: 'var(--primary)' }}>🦶 Foot Check</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>Inspect daily for redness, blisters, or cuts. Use a mirror for soles. Never walk barefoot.</p>
          </div>
          <div>
            <h4 style={{ marginBottom: '1rem', color: 'var(--primary)' }}>💉 Site Rotation</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>Change injection sites daily (at least 1 inch apart) to prevent fatty lumps (lipohypertrophy).</p>
          </div>
          <div>
            <h4 style={{ marginBottom: '1rem', color: 'var(--primary)' }}>💧 Hydration</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>Aim for 2.5-3L of water daily. Essential for kidney health and flushing excess glucose.</p>
          </div>
          <div>
            <h4 style={{ marginBottom: '1rem', color: 'var(--primary)' }}>📋 Med Sync</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>Verify your long-acting (basal) insulin timing. Consistency is key for stable days.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
