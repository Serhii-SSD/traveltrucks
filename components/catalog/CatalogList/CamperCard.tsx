'use client';

import Image from 'next/image';
import Link from 'next/link';
import css from './CamperCard.module.css';
import { Campers } from '@/types/camper';

interface CamperCardProps {
  camper: Campers;
}

export default function CamperCard({ camper }: CamperCardProps) {
  const {
    id,
    name,
    price,
    rating,
    totalReviews,
    description,
    coverImage,
    transmission,
    engine,
    form,
  } = camper;

  const formatLocation = (loc: string) => {
  if (!loc) return '';
  const parts = loc.split(',').map(item => item.trim());
  return parts.length === 2 ? `${parts[1]}, ${parts[0]}` : loc;
  };
  const formattedLocation = formatLocation(camper.location);
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(formattedLocation)}`;
  const formatBadgeLabel = (value: string) =>
    value
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

  return (
    <li className={css.cardItem}>
      {}
      <div className={css.imageWrapper}>
        <Image
          src={coverImage || '/placeholder.jpg'}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, 292px"
          className={css.cardImage}
        />
      </div>

      {}
      <div className={css.contentWrapper}>
        {}
        <div className={css.headerRow}>
          <h2 className={css.title}>{name}</h2>
          <span className={css.price}>€{price}</span>
        </div>

        {}
        <div className={css.metaRow}>
          <div className={css.ratingWrapper}>
            <svg className={css.starIcon} width="16" height="16" aria-hidden="true">
              <use href="/IconsSprite.svg#gold-rating" />
            </svg>
            <span className={css.ratingText}>
              {rating} ({totalReviews} Reviews)
            </span>
          </div>

          <a
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={css.locationWrapper}
          >
            <svg className={css.mapIcon} width="16" height="16" aria-hidden="true">
              <use href="/IconsSprite.svg#Map" />
            </svg>
           <span className={css.locationText}>
      {formatLocation(camper.location)}
    </span>
          </a>
        </div>

        {}
        <p className={css.description}>{description}</p>

        {}
        <ul className={css.featuresList}>
          {engine && (
            <li className={css.featureItem}>
              <svg className={css.featureIcon} width="20" height="20" aria-hidden="true">
                <use href="/IconsSprite.svg#diesel" />
              </svg>
              <span>{formatBadgeLabel(engine)}</span>
            </li>
          )}
          {transmission && (
            <li className={css.featureItem}>
              <svg className={css.featureIcon} width="20" height="20" aria-hidden="true">
                <use href="/IconsSprite.svg#gearbox" />
              </svg>
              <span>{formatBadgeLabel(transmission)}</span>
            </li>
          )}
          {form && (
            <li className={css.featureItem}>
              <svg className={css.featureIcon} width="20" height="20" aria-hidden="true">
                <use href="/IconsSprite.svg#car-type" />
              </svg>
              <span>{formatBadgeLabel(form)}</span>
            </li>
          )}
        </ul>

        {}
        <Link
          href={`/catalog/${id}`}
          target="_blank"
          rel="noopener noreferrer"
          className={css.showMoreBtn}
        >
          Show more
        </Link>
      </div>
    </li>
  );
}