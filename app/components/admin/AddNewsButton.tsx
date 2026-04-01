'use client';

import { useState } from 'react';
import AddNewsModal from './AddNewsModal';

export default function AddNewsButton({ onSuccess }: { onSuccess?: () => void }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClose = () => {
    setIsModalOpen(false);
    onSuccess?.();
  };

  return (
    <>
      <button 
        onClick={() => setIsModalOpen(true)}
        className="btn-premium btn-outline-custom" 
        style={{ padding: '1.25rem', justifyContent: 'space-between', width: '100%', display: 'flex', alignItems: 'center', fontWeight: 700 }}
      >
        + Publier une actualité <span>→</span>
      </button>

      {isModalOpen && <AddNewsModal onClose={handleClose} />}
    </>
  );
}
