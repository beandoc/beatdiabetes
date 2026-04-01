'use client';

import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { motion } from 'framer-motion';
import { Download, FileText, CheckCircle2 } from 'lucide-react';

type FISTLogProps = {
  glucoseLog: any[];
  userName: string;
  mrdNo: string;
  t: any;
};

export default function FISTLog({ glucoseLog, userName, mrdNo, t }: FISTLogProps) {
  // Generate last 31 days
  const days = Array.from({ length: 31 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    return d;
  });

  const exportPDF = () => {
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(22);
    doc.setTextColor(15, 23, 42);
    doc.text(t.logbook.toUpperCase(), 14, 20);
    
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text("COMMAND HOSPITAL (SC), PUNE | DEPT. OF ENDOCRINOLOGY", 14, 28);
    
    // Identity Section
    doc.setFontSize(12);
    doc.setTextColor(50);
    doc.text(`Patient: ${userName || 'Not Specified'}`, 14, 38);
    doc.text(`MRD No: ${mrdNo || 'Not Specified'}`, 120, 38);
    
    doc.setFontSize(9);
    doc.setTextColor(150);
    doc.text(`Record Generated: ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}`, 14, 44);

    // Table Data
    const tableData = days.map((date) => {
      const dateStr = date.toLocaleDateString();
      const dayLogs = glucoseLog.filter(l => new Date(l.time).toLocaleDateString() === dateStr);
      
      const getVal = (ctx: string, hoursMin?: number, hoursMax?: number) => {
        const found = dayLogs.find(l => {
          const h = new Date(l.time).getHours();
          const matchCtx = l.ctx === ctx;
          if (hoursMin !== undefined && hoursMax !== undefined) {
            return matchCtx && h >= hoursMin && h < hoursMax;
          }
          return matchCtx;
        });
        return found ? found.val.toString() : '--';
      };

      return [
        date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }),
        getVal('fasting'),
        getVal('post', 0, 12),
        getVal('fasting', 12, 15),
        getVal('post', 13, 18),
        getVal('fasting', 18, 24),
        getVal('bedtime'),
        dayLogs.length > 0 ? (t.dashboard === 'डॅशबोर्ड' || t.dashboard === 'डैशबोर्ड' ? 'दर्ज' : 'RECORDED') : '--'
      ];
    });

    autoTable(doc, {
      startY: 45,
      head: [['Date', t.fasting, 'Post-Bf', 'Lunch Pre', 'Post-L', 'Pre-Dinner', t.bedtime, 'Status']],
      body: tableData,
      theme: 'striped',
      headStyles: { fillColor: [45, 212, 191], textColor: [255, 255, 255], fontStyle: 'bold' },
      alternateRowStyles: { fillColor: [245, 250, 250] },
      styles: { fontSize: 8, cellPadding: 3 },
      columnStyles: { 0: { fontStyle: 'bold' } }
    });

    // Footer on each page
    const totalPages = (doc as any).internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.text("Consult your Diabetes Care Team for dose adjustments. Official Patient Record.", 14, 285);
      doc.text(`Page ${i} of ${totalPages}`, 180, 285);
    }

    doc.save(`T1D_Clinical_Log_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  return (
    <motion.section 
      id="logbook"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="section-header">
        <h1 className="section-title">Clinical FIST Log</h1>
        <p className="section-sub">Digital interpretation of the Command Hospital monthly logbook. Maintain records of Food, Insulin, Sugar, and Time for clinical evaluation.</p>
      </div>

      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
          <div className="card-title" style={{ marginBottom: 0 }}><span>📅</span> Monthly Overview</div>
          <button className="btn bp" onClick={exportPDF}>
            <Download size={18} /> Download Clinical PDF
          </button>
        </div>

        <div className="table-wrap">
          <table style={{ minWidth: '900px' }}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Fasting</th>
                <th>Post-Bf</th>
                <th>Lunch Pre</th>
                <th>Post-L</th>
                <th>Dinner Pre</th>
                <th>Bedtime</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {days.map((date, i) => {
                const dateStr = date.toLocaleDateString();
                const dayLogs = glucoseLog.filter(l => new Date(l.time).toLocaleDateString() === dateStr);
                
                const getVal = (ctx: string, hoursMin?: number, hoursMax?: number) => {
                  const filtered = dayLogs.find(l => {
                    const h = new Date(l.time).getHours();
                    const matchCtx = l.ctx === ctx;
                    if (hoursMin !== undefined && hoursMax !== undefined) {
                      return matchCtx && h >= hoursMin && h < hoursMax;
                    }
                    return matchCtx;
                  });
                  return filtered ? filtered.val : '--';
                };

                const fasting = getVal('fasting');
                const postBf = getVal('post', 0, 12);
                const lunchPre = getVal('fasting', 12, 15);
                const postL = getVal('post', 13, 18);
                const dinnerPre = getVal('fasting', 18, 24);
                const bedtime = getVal('bedtime');
                
                const hasData = dayLogs.length > 0;

                return (
                  <tr key={i} style={{ opacity: hasData ? 1 : 0.6 }}>
                    <td style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary)' }}>
                      {date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
                    </td>
                    <td>{fasting}</td>
                    <td>{postBf}</td>
                    <td>{lunchPre}</td>
                    <td>{postL}</td>
                    <td>{dinnerPre}</td>
                    <td>{bedtime}</td>
                    <td>
                      {hasData ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--primary)', fontSize: '0.7rem', fontWeight: 700 }}>
                          <CheckCircle2 size={12} /> RECORDED
                        </div>
                      ) : (
                        <span style={{ fontSize: '0.7rem', opacity: 0.5 }}>EMPTY</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="notice ni" style={{ marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <FileText size={20} color="var(--accent)" />
          <p style={{ fontSize: '0.85rem' }}>
            <strong>Clinician's Note:</strong> This logbook supports the FIST framework. Ensure you bring the <strong>PDF Download</strong> to your follow-up appointment at Command Hospital.
          </p>
        </div>
      </div>
    </motion.section>
  );
}
