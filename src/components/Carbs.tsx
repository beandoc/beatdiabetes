'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Apple, Milk, Wheat, Carrot, Cookie, Plus, RotateCcw } from 'lucide-react';

const FOODS: Record<string, any[]> = {
  grains: [
    { n: 'Small Roti', c: 15, u: '1 pc', icon: Wheat },
    { n: 'Rice (Cooked)', c: 22, u: '1/2 cup', icon: Wheat },
    { n: 'Idli', c: 15, u: '1 pc', icon: Wheat },
    { n: 'Dosa (Plain)', c: 25, u: '1 med', icon: Wheat },
    { n: 'Bread', c: 12, u: '1 slice', icon: Wheat }
  ],
  fruits: [
    { n: 'Apple (Med)', c: 20, u: '1 pc', icon: Apple },
    { n: 'Banana (Med)', c: 25, u: '1 pc', icon: Apple },
    { n: 'Mango', c: 25, u: '1/2 cup', icon: Apple },
    { n: 'Grapes', c: 15, u: '15 pcs', icon: Apple }
  ],
  dairy: [
    { n: 'Milk', c: 12, u: '1 cup', icon: Milk },
    { n: 'Yogurt', c: 15, u: '1 cup', icon: Milk },
    { n: 'Paneer', c: 3, u: '100g', icon: Milk }
  ],
  veg: [
    { n: 'Potato (Cooked)', c: 20, u: '1/2 cup', icon: Carrot },
    { n: 'Corn', c: 15, u: '1/2 cup', icon: Carrot },
    { n: 'Peas', c: 10, u: '1/2 cup', icon: Carrot }
  ],
  snacks: [
    { n: 'Samosa', c: 25, u: '1 pc', icon: Cookie },
    { n: 'Biscuits', c: 20, u: '3 pcs', icon: Cookie },
    { n: 'Namkeen', c: 15, u: '1/2 cup', icon: Cookie }
  ]
};

export default function CarbCounter({ t }: { t: any }) {
  const CATEGORIES = [
    { id: 'grains', label: t.dashboard === 'डॅशबोर्ड' || t.dashboard === 'डैशबोर्ड' ? 'अनाज' : '🌾 Grains', icon: Wheat },
    { id: 'fruits', label: t.dashboard === 'डॅशबोर्ड' || t.dashboard === 'डैशबोर्ड' ? 'फल' : '🍎 Fruits', icon: Apple },
    { id: 'dairy', label: t.dashboard === 'डॅशबोर्ड' || t.dashboard === 'डैशबोर्ड' ? 'डेयरी' : '🥛 Dairy', icon: Milk },
    { id: 'veg', label: t.dashboard === 'डॅशबोर्ड' || t.dashboard === 'डैशबोर्ड' ? 'सब्जियां' : '🥦 Veggies', icon: Carrot },
    { id: 'snacks', label: t.dashboard === 'डॅशबोर्ड' || t.dashboard === 'डैशबोर्ड' ? 'नाश्ता' : '🥨 Snacks', icon: Cookie }
  ];
  const [activeCat, setActiveCat] = useState('grains');
  const [totalCarbs, setTotalCarbs] = useState(0);

  return (
    <motion.section 
      id="carbs"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="section-header">
        <h1 className="section-title">Glycemic Matrix</h1>
        <p className="section-sub">A precise clinical tool for estimating carbohydrate load in common regional foods. Designed for rapid pre-bolus titration.</p>
      </div>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '2.5rem', overflowX: 'auto', paddingBottom: '1rem' }}>
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          return (
            <button
              key={cat.id}
              className={`btn ${activeCat === cat.id ? 'bp' : 'secondary'}`}
              onClick={() => setActiveCat(cat.id)}
              style={{ display: 'flex', gap: '8px', alignItems: 'center', whiteSpace: 'nowrap' }}
            >
              <Icon size={14} /> {cat.label}
            </button>
          );
        })}
      </div>

      <div className="carb-grid" style={{ minHeight: '300px' }}>
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeCat}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1.25rem' }}
          >
            {FOODS[activeCat].map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div 
                  key={i} 
                  className="carb-card" 
                  onClick={() => setTotalCarbs(totalCarbs + f.c)}
                  whileHover={{ scale: 1.05, borderColor: 'var(--primary)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '10px', borderRadius: '12px' }}>
                      <Icon size={24} color="var(--primary)" />
                    </div>
                    <Plus size={14} opacity={0.4} />
                  </div>
                  <h4 style={{ fontSize: '1.1rem', marginBottom: '4px' }}>{f.n}</h4>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Portion: {f.u}</p>
                  <div className="carb-val" style={{ marginTop: '1.5rem', fontSize: '1.25rem', fontWeight: 800 }}>
                    {f.c}g <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 600 }}>CARBS</span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      <motion.div 
        className="card" 
        style={{ 
          background: 'var(--primary)', 
          color: 'var(--bg-deep)', 
          marginTop: '3rem',
          boxShadow: '0 15px 40px -10px var(--primary-glow)',
          padding: '2.5rem'
        }}
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
          <div>
            <div style={{ fontSize: '0.9rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.15em', opacity: 0.7 }}>Active Meal Total</div>
            <motion.div 
              key={totalCarbs}
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              style={{ fontSize: '4.5rem', fontFamily: 'Outfit', fontWeight: 900, lineHeight: 1, marginTop: '8px' }}
            >
              {totalCarbs}<small style={{ fontSize: '1.25rem', marginLeft: '8px', opacity: 0.8 }}>GRAMS</small>
            </motion.div>
          </div>
          <button 
            className="btn" 
            style={{ background: 'var(--bg-deep)', color: '#fff', padding: '1.25rem 2rem' }} 
            onClick={() => setTotalCarbs(0)}
          >
            <RotateCcw size={18} /> Reset Matrix
          </button>
        </div>
      </motion.div>

      <div style={{ marginTop: '2rem', textAlign: 'center', opacity: 0.4, fontSize: '0.75rem' }}>
        * Values represent estimated clinical glycemic load. Consult with your endocrinologist for precise carbohydrate titration.
      </div>
    </motion.section>
  );
}
