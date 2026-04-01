'use client';

import { useState, useEffect } from 'react';
import AddStudentButton from "@/app/components/admin/AddStudentButton";
import DeleteAction from "@/app/components/admin/DeleteAction";
import EditStudentModal from "@/app/components/admin/EditStudentModal";

interface Student {
  id: number;
  name: string;
  email: string;
  class: string;
  createdAt: string;
}

export default function StudentsAdmin() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  const loadStudents = () => {
    setLoading(true);
    fetch('/api/students')
      .then(r => r.json())
      .then(d => { if (Array.isArray(d)) setStudents(d); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => { loadStudents(); }, []);

  const handleEditClose = () => {
    setEditingStudent(null);
    loadStudents();
  };

  return (
    <div className="animate-fade-in">
      {editingStudent && (
        <EditStudentModal student={editingStudent} onClose={handleEditClose} />
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
        <div>
           <h1 className="font-heading" style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-main)' }}>Gestion des Étudiants</h1>
           <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Consultez et gérez la liste complète des inscrits au GSEAB.</p>
        </div>
        <div style={{ width: '250px' }}>
          <AddStudentButton onSuccess={loadStudents} />
        </div>
      </div>

      <div className="card-premium" style={{ padding: '1.5rem' }}>
         <div style={{ marginBottom: '2rem', display: 'flex', gap: '1.25rem' }}>
            <input type="text" placeholder="Rechercher un étudiant..." style={{ flex: 1, padding: '1.1rem', borderRadius: '12px', border: '1px solid var(--surface-border)', outline: 'none', background: 'var(--surface-hover)', color: 'var(--text-main)' }} />
            <select style={{ padding: '1.1rem', borderRadius: '12px', border: '1px solid var(--surface-border)', outline: 'none', background: 'var(--surface-hover)', fontWeight: 600, color: 'var(--text-main)', cursor: 'pointer' }}>
               <option>Toutes les classes</option>
               <option>Terminale SM</option>
               <option>Terminale SE</option>
               <option>10ème Année</option>
            </select>
         </div>

         <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--surface-border)', color: 'var(--text-muted)', textAlign: 'left' }}>
                  <th style={{ padding: '1.25rem', fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase' }}>Nom Complet</th>
                  <th style={{ padding: '1.25rem', fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase' }}>Email Contact</th>
                  <th style={{ padding: '1.25rem', fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase' }}>Classe / Niveau</th>
                  <th style={{ padding: '1.25rem', fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase' }}>Date</th>
                  <th style={{ padding: '1.25rem', fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={5} style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)' }}>Chargement...</td></tr>
                ) : students.length === 0 ? (
                  <tr><td colSpan={5} style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)', fontStyle: 'italic' }}>Aucun étudiant trouvé.</td></tr>
                ) : (
                  students.map(s => (
                    <tr key={s.id} style={{ borderBottom: '1px solid var(--surface-border)', transition: 'background 0.2s', color: 'var(--text-main)' }}>
                       <td style={{ padding: '1.5rem 1.25rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '1rem' }}>
                          <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1rem' }}>{s.name.charAt(0)}</div>
                          {s.name}
                       </td>
                       <td style={{ padding: '1.5rem 1.25rem', color: 'var(--text-muted)' }}>{s.email}</td>
                       <td style={{ padding: '1.5rem 1.25rem' }}><span style={{ background: 'var(--surface-hover)', color: 'var(--text-main)', padding: '0.5rem 1rem', borderRadius: '999px', fontSize: '0.85rem', fontWeight: 700, border: '1px solid var(--surface-border)' }}>{s.class}</span></td>
                       <td style={{ padding: '1.5rem 1.25rem', color: 'var(--text-muted)' }}>{new Date(s.createdAt).toLocaleDateString('fr-FR')}</td>
                       <td style={{ padding: '1.5rem 1.25rem', textAlign: 'right' }}>
                          <button onClick={() => setEditingStudent(s)} style={{ background: 'transparent', border: 'none', color: '#3b82f6', fontWeight: 700, cursor: 'pointer', marginRight: '1.5rem' }}>Éditer</button>
                          <DeleteAction id={s.id} type="students" onSuccess={loadStudents} />
                       </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
         </div>
      </div>
    </div>
  );
}
