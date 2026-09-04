import { CamperID } from '@/types/camper';
import css from './CamperDetails.module.css';

interface CamperDetailsProps {
  camper: CamperID;
}

const formatFeatureName = (str: string): string => {
  if (!str) return '';
  return str
    .replace(/_/g, ' ')
    .replace(/\b\w/g, char => char.toUpperCase());
};

export default function CamperDetails({ camper }: CamperDetailsProps) {

  const badges: string[] = [
    camper.transmission,
    camper.engine,
    ...(camper.amenities || []),
  ].filter(Boolean);

  return (
    <div className={css.detailsCard}>
      <p className={css.description}>{camper.description}</p>

      {}
      <ul className={css.badgesList}>
        {badges.map((item, index) => (
          <li key={index} className={css.badge}>
            {formatFeatureName(item)}
          </li>
        ))}
      </ul>

      <h3 className={css.sectionTitle}>Vehicle details</h3>
      <div className={css.divider} />

      {}
      <ul className={css.specsList}>
        <li className={css.specItem}>
          <span>Form</span>
          <span>{formatFeatureName(camper.form)}</span>
        </li>
        <li className={css.specItem}>
          <span>Length</span>
          <span>{camper.length}</span>
        </li>
        <li className={css.specItem}>
          <span>Width</span>
          <span>{camper.width}</span>
        </li>
        <li className={css.specItem}>
          <span>Height</span>
          <span>{camper.height}</span>
        </li>
        <li className={css.specItem}>
          <span>Tank</span>
          <span>{camper.tank}</span>
        </li>
        <li className={css.specItem}>
          <span>Consumption</span>
          <span>{camper.consumption}</span>
        </li>
      </ul>
    </div>
  );
}