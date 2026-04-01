'use client';

import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  BookOpen, 
  Apple, 
  Syringe, 
  Activity, 
  Calendar,
  ChevronRight,
  Sun,
  Moon,
  Globe,
  Settings
} from 'lucide-react';

type SidebarProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  lang: string;
  setLang: (l: any) => void;
  theme: string;
  setTheme: (t: any) => void;
  t: any;
};

export default function Sidebar({ activeTab, setActiveTab, lang, setLang, theme, setTheme, t }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: t.dashboard, icon: LayoutDashboard },
    { id: 'logbook', label: t.logbook, icon: Calendar },
    { id: 'handbook', label: t.handbook, icon: BookOpen },
    { id: 'carbs', label: t.carbs, icon: Apple },
    { id: 'insulin', label: t.insulin, icon: Syringe },
    { id: 'a1c', label: t.a1c, icon: Activity },
    { id: 'lifestyle', label: t.lifestyle, icon: Settings },
    { id: 'daily', label: t.daily, icon: Settings },
    { id: 'emergency', label: t.emergency, icon: Activity },
  ];

  return (
    <aside className="sidebar">
      <div className="brand">
        <motion.h2 style={{ letterSpacing: '-0.03em' }}>
          <span style={{ color: 'var(--primary)' }}>BEAT</span>
          <span style={{ color: 'var(--text-main)', opacity: 0.9 }}>T1D</span>
        </motion.h2>
        <p>COMMAND HOSPITAL (SC)<br />DEPT OF ENDOCRINOLOGY</p>
      </div>

      <nav className="side-nav">
        <ul>
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <motion.li key={item.id}>
                <button className={isActive ? 'active' : ''} onClick={() => setActiveTab(item.id)}>
                  <Icon size={18} color={isActive ? 'var(--primary)' : 'var(--text-muted)'} />
                  <span style={{ flex: 1 }}>{item.label}</span>
                  {isActive && <ChevronRight size={14} color="var(--primary)" />}
                </button>
              </motion.li>
            );
          })}
        </ul>
      </nav>

      <div style={{ marginTop: 'auto', padding: '1rem 1.5rem' }}>
        <div style={{ background: 'var(--border)', height: '1px', marginBottom: '1.5rem' }}></div>
        
        {/* THEME TOGGLE */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '1rem' }}>
          <button 
            onClick={() => setTheme('dark')} 
            className={`badge ${theme === 'dark' ? 's-ok' : ''}`} 
            style={{ flex: 1, cursor: 'pointer', border: '1px solid var(--border)', background: theme === 'dark' ? 'rgba(45,212,191,0.1)' : 'transparent' }}
          >
            <Moon size={12} /> Dark
          </button>
          <button 
            onClick={() => setTheme('light')} 
            className={`badge ${theme === 'light' ? 's-ok' : ''}`} 
            style={{ flex: 1, cursor: 'pointer', border: '1px solid var(--border)', background: theme === 'light' ? 'rgba(45,212,191,0.1)' : 'transparent' }}
          >
            <Sun size={12} /> Light
          </button>
        </div>

        {/* LANG TOGGLE */}
        <div style={{ display: 'flex', background: 'var(--glass)', borderRadius: '10px', padding: '4px', gap: '4px', border: '1px solid var(--border)' }}>
          {['en', 'hi', 'mr'].map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              style={{
                flex: 1, padding: '6px', border: 'none', borderRadius: '6px', cursor: 'pointer',
                fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase',
                background: lang === l ? 'var(--primary)' : 'transparent',
                color: lang === l ? 'var(--bg-deep)' : 'var(--text-muted)'
              }}
            >
              {l}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
