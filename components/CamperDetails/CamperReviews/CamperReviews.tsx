import { Review } from '@/types/camper';
import css from './CamperReviews.module.css';

interface CamperReviewsProps {
  reviews: Review[];
}

export default function CamperReviews({ reviews }: CamperReviewsProps) {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => {
      const isFilled = index < rating;
      return (
        <span
          key={index}
          className={isFilled ? css.starFilled : css.starEmpty}
        >
          ★
        </span>
      );
    });
  };

  if (!reviews || reviews.length === 0) {
    return (
      <div className={css.noReviews}>
        <p>No reviews available for this camper yet.</p>
      </div>
    );
  }

  return (
    <div className={css.reviewsContainer}>
      <ul className={css.reviewsList}>
        {reviews.map((item) => {
          const initialLetter = item.reviewer_name
            ? item.reviewer_name.charAt(0).toUpperCase()
            : 'U';

          return (
            <li key={item.id} className={css.reviewCard}>
              <div className={css.headerRow}>
                {}
                <div className={css.avatar}>{initialLetter}</div>

                <div className={css.meta}>
                  <p className={css.authorName}>{item.reviewer_name}</p>
                  <div className={css.starsContainer}>
                    {renderStars(item.reviewer_rating)}
                  </div>
                </div>
              </div>

              <p className={css.comment}>{item.comment}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}