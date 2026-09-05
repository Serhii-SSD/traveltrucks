import { CamperID } from '@/types/camper';
import css from './CamperInfo.module.css';

interface CamperDetailsProps {
  camper: CamperID;
  reviewsCount?: number;
}

const formatFeatureName = (str: string): string => {
  if (!str) return '';
  return str
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

export default function CamperDetails({ camper, reviewsCount = 0 }: CamperDetailsProps) {
  const badges: string[] = [
    camper.transmission,
    camper.engine,
    ...(camper.amenities || []),
  ].filter(Boolean);

  return (
    <div className={css.infoColumn}>
      {/* 1. Верхня картка: Основна інформація */}
      <div className={css.mainCard}>
        <h1 className={css.title}>{camper.name}</h1>

        <div className={css.metaRow}>
          <span className={css.rating}>★ {camper.rating} ({reviewsCount} Reviews)</span>
          <span className={css.location}>📍 {camper.location}</span>
        </div>

        <p className={css.price}>€{camper.price.toFixed(2)}</p>

        <p className={css.description}>{camper.description}</p>
      </div>

      {/* 2. Нижня картка: Vehicle Details */}
      <div className={css.detailsCard}>
        <h3 className={css.sectionTitle}>Vehicle details</h3>

        <ul className={css.badgesList}>
          {badges.map((item, index) => (
            <li key={index} className={css.badge}>
              {formatFeatureName(item)}
            </li>
          ))}
        </ul>

        <div className={css.divider} />

        <ul className={css.specsList}>
          <li className={css.specItem}>
            <span className={css.specLabel}>Form</span>
            <span className={css.specValue}>{formatFeatureName(camper.form)}</span>
          </li>
          <li className={css.specItem}>
            <span className={css.specLabel}>Length</span>
            <span className={css.specValue}>{camper.length}</span>
          </li>
          <li className={css.specItem}>
            <span className={css.specLabel}>Width</span>
            <span className={css.specValue}>{camper.width}</span>
          </li>
          <li className={css.specItem}>
            <span className={css.specLabel}>Height</span>
            <span className={css.specValue}>{camper.height}</span>
          </li>
          <li className={css.specItem}>
            <span className={css.specLabel}>Tank</span>
            <span className={css.specValue}>{camper.tank}</span>
          </li>
          <li className={css.specItem}>
            <span className={css.specLabel}>Consumption</span>
            <span className={css.specValue}>{camper.consumption}</span>
          </li>
        </ul>
      </div>
    </div>
  );
}