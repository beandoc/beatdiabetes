'use client';

export default function Emergency({ t }: { t: any }) {
  const content = {
    en: {
      ruleTitle: "15-15 Rule for Hypos (< 70 mg/dL)",
      step1: "Eat 15g Fast Carbs (3 sugars / 1/2 cup juice / 4 tabs).",
      step2: "Wait 15 minutes.",
      step3: "Re-test blood sugar.",
      step4: "If still < 70, repeat 15g carbs.",
      dkaTitle: "DKA Warning Signs",
      dkaText: "If blood sugar is > 250 mg/dL with nausea, vomiting, abdominal pain, or fruity breath, seek clinical care at Command Hospital ER immediately."
    },
    hi: {
      ruleTitle: "हाइपो के लिए 15-15 नियम (< 70 mg/dL)",
      step1: "15 ग्राम फास्ट कार्ब्स खाएं (3 चीनी / 1/2 कप जूस)।",
      step2: "15 मिनट प्रतीक्षा करें।",
      step3: "रक्त शर्करा का पुनः परीक्षण करें।",
      step4: "यदि अभी भी < 70 है, तो 15 ग्राम कार्ब्स दोहराएं।",
      dkaTitle: "DKA चेतावनी के संकेत",
      dkaText: "यदि रक्त शर्करा > 250 mg/dL है और मतली, उल्टी, या पेट दर्द है, तो तुरंत कमांड अस्पताल ER में देखभाल लें।"
    },
    mr: {
      ruleTitle: "हायपोसाठी 15-15 नियम (< 70 mg/dL)",
      step1: "15 ग्रॅम फास्ट कार्ब्स खा (3 साखर / 1/2 कप ज्यूस)।",
      step2: "15 मिनिटे प्रतीक्षा करा।",
      step3: "रक्त शर्करा पुन्हा तपासा।",
      step4: "अजूनही < 70 असल्यास, 15 ग्रॅम कार्ब्स पुन्हा घ्या।",
      dkaTitle: "DKA चेतावणी चिन्हे",
      dkaText: "जर रक्त शर्करा > 250 mg/dL असेल आणि मळमळ, उलट्या किंवा पोटदुखी होत असेल तर त्वरित कमांड हॉस्पिटल ER मध्ये जा।"
    }
  }[t.dashboard === 'डैशबोर्ड' ? 'hi' : t.dashboard === 'डॅशबोर्ड' ? 'mr' : 'en'] || { ruleTitle: "", step1: "", step2: "", step3: "", step4: "", dkaTitle: "", dkaText: "" };

  return (
    <section id="emergency">
      <div className="section-header">
        <h1 className="section-title" style={{ color: 'var(--secondary)' }}>🚨 {t.emergency}</h1>
      </div>
      <div className="notice nd">
        <h4 style={{ marginBottom: '1rem' }}>{content.ruleTitle}</h4>
        <ol style={{ paddingLeft: '1.5rem', marginTop: '1rem', lineHeight: 2 }}>
          <li>{content.step1}</li>
          <li>{content.step2}</li>
          <li>{content.step3}</li>
          <li>{content.step4}</li>
        </ol>
      </div>
      <div className="card" style={{ borderColor: 'var(--secondary)' }}>
        <div className="card-title" style={{ color: 'var(--secondary)' }}>{content.dkaTitle}</div>
        <p style={{ lineHeight: 1.8 }}>{content.dkaText}</p>
      </div>
    </section>
  );
}
