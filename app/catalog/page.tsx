'use client';

import { useState, useEffect, useCallback } from 'react';
import SearchFilter from '@/components/catalog/SearchFilter/SearchFilter';
import CatalogList from '@/components/catalog/CatalogList/CatalogList';
import { getCamper } from '@/services/api';
import { Campers, FormDataValue } from '@/types/camper';
import css from './catalog.module.css';

const PER_PAGE = 4;

const INITIAL_FILTERS: FormDataValue = {
  location: '',
  form: '',
  engine: '',
  transmission: '',
};

export default function CatalogPage() {
  const [campers, setCampers] = useState<Campers[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeFilters, setActiveFilters] = useState<FormDataValue>(INITIAL_FILTERS);

  const fetchCampers = useCallback(
    async (
      targetPage: number,
      filtersToApply: FormDataValue,
      isNewSearch: boolean = false
    ) => {
      setIsLoading(true);

      try {
        const data = await getCamper({
          dataFilter: filtersToApply,
          page: targetPage,
          perPage: PER_PAGE,
        });

        const newItems = data.campers || [];

        if (isNewSearch) {
          setCampers(newItems);
        } else {
          setCampers(prev => [...prev, ...newItems]);
        }

        const calculatedTotalPages = data.totalPages || Math.ceil((data.total || 0) / PER_PAGE);
        setTotalPages(calculatedTotalPages);
      } catch (error) {
        console.error('Error fetching campers:', error);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  // Первинний фетч при завантаженні сторінки
  useEffect(() => {
    let ignore = false;

    const loadInitialData = async () => {
      if (!ignore) {
        await fetchCampers(1, activeFilters, true);
      }
    };

    loadInitialData();

    return () => {
      ignore = true;
    };
  }, [fetchCampers]);

  // Обробка відправки чи очищення фільтрів
  const handleSearch = (newFilters: FormDataValue) => {
    setActiveFilters(newFilters);
    setPage(1);
    fetchCampers(1, newFilters, true);
  };

  // Обробка кнопки Load More
  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchCampers(nextPage, activeFilters, false);
  };

  const hasMore = page < totalPages;

  return (
    <main className={css.catalogContainer}>
      <aside className={css.sidebar}>
        <SearchFilter onSearch={handleSearch} />
      </aside>

      <section className={css.content}>
        <CatalogList
          campers={campers}
          hasMore={hasMore}
          onLoadMore={handleLoadMore}
          isLoading={isLoading}
        />
      </section>
    </main>
  );
}