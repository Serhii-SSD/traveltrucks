import { Review } from '@/types/camper';
import css from './CamperReviews.module.css';

interface CamperReviewsProps {
  reviews: Review[];
}

export default function CamperReviews({ reviews }: CamperReviewsProps) {
  if (!reviews || reviews.length === 0) {
    return <p className={css.noReviews}>No reviews yet.</p>;
  }

  return (
    <div className={css.reviewsList}>
      {reviews.map((review, index) => {
        const initial = review.reviewer_name
          ? review.reviewer_name.charAt(0).toUpperCase()
          : 'U';

        return (
          <div key={index} className={css.reviewCard}>
            <div className={css.reviewerHeader}>
              <div className={css.avatar}>{initial}</div>
              <div className={css.reviewerInfo}>
                <p className={css.reviewerName}>{review.reviewer_name}</p>
                <div className={css.starsRow}>
                  {Array.from({ length: 5 }, (_, i) => (
                    <span
                      key={i}
                      className={
                        i < review.reviewer_rating
                          ? css.starFilled
                          : css.starEmpty
                      }
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <p className={css.comment}>{review.comment}</p>
          </div>
        );
      })}
    </div>
  );
}