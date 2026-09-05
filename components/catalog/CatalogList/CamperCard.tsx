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
    location,
    description,
    coverImage,
    transmission,
    engine,
    form,
  } = camper;

  const formatBadgeLabel = (value: string) =>
    value
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

  return (
    <li className={css.cardItem}>
      {/* Головне фото */}
      <div className={css.imageWrapper}>
        <Image
          src={coverImage || '/placeholder.jpg'}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, 292px"
          className={css.cardImage}
        />
      </div>

      {/* Інформаційна частина */}
      <div className={css.contentWrapper}>
        {/* Заголовок та ціна */}
        <div className={css.headerRow}>
          <h2 className={css.title}>{name}</h2>
          <span className={css.price}>€{price.toFixed(2)}</span>
        </div>

        {/* Рейтинг та локація */}
        <div className={css.metaRow}>
          <div className={css.ratingWrapper}>
            <svg className={css.starIcon} width="16" height="16" aria-hidden="true">
              <use href="/IconsSprite.svg#gold-rating" />
            </svg>
            <span className={css.ratingText}>
              {rating} ({totalReviews} Reviews)
            </span>
          </div>

          <div className={css.locationWrapper}>
            <svg className={css.mapIcon} width="16" height="16" aria-hidden="true">
              <use href="/IconsSprite.svg#Map" />
            </svg>
            <span>{location}</span>
          </div>
        </div>

        {/* Короткий опис */}
        <p className={css.description}>{description}</p>

        {/* Основні характеристики: Engine, Transmission, Form */}
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