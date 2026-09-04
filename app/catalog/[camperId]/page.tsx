'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getCamperID, getReviews } from '@/services/api';
import { CamperID, Review } from '@/types/camper';
import CamperGallery from '@/components//CamperDetails/CamperGallery/CamperGallery';
import CamperDetails from '@/components/CamperDetails/CamperInfo/CamperInfo';
import CamperReviews from '@/components/CamperDetails/CamperReviews/CamperReviews';
import BookingForm from '@/components/CamperDetails/BookingForm/BookingForm';
import css from './CamperDetailsPage.module.css';

export default function CamperDetailsPage() {
  const params = useParams();
  const id = params?.id as string;

  const [camper, setCamper] = useState<CamperID | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [camperData, reviewsData] = await Promise.all([
          getCamperID(id),
          getReviews(id),
        ]);
        setCamper(camperData);
        setReviews(reviewsData);
      } catch (error) {
        console.error('Error loading camper details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (isLoading) return <div className={css.loader}>Loading camper details...</div>;
  if (!camper) return <div className={css.notFound}>Camper not found</div>;

  return (
    <main className={css.container}>
      {}
      <section className={css.headerSection}>
        <h1 className={css.title}>{camper.name}</h1>
        <div className={css.meta}>
          <span className={css.rating}>★ {camper.rating} ({reviews.length} Reviews)</span>
          <span className={css.location}>📍 {camper.location}</span>
        </div>
        <p className={css.price}>€{camper.price.toFixed(2)}</p>
      </section>

      {}
      <section className={css.mainGrid}>
        <div className={css.leftColumn}>
          <CamperGallery gallery={camper.gallery} />
        </div>
        <div className={css.rightColumn}>
          <CamperDetails camper={camper} />
        </div>
      </section>

      {}
      <section className={css.bottomGrid}>
        <div className={css.leftColumn}>
          <CamperReviews reviews={reviews} />
        </div>
        <div className={css.rightColumn}>
          <BookingForm camperId={id} />
        </div>
      </section>
    </main>
  );
}