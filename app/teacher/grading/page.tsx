'use client';

import { useState, useEffect } from 'react';

interface Classroom { id: number; name: string; level: string; }
interface Course { id: number; title: string; level: string; }
interface Student { id: number; name: string; email: string; }
interface GradeEntry { grade: string; comment: string; }

const TEACHER_ID = 2; // À remplacer par session réelle

export default function TeacherGrading() {
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [evaluationType, setEvaluationType] = useState('Contrôle Continu');
  const [grades, setGrades] = useState<{ [key: number]: GradeEntry }>({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState('');

  useEffect(() => {
    Promise.all([
      fetch('/api/classrooms').then(r => r.json()),
      fetch('/api/courses').then(r => r.json()),
    ]).then(([cls, crs]) => {
      setClassrooms(Array.isArray(cls) ? cls : []);
      setCourses(Array.isArray(crs) ? crs : []);
    }).catch(() => {});
  }, []);

  useEffect(() => {
    if (!selectedClass) { setStudents([]); return; }
    setLoading(true);
    fetch(`/api/classrooms/${selectedClass}`)
      .then(r => r.json())
      .then(d => {
        setStudents(d?.enrollments?.map((e: { student: Student }) => e.student) || []);
        setLoading(false);
      })
      .catch(() => { setStudents([]); setLoading(false); });
  }, [selectedClass]);

  const handleGradeChange = (studentId: number, field: 'grade' | 'comment', value: string) => {
    setGrades(prev => ({ ...prev, [studentId]: { ...prev[studentId], [field]: value } }));
  };

  const handleSave = async () => {
    if (!selectedCourse) { alert('Veuillez sélectionner un cours'); return; }
    setSaving(true);
    setSuccess('');
    try {
      const promises = Object.entries(grades)
        .filter(([, g]) => g.grade?.trim())
        .map(([studentId, gradeData]) =>
          fetch('/api/grades', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              studentId: parseInt(studentId),
              courseId: parseInt(selectedCourse),
              teacherId: TEACHER_ID,
              grade: parseFloat(gradeData.grade),
              type: evaluationType,
              date: new Date().toISOString()
            })
          })
        );
      await Promise.all(promises);
      setSuccess(`${promises.length} note(s) enregistrée(s) avec succès !`);
      setGrades({});
    } catch {
      alert('Erreur lors de l\'enregistrement');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '3rem' }}>
        <h1 className="font-heading" style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.04em', marginBottom: '0.5rem' }}>Saisie des Notes</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', fontWeight: 500 }}>Enregistrez les résultats des évaluations pour vos classes.</p>
      </div>

      <div className="card-premium" style={{ border: '1px solid var(--surface-border)', marginBottom: '2.5rem' }}>
        {success && (
          <div style={{ padding: '1rem', background: '#ecfdf5', color: '#059669', borderRadius: '10px', fontWeight: 700, marginBottom: '1.5rem', border: '1px solid #10b981' }}>
            ✅ {success}
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem', marginBottom: '2.5rem', alignItems: 'flex-end' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 700, color: 'var(--text-muted)', fontSize: '0.85rem' }}>Classe</label>
            <select value={selectedClass} onChange={e => setSelectedClass(e.target.value)}
              style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid var(--surface-border)', background: 'var(--surface-hover)', color: 'var(--text-main)', fontWeight: 700, outline: 'none' }}>
              <option value="">Choisir une classe</option>
              {classrooms.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 700, color: 'var(--text-muted)', fontSize: '0.85rem' }}>Cours</label>
            <select value={selectedCourse} onChange={e => setSelectedCourse(e.target.value)}
              style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid var(--surface-border)', background: 'var(--surface-hover)', color: 'var(--text-main)', fontWeight: 700, outline: 'none' }}>
              <option value="">Choisir un cours</option>
              {courses.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
            </select>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 700, color: 'var(--text-muted)', fontSize: '0.85rem' }}>Type d&apos;évaluation</label>
            <select value={evaluationType} onChange={e => setEvaluationType(e.target.value)}
              style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid var(--surface-border)', background: 'var(--surface-hover)', color: 'var(--text-main)', fontWeight: 700, outline: 'none' }}>
              <option>Contrôle Continu</option>
              <option>Examen Semestriel</option>
              <option>Travail Pratique</option>
            </select>
          </div>
        </div>

        {selectedClass && (
          <>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--surface-border)', color: 'var(--text-muted)', textAlign: 'left' }}>
                    <th style={{ padding: '1rem', fontWeight: 700 }}>Élève</th>
                    <th style={{ padding: '1rem', fontWeight: 700, width: '180px' }}>Note (/20)</th>
                    <th style={{ padding: '1rem', fontWeight: 700 }}>Commentaire</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr><td colSpan={3} style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>Chargement...</td></tr>
                  ) : students.length === 0 ? (
                    <tr><td colSpan={3} style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>Aucun élève dans cette classe</td></tr>
                  ) : students.map(student => (
                    <tr key={student.id} style={{ borderBottom: '1px solid var(--surface-border)' }}>
                      <td style={{ padding: '1rem', fontWeight: 700, color: 'var(--text-main)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>
                            {student.name.charAt(0)}
                          </div>
                          {student.name}
                        </div>
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <input type="number" min="0" max="20" step="0.25"
                          value={grades[student.id]?.grade || ''}
                          onChange={e => handleGradeChange(student.id, 'grade', e.target.value)}
                          placeholder="0 - 20"
                          style={{ width: '100%', padding: '0.6rem 0.75rem', borderRadius: '8px', border: '1px solid var(--surface-border)', outline: 'none', background: 'var(--surface-hover)', color: 'var(--text-main)', fontWeight: 700, fontSize: '1rem' }}
                        />
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <input type="text"
                          value={grades[student.id]?.comment || ''}
                          onChange={e => handleGradeChange(student.id, 'comment', e.target.value)}
                          placeholder="Observation..."
                          style={{ width: '100%', padding: '0.6rem 0.75rem', borderRadius: '8px', border: '1px solid var(--surface-border)', outline: 'none', background: 'var(--surface-hover)', color: 'var(--text-main)' }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn-premium btn-primary-custom"
                onClick={handleSave}
                disabled={saving || students.length === 0 || !selectedCourse}
                style={{ padding: '1rem 2.5rem', borderRadius: '12px', opacity: saving ? 0.7 : 1 }}>
                {saving ? 'Enregistrement...' : '💾 Enregistrer les notes'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
