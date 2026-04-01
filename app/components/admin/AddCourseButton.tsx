'use client';

import { useState } from 'react';
import AddCourseModal from './AddCourseModal';

export default function AddCourseButton({ onSuccess }: { onSuccess?: () => void }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClose = () => {
    setIsModalOpen(false);
    onSuccess?.();
  };

  return (
    <>
      <button 
        onClick={() => setIsModalOpen(true)}
        className="btn-premium btn-primary-custom" 
        style={{ padding: '1rem 2rem', background: '#f59e0b' }}
      >
        + Nouveau Cours
      </button>

      {isModalOpen && <AddCourseModal onClose={handleClose} />}
    </>
  );
}
