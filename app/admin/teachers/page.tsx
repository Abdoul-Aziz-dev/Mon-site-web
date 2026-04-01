'use client';

import { useState, useEffect } from 'react';
import AddTeacherButton from "@/app/components/admin/AddTeacherButton";
import DeleteAction from "@/app/components/admin/DeleteAction";
import EditTeacherModal from "@/app/components/admin/EditTeacherModal";

interface Teacher {
  id: number;
  name: string;
  email: string;
  subject: string;
  phone: string | null;
  createdAt: string;
}

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);

  const loadTeachers = () => {
    setLoading(true);
    fetch('/api/teachers')
      .then(r => r.json())
      .then(d => { if (Array.isArray(d)) setTeachers(d); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => { loadTeachers(); }, []);

  const handleEditClose = () => {
    setEditingTeacher(null);
    loadTeachers();
  };

  return (
    <div className="animate-fade-in">
      {editingTeacher && (
        <EditTeacherModal teacher={editingTeacher} onClose={handleEditClose} />
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <div>
          <h1 className="font-heading" style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>Corps Enseignant</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Gérez les informations des professeurs de l&apos;établissement.</p>
        </div>
        <div style={{ width: '250px' }}>
          <AddTeacherButton onSuccess={loadTeachers} />
        </div>
      </div>

      <div className="card-premium">
        {loading ? (
          <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)' }}>Chargement...</div>
        ) : teachers.length === 0 ? (
          <div style={{ padding: '5rem 2rem', textAlign: 'center', background: 'var(--surface-hover)', borderRadius: 'var(--radius-md)', border: '2px dashed var(--surface-border)' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', marginBottom: '2rem' }}>Aucun enseignant enregistré pour le moment.</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--surface-border)', textAlign: 'left' }}>
                  <th style={{ padding: '1.25rem 1rem', color: 'var(--text-muted)', fontWeight: 600 }}>Nom</th>
                  <th style={{ padding: '1.25rem 1rem', color: 'var(--text-muted)', fontWeight: 600 }}>Spécialité</th>
                  <th style={{ padding: '1.25rem 1rem', color: 'var(--text-muted)', fontWeight: 600 }}>Email</th>
                  <th style={{ padding: '1.25rem 1rem', color: 'var(--text-muted)', fontWeight: 600 }}>Téléphone</th>
                  <th style={{ padding: '1.25rem 1rem', color: 'var(--text-muted)', fontWeight: 600, textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {teachers.map((teacher) => (
                  <tr key={teacher.id} style={{ borderBottom: '1px solid var(--surface-hover)' }}>
                    <td style={{ padding: '1.5rem 1rem', fontWeight: 700, color: 'var(--text-main)' }}>{teacher.name}</td>
                    <td style={{ padding: '1.5rem 1rem', color: 'var(--text-muted)' }}>
                      <span style={{ background: 'var(--primary-light)', color: 'var(--primary)', padding: '0.4rem 0.8rem', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 700 }}>
                        {teacher.subject}
                      </span>
                    </td>
                    <td style={{ padding: '1.5rem 1rem', color: 'var(--text-muted)' }}>{teacher.email}</td>
                    <td style={{ padding: '1.5rem 1rem', color: 'var(--text-muted)' }}>{teacher.phone || '-'}</td>
                    <td style={{ padding: '1.5rem 1rem', textAlign: 'right' }}>
                      <button onClick={() => setEditingTeacher(teacher)} style={{ background: 'transparent', border: 'none', color: '#3b82f6', fontWeight: 700, cursor: 'pointer', marginRight: '1rem' }}>Éditer</button>
                      <DeleteAction id={teacher.id} type="teachers" onSuccess={loadTeachers} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
