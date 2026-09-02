'use client'

import Image from "next/image";
import { useRouter } from "next/router";
import Header from "@/components/Header/Header";
import styles from "./page.module.css"

export default function HomePage() {
  const router = useRouter();

  const handleNavigateToCatalog = () => {
    router.push('/catalog');
  };
  return (
    <>
      <Header />
      <main className={styles.main}>
        <section className={styles.hero}>
          { }
          <div className={styles.imageWrapper}>
            <Image
              src="/public/hero.webp"
              alt="Travel truck at sundown"
              fill
              priority
              quality={85}
              className={styles.heroImage}
            />
          </div>
          { }
          <div className={styles.content}>
            <h1 className={styles.title}>Campers of your dreams</h1>
            <p className={styles.subtitle}>You can find everything you want in our catalog</p>
            <button
              type="button"
              className={styles.buttonViewNow}
              onClick={handleNavigateToCatalog}>View Now</button>
          </div>
        </section>
      </main>
     </>
  );
}