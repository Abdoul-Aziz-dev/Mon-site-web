'use client';

import { useState, useEffect } from 'react';
import AddCourseButton from "@/app/components/admin/AddCourseButton";
import DeleteAction from "@/app/components/admin/DeleteAction";
import EditCourseModal from "@/app/components/admin/EditCourseModal";

interface Course {
  id: number;
  title: string;
  level: string;
  teacher: string;
  hours: string;
  createdAt: string;
}

export default function CoursesAdmin() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  const loadCourses = () => {
    setLoading(true);
    fetch('/api/courses')
      .then(r => r.json())
      .then(d => { if (Array.isArray(d)) setCourses(d); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => { loadCourses(); }, []);

  const handleEditClose = () => {
    setEditingCourse(null);
    loadCourses();
  };

  return (
    <div className="animate-fade-in">
      {editingCourse && (
        <EditCourseModal course={editingCourse} onClose={handleEditClose} />
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
        <div>
           <h1 className="font-heading" style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-main)' }}>Gestion des Cours</h1>
           <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Organisez les programmes et les volumes horaires par classe.</p>
        </div>
        <AddCourseButton onSuccess={loadCourses} />
      </div>

      <div className="card-premium" style={{ overflow: 'hidden', padding: '0' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
           <thead>
             <tr style={{ background: 'var(--surface-hover)', color: 'var(--text-muted)', textAlign: 'left', borderBottom: '1px solid var(--surface-border)' }}>
               <th style={{ padding: '1.5rem 2rem', fontWeight: 800, fontSize: '0.9rem', textTransform: 'uppercase' }}>Cours</th>
               <th style={{ padding: '1.5rem 2rem', fontWeight: 800, fontSize: '0.9rem', textTransform: 'uppercase' }}>Niveau</th>
               <th style={{ padding: '1.5rem 2rem', fontWeight: 800, fontSize: '0.9rem', textTransform: 'uppercase' }}>Professeur</th>
               <th style={{ padding: '1.5rem 2rem', fontWeight: 800, fontSize: '0.9rem', textTransform: 'uppercase' }}>Volume</th>
               <th style={{ padding: '1.5rem 2rem', fontWeight: 800, fontSize: '0.9rem', textTransform: 'uppercase', textAlign: 'right' }}>Actions</th>
             </tr>
           </thead>
           <tbody>
             {loading ? (
               <tr><td colSpan={5} style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)' }}>Chargement...</td></tr>
             ) : courses.length === 0 ? (
               <tr><td colSpan={5} style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)', fontStyle: 'italic' }}>Aucun cours répertorié.</td></tr>
             ) : courses.map((c) => (
               <tr key={c.id} style={{ borderBottom: '1px solid var(--surface-border)', color: 'var(--text-main)' }}>
                 <td style={{ padding: '1.75rem 2rem', fontWeight: 800, fontSize: '1.2rem', color: 'var(--primary)' }}>{c.title}</td>
                 <td style={{ padding: '1.75rem 2rem' }}>
                   <span style={{ border: '1px solid var(--surface-border)', background: 'var(--surface-hover)', color: 'var(--text-main)', padding: '0.5rem 1.25rem', borderRadius: '999px', fontSize: '0.9rem', fontWeight: 700 }}>{c.level}</span>
                 </td>
                 <td style={{ padding: '1.75rem 2rem', color: 'var(--text-muted)', fontWeight: 600 }}>{c.teacher}</td>
                 <td style={{ padding: '1.75rem 2rem', color: 'var(--text-muted)', fontWeight: 600 }}>{c.hours}</td>
                 <td style={{ padding: '1.75rem 2rem', textAlign: 'right' }}>
                   <button onClick={() => setEditingCourse(c)} className="btn-premium btn-outline-custom" style={{ padding: '0.6rem 1.2rem', fontSize: '0.85rem', marginRight: '0.75rem' }}>Modifier</button>
                   <DeleteAction id={c.id} type="courses" onSuccess={loadCourses} />
                 </td>
               </tr>
             ))}
           </tbody>
        </table>
      </div>
    </div>
  );
}
