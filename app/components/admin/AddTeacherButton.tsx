'use client';

import { useState } from 'react';
import AddTeacherModal from './AddTeacherModal';

export default function AddTeacherButton({ onSuccess }: { onSuccess?: () => void }) {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => {
    setShowModal(false);
    onSuccess?.();
  };

  return (
    <>
      <button 
        onClick={() => setShowModal(true)}
        className="btn-premium btn-outline-custom" 
        style={{ padding: '1.25rem', justifyContent: 'space-between', fontWeight: 700, width: '100%' }}
      >
        + Ajouter un enseignant <span>→</span>
      </button>
      {showModal && <AddTeacherModal onClose={handleClose} />}
    </>
  );
}
