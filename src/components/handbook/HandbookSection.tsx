'use client';

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, 
  Search, 
  HelpCircle, 
  Stethoscope, 
  FlaskConical, 
  Settings, 
  GraduationCap, 
  Plane, 
  AlertTriangle,
  Menu
} from 'lucide-react';

export default function Handbook({ t }: { t: any }) {
  const CATEGORIES: Record<string, { label: string, icon: any }> = {
    basics: { label: t.basics, icon: GraduationCap },
    clinical: { label: "Clinical Care", icon: Stethoscope },
    math: { label: "Precise Math", icon: FlaskConical },
    safety: { label: "Safety & Emergency", icon: AlertTriangle },
    lifestyle: { label: t.lifestyle, icon: Settings },
    travel: { label: "Global Travel", icon: Plane }
  };

  const CHAPTERS = [
    { id: 1, cat: 'basics', title: t.dashboard === 'डॅशबोर्ड' || t.dashboard === 'डैशबोर्ड' ? 'टाइप 1 मधुमेह क्या है?' : "What is Type 1 Diabetes?", label: "01" },
    { id: 2, cat: 'basics', title: "Understanding Blood Sugar", label: "02" },
    { id: 3, cat: 'clinical', title: "Nutrition and Diet", label: "03" },
    { id: 4, cat: 'clinical', title: "Insulin Therapy", label: "04" },
    { id: 5, cat: 'math', title: "Calculations (ICR & ISF)", label: "05" },
    { id: 6, cat: 'safety', title: "Device Safety (Syringes & Pens)", label: "06" },
    { id: 7, cat: 'clinical', title: "Injection Map & Sites", label: "07" },
    { id: 8, cat: 'clinical', title: "Lumps (Lipohypertrophy)", label: "08" },
    { id: 9, cat: 'safety', title: "Storage & Life Safety", label: "09" },
    { id: 10, cat: 'safety', title: "Hypoglycemia (Lows)", label: "10" },
    { id: 11, cat: 'safety', title: "DKA & Sick Day Rules", label: "11" },
    { id: 12, cat: 'clinical', title: "Prevention & Complications", label: "12" },
    { id: 13, cat: 'clinical', title: "Foot Care Protocol", label: "13" },
    { id: 14, cat: 'basics', title: "Autoimmune Conditions", label: "14" },
    { id: 15, cat: 'basics', title: "Reproductive Health", label: "15" },
    { id: 16, cat: 'basics', title: "Marriage & Social", label: "16" },
    { id: 17, cat: 'lifestyle', title: "Education & School", label: "17" },
    { id: 18, cat: 'lifestyle', title: "Work & Driving", label: "18" },
    { id: 19, cat: 'lifestyle', title: "Legal Rights in India", label: "19" },
    { id: 20, cat: 'travel', title: "Travel Preparation", label: "20" },
    { id: 21, cat: 'travel', title: "Flight Safety & Timezones", label: "21" },
    { id: 22, cat: 'basics', title: "The FIST Approach", label: "22" },
  ];
  const [activeCh, setActiveCh] = useState(1);
  const [activeCat, setActiveCat] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredChapters = useMemo(() => {
    return CHAPTERS.filter(ch => {
      const matchCat = activeCat === 'all' || ch.cat === activeCat;
      const matchSearch = ch.title.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [activeCat, searchQuery]);

  const currentChapter = CHAPTERS.find(c => c.id === activeCh);

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="section-header">
        <h1 className="section-title">Clinical Knowledge Base</h1>
        <p className="section-sub">Evidence-based T1D management protocol by Command Hospital (SC), Pune. Integrated with RSSDI & ISPAD 2022 standards.</p>
      </div>

      <div style={{ display: 'flex', gap: '2rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '300px' }}>
          {/* SEARCH & FILTER */}
          <div style={{ position: 'relative', marginBottom: '2rem' }}>
            <Search style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={18} />
            <input 
              type="text" 
              placeholder="Search handbook topics..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ paddingLeft: '3.25rem', background: 'var(--bg-surface)', border: '1px solid var(--border)' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '2rem' }}>
             <button 
              className={`btn ${activeCat === 'all' ? 'bp' : 'secondary'}`} 
              onClick={() => setActiveCat('all')}
              style={{ padding: '0.6rem 1rem', fontSize: '0.8rem' }}
            >
              All Topics
            </button>
            {Object.entries(CATEGORIES).map(([id, cat]) => {
              const Icon = cat.icon;
              return (
                <button 
                  key={id}
                  className={`btn ${activeCat === id ? 'bp' : 'secondary'}`}
                  onClick={() => setActiveCat(id)}
                  style={{ padding: '0.6rem 1rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <Icon size={14} /> {cat.label}
                </button>
              );
            })}
          </div>

          <div className="handbook-toc" style={{ gridTemplateColumns: '1fr', height: '500px', overflowY: 'auto', paddingRight: '1rem' }}>
            <AnimatePresence mode="popLayout">
              {filteredChapters.map((ch) => (
                <motion.button
                  key={ch.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="toc-btn"
                  onClick={() => setActiveCh(ch.id)}
                  style={activeCh === ch.id ? { borderColor: 'var(--primary)', background: 'rgba(45,212,191,0.05)' } : {}}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1 }}>
                    <span>{ch.label}</span>
                    <div style={{ fontSize: '0.9rem' }}>{ch.title}</div>
                  </div>
                  <ChevronRight size={16} opacity={0.4} />
                </motion.button>
              ))}
            </AnimatePresence>
            {filteredChapters.length === 0 && (
              <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>
                <HelpCircle size={40} style={{ opacity: 0.2, marginBottom: '1rem' }} />
                <p>No chapters found for "{searchQuery}"</p>
              </div>
            )}
          </div>
        </div>

        <div style={{ flex: 1.8, minWidth: '400px' }}>
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeCh}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="card"
              style={{ minHeight: '600px' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
                 <span style={{ fontSize: '0.65rem', fontWeight: 800, background: 'var(--primary)', color: 'var(--bg-deep)', padding: '2px 8px', borderRadius: '4px' }}>
                   CHAPTER {currentChapter?.label}
                 </span>
                 <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                   {CATEGORIES[currentChapter?.cat as keyof typeof CATEGORIES]?.label}
                 </span>
              </div>
              <h2 className="card-title" style={{ fontSize: '2rem', borderBottom: '1px solid var(--border)', paddingBottom: '1.5rem' }}>
                {currentChapter?.title}
              </h2>
              
              <div className="chapter-body" style={{ marginTop: '2rem' }}>
                {activeCh === 1 && (
                  <>
                    <p style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '1.5rem' }}>Type 1 Diabetes (T1D) is a condition where your body's own immune system mistakenly attacks and destroys the special cells in the pancreas that produce insulin.</p>
                    <div className="notice ni" style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                      <FlaskConical size={32} />
                      <div>
                        <strong>Key Fact: The Beta Cells</strong><br />
                        Your pancreas contains beta cells that make insulin — a hormone that acts like a 'key' to let sugar (glucose) from food enter your body's cells to give you energy. In T1D, these cells are missing.
                      </div>
                    </div>
                  </>
                )}

                {activeCh === 10 && (
                  <>
                    <div className="notice nd" style={{ border: '2px solid' }}>
                      <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <AlertTriangle /> Rule of 15-15 (Emergency)
                      </h3>
                      <ol style={{ paddingLeft: '1.5rem', lineHeight: '2.2', fontSize: '1.1rem' }}>
                        <li><strong>Step 1:</strong> Eat 15g Fast Carbs (e.g. 3 tsp sugar in water).</li>
                        <li><strong>Step 2:</strong> Wait 15 Minutes (Rest completely).</li>
                        <li><strong>Step 3:</strong> Re-test blood sugar with glucometer.</li>
                        <li><strong>Step 4:</strong> If still &lt; 70, repeat Step 1.</li>
                      </ol>
                    </div>
                  </>
                )}

                {activeCh === 22 && (
                  <>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
                       {[
                         { l: 'F', n: 'FOOD', d: 'Log every meal & carbohydrate load', c: 'var(--accent)' },
                         { l: 'I', n: 'INSULIN', d: 'Log type, dose, time & site', c: 'var(--primary)' },
                         { l: 'S', n: 'SUGAR', d: 'Log glucose value & context', c: '#fbbf24' },
                         { l: 'T', n: 'TIME', d: 'Connect meals, doses & tests', c: 'var(--secondary)' }
                       ].map(f => (
                         <div key={f.l} className="sbox" style={{ textAlign: 'left', padding: '1.5rem' }}>
                            <div style={{ fontSize: '2rem', fontWeight: 800, color: f.c, marginBottom: '0.5rem' }}>{f.l}</div>
                            <div style={{ fontWeight: 800, letterSpacing: '0.1em', fontSize: '0.8rem', color: '#fff' }}>{f.n}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '6px' }}>{f.d}</div>
                         </div>
                       ))}
                    </div>
                  </>
                )}
                
                <p style={{ marginTop: '3rem', opacity: 0.4, fontStyle: 'italic', fontSize: '0.8rem' }}>
                  Reference: Chapter {activeCh} | Dept. of Endocrinology, Command Hospital (SC)
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  );
}
