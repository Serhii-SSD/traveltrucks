'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import type { Swiper as SwiperClass } from 'swiper';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';

import { Gallery } from '@/types/camper';
import css from './CamperGallery.module.css';

interface CamperGalleryProps {
  gallery: Gallery[];
}

export default function CamperGallery({ gallery }: CamperGalleryProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);

  if (!gallery || gallery.length === 0) return null;

  return (
    <div className={css.galleryWrapper}>
      {}
      <Swiper
        loop={true}
        spaceBetween={10}
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        modules={[FreeMode, Thumbs]}
        className={css.mainSwiper}
      >
        {gallery.map((item, index) => (
          <SwiperSlide key={item.id || index} className={css.mainSlide}>
            <div className={css.mainImageContainer}>
              <Image
                src={item.original || item.thumb}
                alt={`Camper image ${index + 1}`}
                fill
                priority={index === 0}
                sizes="(max-width: 1440px) 638px, 100vw"
                className={css.mainImage}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {}
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={gallery.length > 4}
        spaceBetween={31}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className={css.thumbsSwiper}
      >
        {gallery.map((item, index) => (
          <SwiperSlide key={item.id || index} className={css.thumbSlide}>
            <div className={css.thumbWrapper}>
              <Image
                src={item.thumb || item.original}
                alt={`Thumbnail ${index + 1}`}
                fill
                sizes="135px"
                className={css.thumbImage}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}