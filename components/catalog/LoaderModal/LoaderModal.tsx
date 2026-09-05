'use client';

import { useEffect } from 'react';
import css from './LoaderModal.module.css';

export default function LoaderModal() {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className={css.backdrop}>
      <div className={css.modalContent}>
        <span className={css.loader}></span>

        <div className={css.textGroup}>
          <h3 className={css.title}>Loading tracks...</h3>
          <p className={css.subtitle}>
            Please wait while we fetch the best travel trucks for you
          </p>
        </div>
      </div>
    </div>
  );
}