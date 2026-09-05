'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import css from './EmptyState.module.css';

interface EmptyStateProps {
  onClearFilters: () => void;
  onResetAll?: () => void;
}

export default function EmptyState({ onClearFilters }: EmptyStateProps) {
  const router = useRouter();

  const handleNavigateToCatalog = () => {
    onClearFilters(); 
    router.push('/catalog');
  };

  return (
    <div className={css.container}>
      <Image
        src="/no-result.webp"
        alt="No campers found"
        width={488}
        height={463}
        className={css.image}
        priority
      />

      <div className={css.textGroup}>
        <h2 className={css.title}>No campers found</h2>
        <p className={css.description}>
          We couldn`t find any campers that match your filters.
          <br />
          Try adjusting your search or clearing some filters.
        </p>
      </div>

      <div className={css.buttonGroup}>
        <button
          type="button"
          className={css.btnClear}
          onClick={onClearFilters}
        >
          <svg className={css.vectorIcon} width="16" height="16">
            <use href="/logo-sprite.svg#Vector" />
          </svg>
          <span>Clear filters</span>
        </button>

        <button
          type="button"
          className={css.btnViewAll}
          onClick={handleNavigateToCatalog}
        >
          View all campers
        </button>
      </div>
    </div>
  );
}