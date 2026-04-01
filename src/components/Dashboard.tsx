'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CirclePlus, 
  Activity, 
  CheckCircle2, 
  TrendingUp, 
  Target, 
  Zap, 
  History, 
  Trash2, 
  Thermometer, 
  Clock 
} from 'lucide-react';

type DashboardProps = {
  glucoseLog: any[];
  setGlucoseLog: (log: any[]) => void;
  userName: string;
  setUserName: (val: string) => void;
  mrdNo: string;
  setMrdNo: (val: string) => void;
  t: any;
};

const getStatus = (v: number) => {
  if (v < 70) return { label: 'LOW', cls: 's-low', col: '#f43f5e', icon: '🚨' };
  if (v <= 180) return { label: 'IN RANGE', cls: 's-ok', col: '#2dd4bf', icon: '✅' };
  if (v <= 250) return { label: 'HIGH', cls: 's-hi', col: '#fbbf24', icon: '⚠️' };
  return { label: 'URGENT', cls: 's-vhi', col: '#ef4444', icon: '🔥' };
};

export default function Dashboard({ glucoseLog, setGlucoseLog, userName, setUserName, mrdNo, setMrdNo, t }: DashboardProps) {
  const [bgInput, setBgInput] = useState('');
  const [mealCtx, setMealCtx] = useState('fasting');
  const [moodCtx, setMoodCtx] = useState('😐');
  const [bgNotes, setBgNotes] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const stats = (() => {
    if (glucoseLog.length === 0) return { avg: '—', tir: '—', cv: '—' };
    const vals = glucoseLog.map(e => e.val);
    const avg = Math.round(vals.reduce((a, b) => a + b, 0) / vals.length);
    const inRange = vals.filter(v => v >= 70 && v <= 180).length;
    const tir = Math.round((inRange / vals.length) * 100);
    const mean = avg;
    const sd = Math.sqrt(vals.reduce((a, b) => a + (b - mean) ** 2, 0) / vals.length);
    const cv = mean > 0 ? Math.round((sd / mean) * 100) : 0;
    return { avg, tir: `${tir}%`, cv: `${cv}%` };
  })();

  const latestEntry = glucoseLog.length > 0 ? glucoseLog[glucoseLog.length - 1] : null;
  const currentVal = latestEntry ? latestEntry.val : 0;
  const currentStatus = getStatus(currentVal);

  const logGlucose = () => {
    const val = parseInt(bgInput);
    if (!val || val < 20 || val > 600) { alert('Enter valid BG (20-600).'); return; }
    const newLog = [...glucoseLog, { 
      id: Date.now(),
      val, 
      ctx: mealCtx, 
      mood: moodCtx, 
      notes: bgNotes, 
      time: new Date() 
    }];
    setGlucoseLog(newLog);
    setBgInput('');
    setBgNotes('');
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const W = canvas.offsetWidth, H = 175;
    canvas.width = W * 2; canvas.height = H * 2;
    canvas.style.width = `${W}px`; canvas.style.height = `${H}px`;
    ctx.scale(2, 2);
    ctx.clearRect(0, 0, W, H);
    const toY = (v: number) => H - 15 - ((v - 40) / 360) * (H - 30);
    if (glucoseLog.length < 2) return;
    const pts = glucoseLog.map((e, i) => ({ x: (i / (glucoseLog.length - 1)) * W, y: toY(e.val) }));
    ctx.beginPath(); pts.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
    ctx.strokeStyle = '#2dd4bf'; ctx.lineWidth = 3; ctx.stroke();
  }, [glucoseLog]);

  return (
    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {/* HERO */}
      <div className="hero-section" style={{ padding: '2rem', marginBottom: '2rem', borderRadius: '16px', background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{t.welcome}</h1>
        <p style={{ color: 'var(--text-muted)' }}>{t.clinician}</p>
      </div>

      {/* STATS */}
      <div className="stat-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        <div className="card" style={{ textAlign: 'center', padding: '1rem' }}>
          <div style={{ fontSize: '0.7rem', color: 'var(--primary)' }}>{t.average}</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>{stats.avg}</div>
        </div>
        <div className="card" style={{ textAlign: 'center', padding: '1rem' }}>
          <div style={{ fontSize: '0.7rem', color: 'var(--accent)' }}>{t.tir}</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>{stats.tir}</div>
        </div>
        <div className="card" style={{ textAlign: 'center', padding: '1rem' }}>
          <div style={{ fontSize: '0.7rem', color: '#fbbf24' }}>{t.stability}</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>{stats.cv}</div>
        </div>
        <div className="card" style={{ textAlign: 'center', padding: '1rem', background: 'var(--primary)', color: 'var(--bg-deep)' }}>
          <div style={{ fontSize: '0.7rem' }}>LOG INTEGRITY</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>100%</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '2rem' }}>
        <div className="card">
          <h3>{t.status}</h3>
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <div style={{ fontSize: '4rem', fontWeight: 800 }}>{currentVal || '--'}</div>
            <div className={`badge ${currentStatus.cls}`}>{currentStatus.label}</div>
          </div>
          <canvas ref={canvasRef} style={{ width: '100%', height: '175px' }} />
        </div>

        <div className="card">
          <h3>{t.logEntry}</h3>
          <div className="field">
            <label>{t.bgLevel} (mg/dL)</label>
            <input type="number" value={bgInput} onChange={(e) => setBgInput(e.target.value)} placeholder="000" />
          </div>
          <div className="field">
            <label>{t.context}</label>
            <select value={mealCtx} onChange={(e) => setMealCtx(e.target.value)}>
              <option value="fasting">{t.fasting}</option>
              <option value="post">{t.postMeal}</option>
              <option value="bedtime">{t.bedtime}</option>
            </select>
          </div>
          <button className="btn bp" style={{ width: '100%' }} onClick={logGlucose}>{t.commit}</button>
        </div>
      </div>
    </motion.section>
  );
}
