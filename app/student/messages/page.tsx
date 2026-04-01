'use client';

import { useState, useEffect } from 'react';

interface Message {
  id: number;
  content: string;
  sender: { id: number; name: string; };
  recipient: { id: number; name: string; };
  createdAt: string;
}

interface Contact {
  id: number;
  name: string;
  type: 'teacher' | 'student';
}

export default function StudentMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [newMessage, setNewMessage] = useState('');
  const [selectedContact, setSelectedContact] = useState<number | null>(null);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const currentUserId = 1; // Étudiant connecté

  useEffect(() => {
    Promise.all([
      fetch('/api/messages').then(r => r.json()),
      fetch('/api/teachers').then(r => r.json()),
    ]).then(([msgs, teachers]) => {
      setMessages(Array.isArray(msgs) ? msgs : []);
      const teacherContacts: Contact[] = (Array.isArray(teachers) ? teachers : []).map((t: { id: number; name: string }) => ({
        id: t.id,
        name: t.name,
        type: 'teacher'
      }));
      setContacts(teacherContacts);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedContact) {
      setError('Veuillez sélectionner un destinataire et écrire un message');
      return;
    }

    setSending(true);
    setError('');

    try {
      const payload = {
        senderId: currentUserId,
        recipientId: selectedContact,
        content: newMessage,
      };
      console.log('Envoi du message:', payload);

      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log('Réponse du serveur:', response.status, data);

      if (response.ok) {
        setMessages([data, ...messages]);
        setNewMessage('');
        setError('');
      } else {
        setError(data.error || 'Erreur lors de l\'envoi du message');
      }
    } catch (err) {
      console.error('Erreur:', err);
      setError('Erreur de connexion au serveur');
    } finally {
      setSending(false);
    }
  };

  const conversationsWith = (contactId: number) => {
    return messages.filter(m => 
      (m.sender.id === currentUserId && m.recipient.id === contactId) ||
      (m.sender.id === contactId && m.recipient.id === currentUserId)
    ).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  };

  const selectedConversation = selectedContact ? conversationsWith(selectedContact) : [];

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '3rem' }}>
        <h1 className="font-heading" style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.04em', marginBottom: '0.5rem' }}>Messagerie</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', fontWeight: 500 }}>Conversez avec vos professeurs et camarades</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '2rem', minHeight: '600px' }}>
        {/* Liste des contacts */}
        <div className="card-premium" style={{ border: '1px solid var(--surface-border)', padding: '1.5rem', height: 'fit-content' }}>
          <h2 className="font-heading" style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1.5rem' }}>Contacts</h2>
          
          {loading ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Chargement...</div>
          ) : contacts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Aucun contact</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {contacts.map(contact => {
                const unreadCount = messages.filter(m => m.sender.id === contact.id && m.recipient.id === currentUserId).length;
                return (
                  <button
                    key={contact.id}
                    onClick={() => setSelectedContact(contact.id)}
                    style={{
                      padding: '0.75rem 1rem',
                      background: selectedContact === contact.id ? 'var(--primary)' : 'var(--surface-hover)',
                      color: selectedContact === contact.id ? 'white' : 'var(--text-main)',
                      border: 'none',
                      borderRadius: '8px',
                      textAlign: 'left',
                      cursor: 'pointer',
                      fontWeight: selectedContact === contact.id ? 700 : 500,
                      fontSize: '0.9rem',
                      transition: 'all 0.2s',
                    }}
                  >
                    <div>{contact.type === 'teacher' ? '👨‍🏫' : '👥'} {contact.name}</div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Zone de conversation */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {!selectedContact ? (
            <div className="card-premium" style={{ border: '1px solid var(--surface-border)', padding: '3rem', textAlign: 'center', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '400px' }}>
              Sélectionnez un contact pour commencer une conversation
            </div>
          ) : (
            <>
              {/* Conversation */}
              <div className="card-premium" style={{ border: '1px solid var(--surface-border)', flex: 1, display: 'flex', flexDirection: 'column', padding: '1.5rem' }}>
                <h3 className="font-heading" style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '1.5rem' }}>
                  {contacts.find(c => c.id === selectedContact)?.name}
                </h3>
                
                <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem', paddingRight: '0.5rem' }}>
                  {selectedConversation.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>Aucun message pour le moment</div>
                  ) : (
                    selectedConversation.map((msg) => (
                      <div key={msg.id} style={{
                        alignSelf: msg.sender.id === currentUserId ? 'flex-end' : 'flex-start',
                        maxWidth: '70%',
                        padding: '0.75rem 1rem',
                        background: msg.sender.id === currentUserId ? 'var(--primary)' : 'var(--surface-hover)',
                        color: msg.sender.id === currentUserId ? 'white' : 'var(--text-main)',
                        borderRadius: '12px',
                      }}>
                        <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.4 }}>{msg.content}</p>
                        <div style={{ fontSize: '0.75rem', opacity: 0.7, marginTop: '0.3rem' }}>
                          {new Date(msg.createdAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Formulaire */}
                <form onSubmit={handleSendMessage} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', borderTop: '1px solid var(--surface-border)', paddingTop: '1rem' }}>
                  {error && (
                    <div style={{ padding: '0.75rem', background: '#fee', border: '1px solid #fcc', borderRadius: '8px', color: '#c00', fontSize: '0.9rem' }}>
                      {error}
                    </div>
                  )}
                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <textarea
                      placeholder="Écrivez un message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      disabled={sending}
                      rows={2}
                      style={{
                        flex: 1,
                        padding: '0.75rem',
                        borderRadius: '8px',
                        border: '1px solid var(--surface-border)',
                        background: 'var(--surface-hover)',
                        color: 'var(--text-main)',
                        fontFamily: 'inherit',
                        fontSize: '0.9rem',
                        resize: 'none',
                        opacity: sending ? 0.6 : 1,
                      }}
                    />
                    <button
                      type="submit"
                      disabled={sending}
                      style={{
                        padding: '0.75rem 1.5rem',
                        background: sending ? '#999' : 'var(--primary)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontWeight: 700,
                        cursor: sending ? 'not-allowed' : 'pointer',
                        alignSelf: 'flex-end',
                        opacity: sending ? 0.7 : 1,
                      }}
                    >
                      {sending ? 'Envoi...' : 'Envoyer'}
                    </button>
                  </div>
                </form>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
