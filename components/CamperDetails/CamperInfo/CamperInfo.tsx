import { CamperID } from '@/types/camper';
import css from './CamperInfo.module.css';

interface CamperDetailsProps {
  camper: CamperID;
  reviewsCount?: number;
}
const formatLocation = (loc: string) => {
  if (!loc) return '';
  const parts = loc.split(',').map(item => item.trim());
  return parts.length === 2 ? `${parts[1]}, ${parts[0]}` : loc;
};

const formatFeatureName = (str: string): string => {
  if (!str) return '';
  return str
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

export default function CamperDetails({ camper, reviewsCount = 0 }: CamperDetailsProps) {
  const formattedLocation = formatLocation(camper.location);
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(formattedLocation)}`;
  const badges: string[] = [
    camper.transmission,
    camper.engine,
    ...(camper.amenities || []),
  ].filter(Boolean);

  return (
    <div className={css.infoColumn}>
      {}
      <div className={css.mainCard}>
        <h1 className={css.title}>{camper.name}</h1>

       <div className={css.metaRow}>
  <div className={css.ratingWrapper}>
    <svg className={css.starIcon} width="16" height="16">
      <use href="/logo-sprite.svg#Rating" />
    </svg>
   <span className={css.ratingText}>
      {camper.rating} ({reviewsCount} Reviews)
    </span>
  </div>

  <a
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={css.locationWrapper}
          >
    <svg className={css.locationIcon} width="16" height="16">
      <use href="/iconsSprite.svg#Map" />
    </svg>
    <span className={css.locationText}>
      {formatLocation(camper.location)}
    </span>
  </a>
</div>

<p className={css.price}>€{Math.round(camper.price)}</p>

<p className={css.description}>{camper.description}</p>
      </div>

      {}
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