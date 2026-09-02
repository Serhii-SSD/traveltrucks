'use client';

import { usePathname, useRouter } from 'next/navigation';
import styles from './Header.module.css';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {}
        <div 
          className={styles.logo} 
          onClick={() => handleNavigate('/')} 
          role="button" 
          tabIndex={0}>
          <svg className={styles.logoIcon}>
            <use href="/sprite.svg#TravelTrucks" />
          </svg>
        </div>

        {}
        <nav className={styles.nav}>
          <button
            type="button"
            className={pathname === '/' ? styles.active : styles.link}
            onClick={() => handleNavigate('/')}>
            Home
          </button>
          <button
            type="button"
            className={pathname.startsWith('/catalog') ? styles.active : styles.link}
            onClick={() => handleNavigate('/catalog')}>
            Catalog
          </button>
        </nav>
      </div>
    </header>
  );
}