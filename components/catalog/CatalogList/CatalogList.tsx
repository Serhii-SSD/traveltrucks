'use client';

import CamperCard from './CamperCard';
import css from './CatalogList.module.css';
import { Campers } from '@/types/camper';

interface CatalogListProps {
  campers: Campers[];
  hasMore: boolean;
  onLoadMore: () => void;
  isLoading: boolean;
}

export default function CatalogList({
  campers,
  hasMore,
  onLoadMore,
  isLoading,
}: CatalogListProps) {
  if (!isLoading && campers.length === 0) {
    return (
      <div className={css.emptyState}>
        <p>No campers found matching your criteria.</p>
      </div>
    );
  }

  return (
    <section className={css.listSection}>
      <ul className={css.camperGrid}>
        {campers.map(camper => (
          <CamperCard key={camper.id} camper={camper} />
        ))}
      </ul>

      {}
      {hasMore && (
        <div className={css.loadMoreContainer}>
          <button
            type="button"
            className={css.loadMoreBtn}
            onClick={onLoadMore}
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Load more'}
          </button>
        </div>
      )}
    </section>
  );
}