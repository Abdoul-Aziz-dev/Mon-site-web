'use client';
import { useEffect, useState } from 'react';

interface Contact {
  id: number;
  name: string;
  role: 'student' | 'admin';
}

interface Message {
  id: number;
  type: 'student-teacher' | 'admin-teacher';
  content: string;
  sender: { id: number; name: string; role: 'student' | 'admin' };
  createdAt: string;
  fromMe?: boolean;
}

const teacherId = 2;

export default function TeacherMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  const loadMessages = async () => {
    try {
      const res = await fetch(`/api/teachers/${teacherId}/messages`);
      const data = await res.json();
      const msgs: Message[] = Array.isArray(data) ? data : [];
      setMessages(msgs);

      // Construire la liste des contacts uniques depuis les messages reçus
      const seen = new Set<string>();
      const ctcts: Contact[] = [];
      msgs.forEach(m => {
        const key = `${m.sender.role}-${m.sender.id}`;
        if (!seen.has(key)) {
          seen.add(key);
          ctcts.push({ id: m.sender.id, name: m.sender.name, role: m.sender.role });
        }
      });
      setContacts(ctcts);
    } catch {
      setError('Erreur de chargement');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadMessages(); }, []);

  const conversation = selectedContact
    ? messages.filter(m => m.sender.id === selectedContact.id && m.sender.role === selectedContact.role)
    : [];

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedContact) return;
    setSending(true);
    setError('');

    try {
      // L'enseignant répond à un étudiant via teachermessage (sens inverse : on crée un message étudiant→prof mais ici c'est prof→étudiant)
      // On utilise l'API admin/messages si c'est un admin, sinon on crée via teachermessage
      if (selectedContact.role === 'student') {
        const response = await fetch('/api/teacher/reply', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            teacherId,
            studentId: selectedContact.id,
            content: newMessage,
          }),
        });
        if (response.ok) {
          setNewMessage('');
          await loadMessages();
        } else {
          setError('Erreur lors de l\'envoi');
        }
      }
    } catch {
      setError('Erreur de connexion');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '3rem' }}>
        <h1 className="font-heading" style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.04em', marginBottom: '0.5rem' }}>
          Messagerie
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', fontWeight: 500 }}>
          Consultez et répondez aux messages de vos élèves et de l&apos;administration.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '2rem', minHeight: '600px' }}>
        {/* Contacts */}
        <div className="card-premium" style={{ border: '1px solid var(--surface-border)', padding: '1.5rem', height: 'fit-content' }}>
          <h2 className="font-heading" style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1.5rem' }}>
            Messages reçus
          </h2>
          {loading ? (
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textAlign: 'center', padding: '1rem' }}>Chargement...</p>
          ) : contacts.length === 0 ? (
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textAlign: 'center', padding: '1rem' }}>Aucun message reçu</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {contacts.map(c => (
                <button
                  key={`${c.role}-${c.id}`}
                  onClick={() => setSelectedContact(c)}
                  style={{
                    padding: '0.75rem 1rem',
                    background: selectedContact?.id === c.id && selectedContact?.role === c.role ? 'var(--primary)' : 'var(--surface-hover)',
                    color: selectedContact?.id === c.id && selectedContact?.role === c.role ? 'white' : 'var(--text-main)',
                    border: 'none', borderRadius: '10px', textAlign: 'left',
                    cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem', transition: 'all 0.2s',
                  }}
                >
                  {c.role === 'admin' ? '👨💼' : '👤'} {c.name}
                  <span style={{ display: 'block', fontSize: '0.75rem', opacity: 0.7, marginTop: '0.2rem' }}>
                    {c.role === 'admin' ? 'Administration' : 'Élève'}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Zone conversation */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {!selectedContact ? (
            <div className="card-premium" style={{
              border: '1px solid var(--surface-border)', padding: '3rem',
              textAlign: 'center', color: 'var(--text-muted)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '400px'
            }}>
              Sélectionnez un contact pour voir la conversation
            </div>
          ) : (
            <>
              {/* En-tête */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', paddingBottom: '1rem', borderBottom: '1px solid var(--surface-border)' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: selectedContact.role === 'admin' ? 'var(--secondary)' : 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
                  {selectedContact.role === 'admin' ? '👨💼' : '👤'}
                </div>
                <div>
                  <div style={{ fontWeight: 800, color: 'var(--text-main)', fontSize: '1.1rem' }}>{selectedContact.name}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{selectedContact.role === 'admin' ? 'Administration' : 'Élève'}</div>
                </div>
              </div>

              {/* Messages */}
              <div className="card-premium" style={{
                border: '1px solid var(--surface-border)', padding: '1.5rem',
                minHeight: '300px', maxHeight: '400px', overflowY: 'auto',
                display: 'flex', flexDirection: 'column', gap: '1rem'
              }}>
                {conversation.length === 0 ? (
                  <div style={{ textAlign: 'center', color: 'var(--text-muted)', paddingTop: '2rem' }}>
                    Aucun message dans cette conversation
                  </div>
                ) : (
                  [...conversation].reverse().map(msg => (
                    <div key={msg.id} style={{ display: 'flex', justifyContent: 'flex-start' }}>
                      <div style={{
                        maxWidth: '75%', padding: '0.75rem 1rem', borderRadius: '12px',
                        background: 'var(--surface-hover)', color: 'var(--text-main)',
                        borderLeft: `3px solid ${selectedContact.role === 'admin' ? 'var(--secondary)' : 'var(--primary)'}`,
                      }}>
                        <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.5 }}>{msg.content}</p>
                        <p style={{ margin: '0.3rem 0 0', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          {new Date(msg.createdAt).toLocaleString('fr-FR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Réponse — uniquement pour les élèves */}
              {selectedContact.role === 'student' ? (
                <form onSubmit={handleSend} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {error && (
                    <div style={{ padding: '0.75rem', background: '#fee2e2', color: '#dc2626', borderRadius: '8px', fontSize: '0.9rem' }}>
                      {error}
                    </div>
                  )}
                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <textarea
                      value={newMessage}
                      onChange={e => setNewMessage(e.target.value)}
                      placeholder="Écrire une réponse..."
                      disabled={sending}
                      rows={2}
                      style={{
                        flex: 1, padding: '0.75rem', borderRadius: '10px',
                        border: '1px solid var(--surface-border)', background: 'var(--surface-hover)',
                        color: 'var(--text-main)', fontFamily: 'inherit', fontSize: '0.95rem',
                        resize: 'none', outline: 'none', opacity: sending ? 0.6 : 1,
                      }}
                    />
                    <button
                      type="submit"
                      disabled={sending || !newMessage.trim()}
                      className="btn-premium btn-primary-custom"
                      style={{ padding: '0.75rem 1.5rem', borderRadius: '10px', alignSelf: 'flex-end', opacity: sending ? 0.6 : 1 }}
                    >
                      {sending ? 'Envoi...' : 'Répondre →'}
                    </button>
                  </div>
                </form>
              ) : (
                <div style={{ padding: '1rem', background: 'var(--surface-hover)', borderRadius: '10px', fontSize: '0.9rem', color: 'var(--text-muted)', textAlign: 'center' }}>
                  💡 Les messages de l&apos;administration sont en lecture seule
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
