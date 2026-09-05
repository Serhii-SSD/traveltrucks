'use client';

import { useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import SearchFilter from '@/components/catalog/SearchFilter/SearchFilter';
import CatalogList from '@/components/catalog/CatalogList/CatalogList';
import { getCamper } from '@/services/api';
import { FormDataValue } from '@/types/camper';
import css from './catalog.module.css';

const PER_PAGE = 4;

const INITIAL_FILTERS: FormDataValue = {
  location: '',
  form: '',
  engine: '',
  transmission: '',
};

export default function CatalogPage() {
  const [activeFilters, setActiveFilters] = useState<FormDataValue>(INITIAL_FILTERS);
  const [filterKey, setFilterKey] = useState<number>(0);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ['campers', activeFilters],
    queryFn: ({ pageParam = 1 }) =>
      getCamper({
        dataFilter: activeFilters,
        page: pageParam,
        perPage: PER_PAGE,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const totalPages =
        lastPage.totalPages || Math.ceil((lastPage.total || 0) / PER_PAGE);

      return lastPage.page < totalPages ? lastPage.page + 1 : undefined;
    },
  });

  const campers = data?.pages.flatMap((page) => page.campers || []) ?? [];

  const handleSearch = (newFilters: FormDataValue) => {
    setActiveFilters(newFilters);
  };

  const handleResetFilters = () => {
    setActiveFilters(INITIAL_FILTERS);
    setFilterKey((prev) => prev + 1);
  };

  return (
    <main className={css.catalogContainer}>
      <aside className={css.sidebar}>
        <SearchFilter key={filterKey} onSearch={handleSearch} />
      </aside>

      <section className={css.content}>
        <CatalogList
          campers={campers}
          hasMore={Boolean(hasNextPage)}
          onLoadMore={() => fetchNextPage()}
          isLoading={isLoading || isFetchingNextPage}
          onClearFilters={handleResetFilters}
        />
      </section>
    </main>
  );
}