'use client';

import CamperCard from './CamperCard';
import css from './CatalogList.module.css';
import { Campers } from '@/types/camper';
import LoaderModal from '@/components/catalog/LoaderModal/LoaderModal';
import EmptyState from '@/components/catalog/CatalogList/EmptyState';

interface CatalogListProps {
  campers: Campers[];
  hasMore: boolean;
  onLoadMore: () => void;
  isLoading: boolean;
  onClearFilters: () => void;
}

export default function CatalogList({
  campers,
  hasMore,
  onLoadMore,
  isLoading,
  onClearFilters,
}: CatalogListProps) {
  return (
    <section className={css.listSection}>
      {}
      {isLoading && <LoaderModal />}

      {}
      {!isLoading && campers.length === 0 && (
        <EmptyState onClearFilters={onClearFilters} />
      )}

      {}
      {campers.length > 0 && (
        <>
          <ul className={css.camperGrid}>
            {campers.map(camper => (
              <CamperCard key={camper.id} camper={camper} />
            ))}
          </ul>

          {hasMore && (
            <div className={css.loadMoreContainer}>
              <button
                type="button"
                className={css.loadMoreBtn}
                onClick={onLoadMore}
              >
                Load more
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}