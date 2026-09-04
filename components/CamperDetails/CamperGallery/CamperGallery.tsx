'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Swiper as SwiperClass } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import css from './CamperGallery.module.css';

interface CamperGalleryProps {
  gallery: { original: string; thumb: string }[];
}

export default function CamperGallery({ gallery }: CamperGalleryProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);

  if (!gallery || gallery.length === 0) return null;

  return (
    <div className={css.galleryContainer}>
      {}
      <Swiper
        spaceBetween={10}
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        modules={[FreeMode, Navigation, Thumbs]}
        className={css.mainSwiper}
      >
        {gallery.map((item, index) => (
          <SwiperSlide key={index} className={css.mainSlide}>
            <Image
              src={item.original}
              alt={`Camper photo ${index + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 600px"
              className={css.mainImage}
              priority={index === 0}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {}
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={16}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className={css.thumbsSwiper}
      >
        {gallery.map((item, index) => (
          <SwiperSlide key={index} className={css.thumbSlide}>
            <Image
              src={item.thumb || item.original}
              alt={`Thumbnail ${index + 1}`}
              width={120}
              height={90}
              className={css.thumbImage}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}