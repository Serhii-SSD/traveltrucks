'use client';

import { useEffect, useState } from 'react';
import { CamperID, Review } from '@/types/camper';
import { getCamperID, getReviews } from '@/services/api'; 
import CamperGallery from '@/components/CamperDetails/CamperGallery/CamperGallery';
import CamperDetails from '@/components/CamperDetails/CamperInfo/CamperInfo';
import CamperReviews from '@/components/CamperDetails/CamperReviews/CamperReviews';
import BookingForm from '@/components/CamperDetails/BookingForm/BookingForm';
import css from './camperId.module.css';

interface CamperDetailsClientProps {
  camperId: string;
}

export default function CamperDetailsClient({ camperId }: CamperDetailsClientProps) {
  const [camper, setCamper] = useState<CamperID | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!camperId) return;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [camperData, reviewsData] = await Promise.all([
          getCamperID(camperId),
          getReviews(camperId),
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
  }, [camperId]);

  if (isLoading) return <div className={css.loader}>Loading camper details...</div>;
  if (!camper) return <div className={css.notFound}>Camper not found</div>;

  return (
    <main className={css.detailsPage}>
      <div className={css.mainContainer}>
        <section className={css.topSection}>
          <div className={css.galleryColumn}>
            <CamperGallery gallery={camper.gallery} />
          </div>
          <div className={css.infoColumn}>
            <CamperDetails camper={camper} reviewsCount={reviews.length} />
          </div>
        </section>

        <section className={css.bottomSectionWrapper}>
          <h2 className={css.sectionTitle}>Reviews</h2>
          <div className={css.bottomSectionContent}>
            <div className={css.reviewsColumn}>
              <CamperReviews reviews={reviews} />
            </div>
            <div className={css.bookingColumn}>
              <BookingForm camperId={camperId} />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}