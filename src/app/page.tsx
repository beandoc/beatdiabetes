'use client';

import { useState, useEffect } from 'react';
import { TRANSLATIONS } from '@/lib/translations';
import Sidebar from '@/components/Sidebar';
import Dashboard from '@/components/Dashboard';
import Handbook from '@/components/handbook/HandbookSection';
import CarbCounter from '@/components/Carbs';
import Calculators from '@/components/Calculators';
import A1CLab from '@/components/A1CLab';
import Lifestyle from '@/components/Lifestyle';
import DailyChecklist from '@/components/DailyChecklist';
import Emergency from '@/components/Emergency';
import Logbook from '@/components/Logbook';

export default function Home() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [glucoseLog, setGlucoseLog] = useState<any[]>([]);
  const [userName, setUserName] = useState('');
  const [mrdNo, setMrdNo] = useState('');
  const [lang, setLang] = useState<'en' | 'hi' | 'mr'>('en');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  const t = TRANSLATIONS[lang];

  // Load data on mount
  useEffect(() => {
    const savedLogs = localStorage.getItem('glucoseLog');
    const savedName = localStorage.getItem('t1dUserName');
    const savedMrd = localStorage.getItem('t1dMrdNo');
    const savedLang = localStorage.getItem('t1dLang') as any;
    const savedTheme = localStorage.getItem('t1dTheme') as any;
    
    if (savedLogs) {
      try {
        const parsed = JSON.parse(savedLogs);
        setGlucoseLog(parsed.map((e: any) => ({ ...e, time: new Date(e.time) })));
      } catch (e) { console.error("Failed to load logs", e); }
    }
    if (savedName) setUserName(savedName);
    if (savedMrd) setMrdNo(savedMrd);
    if (savedLang) setLang(savedLang);
    if (savedTheme) setTheme(savedTheme);
  }, []);

  // Save data on change
  useEffect(() => {
    localStorage.setItem('glucoseLog', JSON.stringify(glucoseLog));
  }, [glucoseLog]);

  useEffect(() => {
    localStorage.setItem('t1dUserName', userName);
    localStorage.setItem('t1dMrdNo', mrdNo);
    localStorage.setItem('t1dLang', lang);
    localStorage.setItem('t1dTheme', theme);
  }, [userName, mrdNo, lang, theme]);

  const renderActiveSection = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard t={t} glucoseLog={glucoseLog} setGlucoseLog={setGlucoseLog} userName={userName} setUserName={setUserName} mrdNo={mrdNo} setMrdNo={setMrdNo} />;
      case 'logbook': return <Logbook t={t} glucoseLog={glucoseLog} userName={userName} mrdNo={mrdNo} />;
      case 'handbook': return <Handbook t={t} />;
      case 'carbs': return <CarbCounter t={t} />;
      case 'insulin': return <Calculators t={t} />;
      case 'a1c': return <A1CLab t={t} />;
      case 'lifestyle': return <Lifestyle t={t} />;
      case 'daily': return <DailyChecklist t={t} />;
      case 'emergency': return <Emergency t={t} />;
      default: return <Dashboard t={t} glucoseLog={glucoseLog} setGlucoseLog={setGlucoseLog} userName={userName} setUserName={setUserName} mrdNo={mrdNo} setMrdNo={setMrdNo} />;
    }
  };

  return (
    <div className="app-container" data-theme={theme}>
      <Sidebar t={t} activeTab={activeTab} setActiveTab={setActiveTab} lang={lang} setLang={setLang} theme={theme} setTheme={setTheme} />
      <main className="main-scroll">
        <div className="container">
          {renderActiveSection()}
        </div>
        
        <footer style={{ padding: '4rem 0 8rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.8rem', borderTop: '1px solid var(--border)', marginTop: '4rem' }}>
          <p>© Command Hospital (SC), Pune 411040 | Dept. of Endocrinology, Diabetes & Metabolism</p>
          <p style={{ marginTop: '1.5rem', opacity: 0.6 }}>This portal is intended for educational purposes only. Always follow your physician's specific instructions.</p>
        </footer>
      </main>
    </div>
  );
}
