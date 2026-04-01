'use client';
import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', content: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', content: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="animate-fade-in" style={{ backgroundColor: 'var(--background)', minHeight: 'calc(100vh - 86px)' }}>
      <div style={{ maxWidth: '1450px', margin: '0 auto', padding: '6rem 5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
          <h1 className="font-heading" style={{ fontSize: '4.5rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '1.5rem', letterSpacing: '-0.04em' }}>Contactez-nous</h1>
          <p style={{ fontSize: '1.35rem', color: 'var(--text-muted)', fontWeight: 500 }}>Une question ? Notre équipe dévouée vous répond sous 24h.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '5rem' }}>
          {/* Info cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
             <div className="card-premium" style={{ padding: '2.5rem' }}>
               <h3 className="font-heading" style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.75rem', color: 'var(--primary)' }}>✉️ Email Officiel</h3>
               <p style={{ color: 'var(--text-main)', fontSize: '1.2rem', fontWeight: 600 }}>contact@gseab.gn</p>
               <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Réception et traitement des demandes administratives.</p>
             </div>
             <div className="card-premium" style={{ padding: '2.5rem' }}>
               <h3 className="font-heading" style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.75rem', color: 'var(--primary)' }}>📞 Ligne Directe</h3>
               <p style={{ color: 'var(--text-main)', fontSize: '1.2rem', fontWeight: 600 }}>+224 000 00 00 00</p>
               <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Disponible du Lundi au Vendredi (08h - 17h).</p>
             </div>
             <div className="card-premium" style={{ padding: '2.5rem' }}>
               <h3 className="font-heading" style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.75rem', color: 'var(--primary)' }}>📍 Localisation</h3>
               <p style={{ color: 'var(--text-main)', fontSize: '1.2rem', fontWeight: 600 }}>Conakry, Guinée</p>
               <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Groupe Scolaire Elhadj Amadou Barry (R+4).</p>
             </div>
          </div>

          {/* Form */}
          <div className="card-premium" style={{ padding: '4.5rem' }}>
            <h2 className="font-heading" style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '2.5rem', color: 'var(--text-main)' }}>Envoyez-nous un message</h2>
            
            {status === 'success' && (
              <div style={{ padding: '1rem', background: '#ecfdf5', color: '#059669', borderRadius: '12px', marginBottom: '2rem', fontWeight: 600, border: '1px solid #10b981' }}>
                ✓ Votre message a été envoyé avec succès !
              </div>
            )}
            {status === 'error' && (
              <div style={{ padding: '1rem', background: '#fef2f2', color: '#dc2626', borderRadius: '12px', marginBottom: '2rem', fontWeight: 600, border: '1px solid #ef4444' }}>
                ✗ Une erreur est survenue. Veuillez réessayer.
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
              <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                <div style={{ flex: '1 1 200px' }}>
                  <label style={{ display: 'block', marginBottom: '0.6rem', fontWeight: 800, color: 'var(--text-main)', fontSize: '0.9rem', textTransform: 'uppercase' }}>Nom Complet</label>
                  <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="Votre nom" style={{ width: '100%', padding: '1.2rem', borderRadius: '14px', border: '1px solid var(--surface-border)', background: 'var(--surface-hover)', outline: 'none', color: 'var(--text-main)' }} />
                </div>
                <div style={{ flex: '1 1 200px' }}>
                  <label style={{ display: 'block', marginBottom: '0.6rem', fontWeight: 800, color: 'var(--text-main)', fontSize: '0.9rem', textTransform: 'uppercase' }}>Email</label>
                  <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="votre@email.com" style={{ width: '100%', padding: '1.2rem', borderRadius: '14px', border: '1px solid var(--surface-border)', background: 'var(--surface-hover)', outline: 'none', color: 'var(--text-main)' }} />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.6rem', fontWeight: 800, color: 'var(--text-main)', fontSize: '0.9rem', textTransform: 'uppercase' }}>Sujet</label>
                <input type="text" value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})} placeholder="Objet de votre message" style={{ width: '100%', padding: '1.2rem', borderRadius: '14px', border: '1px solid var(--surface-border)', background: 'var(--surface-hover)', outline: 'none', color: 'var(--text-main)' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.6rem', fontWeight: 800, color: 'var(--text-main)', fontSize: '0.9rem', textTransform: 'uppercase' }}>Votre Message</label>
                <textarea required rows={5} value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} placeholder="Comment pouvons-nous vous aider ?" style={{ width: '100%', padding: '1.2rem', borderRadius: '14px', border: '1px solid var(--surface-border)', background: 'var(--surface-hover)', outline: 'none', resize: 'vertical', color: 'var(--text-main)', lineHeight: 1.6 }}></textarea>
              </div>
              <button type="submit" disabled={status === 'sending'} className="btn-premium btn-primary-custom" style={{ padding: '1.25rem', fontSize: '1.15rem', borderRadius: '14px', marginTop: '1rem', justifyContent: 'center', opacity: status === 'sending' ? 0.7 : 1 }}>
                {status === 'sending' ? 'Envoi en cours...' : 'Envoyer le message →'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
