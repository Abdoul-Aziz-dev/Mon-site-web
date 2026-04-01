'use client';

import { useState, useEffect } from 'react';

interface Contact {
  id: number;
  name: string;
  type: 'teacher' | 'student';
}

interface Message {
  id: number;
  type: string;
  content: string;
  sender: { id: number; name: string; type: string };
  recipient: { id: number; name: string; type: string };
  createdAt: string;
}

export default function AdminMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [newMessage, setNewMessage] = useState('');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const adminId = 1; // Admin connecté

  useEffect(() => {
    Promise.all([
      fetch('/api/admin/messages').then(r => r.json()),
      fetch('/api/teachers').then(r => r.json()),
      fetch('/api/students').then(r => r.json()),
    ]).then(([msgs, teachers, students]) => {
      setMessages(Array.isArray(msgs) ? msgs : []);
      
      const teacherContacts = (Array.isArray(teachers) ? teachers : []).map((t: { id: number; name: string }) => ({
        id: t.id,
        name: t.name,
        type: 'teacher' as const
      }));
      
      const studentContacts = (Array.isArray(students) ? students : []).map((s: { id: number; name: string }) => ({
        id: s.id,
        name: s.name,
        type: 'student' as const
      }));
      
      setContacts([...teacherContacts, ...studentContacts]);
      setLoading(false);
    }).catch(err => {
      console.error('Erreur chargement:', err);
      setLoading(false);
    });
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
        adminId,
        recipientId: selectedContact.id,
        recipientType: selectedContact.type,
        content: newMessage,
      };

      const response = await fetch('/api/admin/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        setMessages([data, ...messages]);
        setNewMessage('');
        setError('');
      } else {
        setError(data.error || 'Erreur lors de l\'envoi');
      }
    } catch (err) {
      console.error('Erreur:', err);
      setError('Erreur de connexion au serveur');
    } finally {
      setSending(false);
    }
  };

  const conversationWith = (contact: Contact) => {
    return messages.filter(m =>
      (m.sender.id === adminId && m.recipient.id === contact.id) ||
      (m.sender.id === contact.id && m.recipient.id === adminId)
    ).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  };

  const selectedConversation = selectedContact ? conversationWith(selectedContact) : [];

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '3rem' }}>
        <h1 className="font-heading" style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.04em', marginBottom: '0.5rem' }}>
          Messagerie - Admin
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', fontWeight: 500 }}>
          Supervisez toutes les communications
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '2rem', minHeight: '600px' }}>
        {/* Liste des contacts */}
        <div className="card-premium" style={{ border: '1px solid var(--surface-border)', padding: '1.5rem', height: 'fit-content' }}>
          <h2 className="font-heading" style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1.5rem' }}>
            Tous les contacts
          </h2>
          
          {loading ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Chargement...
            </div>
          ) : contacts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Aucun contact
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '500px', overflowY: 'auto' }}>
              {contacts.map(contact => (
                <button
                  key={`${contact.type}-${contact.id}`}
                  onClick={() => setSelectedContact(contact)}
                  style={{
                    padding: '0.75rem 1rem',
                    background: selectedContact?.id === contact.id && selectedContact?.type === contact.type ? 'var(--primary)' : 'var(--surface-hover)',
                    color: selectedContact?.id === contact.id && selectedContact?.type === contact.type ? 'white' : 'var(--text-main)',
                    border: 'none',
                    borderRadius: '8px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontWeight: selectedContact?.id === contact.id && selectedContact?.type === contact.type ? 700 : 500,
                    fontSize: '0.9rem',
                    transition: 'all 0.2s',
                  }}
                >
                  <div>{contact.type === 'teacher' ? '👨‍🏫' : '👤'} {contact.name}</div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Zone de conversation */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {!selectedContact ? (
            <div className="card-premium" style={{ 
              border: '1px solid var(--surface-border)', 
              padding: '3rem', 
              textAlign: 'center', 
              color: 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '400px'
            }}>
              Sélectionnez un contact pour commencer
            </div>
          ) : (
            <>
              {/* En-tête conversation */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--surface-border)' }}>
                <div style={{ fontSize: '1.5rem' }}>
                  {selectedContact.type === 'teacher' ? '👨‍🏫' : '👤'}
                </div>
                <div>
                  <h2 className="font-heading" style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-main)' }}>
                    {selectedContact.name}
                  </h2>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    {selectedContact.type === 'teacher' ? 'Professeur' : 'Étudiant'}
                  </p>
                </div>
              </div>

              {/* Conversation */}
              <div className="card-premium" style={{ 
                border: '1px solid var(--surface-border)', 
                flex: 1, 
                display: 'flex', 
                flexDirection: 'column', 
                padding: '1.5rem',
                overflowY: 'auto',
                minHeight: '300px',
                gap: '1rem'
              }}>
                {selectedConversation.length === 0 ? (
                  <div style={{ textAlign: 'center', color: 'var(--text-muted)', paddingTop: '2rem' }}>
                    Aucun message. Commencez une conversation!
                  </div>
                ) : (
                  selectedConversation.map(msg => (
                    <div key={msg.id} style={{ display: 'flex', gap: '1rem', justifyContent: msg.sender.id === adminId ? 'flex-end' : 'flex-start' }}>
                      <div style={{
                        maxWidth: '70%',
                        padding: '0.75rem 1rem',
                        borderRadius: '12px',
                        background: msg.sender.id === adminId ? 'var(--primary)' : 'var(--surface-hover)',
                        color: msg.sender.id === adminId ? 'white' : 'var(--text-main)',
                        wordWrap: 'break-word'
                      }}>
                        <p style={{ margin: 0, fontSize: '0.95rem' }}>{msg.content}</p>
                        <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.75rem', opacity: 0.7 }}>
                          {new Date(msg.createdAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Formulaire d'envoi */}
              <form onSubmit={handleSendMessage} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {error && (
                  <div style={{
                    padding: '1rem',
                    backgroundColor: '#fee2e2',
                    color: '#991b1b',
                    borderRadius: '8px',
                    fontSize: '0.9rem'
                  }}>
                    {error}
                  </div>
                )}
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Écrivez votre message..."
                    disabled={sending}
                    style={{
                      flex: 1,
                      padding: '0.75rem 1rem',
                      border: '1px solid var(--surface-border)',
                      borderRadius: '8px',
                      fontSize: '0.95rem',
                      fontFamily: 'inherit',
                      resize: 'none',
                      height: '60px',
                      opacity: sending ? 0.6 : 1
                    }}
                  />
                  <button
                    type="submit"
                    disabled={sending}
                    style={{
                      padding: '0.75rem 1.5rem',
                      background: sending ? '#d1d5db' : 'var(--primary)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: sending ? 'default' : 'pointer',
                      fontWeight: 600,
                      fontSize: '0.9rem',
                      transition: 'background 0.2s'
                    }}
                  >
                    {sending ? 'Envoi...' : 'Envoyer'}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
