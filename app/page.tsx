import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'TravelTrucks | Campers of Your Dreams',
  description:
    'Rent the best campers and motorhomes in Ukraine. Find everything you need for your dream trip in our catalog.',
  openGraph: {
    title: 'TravelTrucks | Campers of Your Dreams',
    description: 'You can find everything you want in our catalog.',
    images: ['/hero.webp'],
  },
};

export default function HomePage() {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <div className={styles.imageWrapper}>
          <Image
            src="/hero.webp"
            alt="Travel truck at sundown"
            fill
            priority
            quality={75}
            className={styles.heroImage}
          />
        </div>

        <div className={styles.content}>
          <h1 className={styles.title}>Campers of your dreams</h1>
          <p className={styles.subtitle}>
            You can find everything you want in our catalog
          </p>
          <Link href="/catalog" className={styles.buttonViewNow}>
            View Now
          </Link>
        </div>
      </section>
    </main>
  );
}