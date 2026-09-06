'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import css from './Header.module.css';

export default function Header() {
  const pathname = usePathname();

  return (
    <header className={css.header}>
      <div className={css.container}>
        <Link href="/" className={css.logo} aria-label="TravelTrucks Home">
          <svg className={css.logoIcon} width="136" height="16">
            <use href="/logo-sprite.svg#TravelTrucks" />
          </svg>
        </Link>

        <nav className={css.nav}>
          <Link
            href="/"
            className={`${css.navLink} ${
              pathname === '/' ? css.activeLink : ''
            }`}
          >
            Home
          </Link>
          <Link
            href="/catalog"
            className={`${css.navLink} ${
              pathname.startsWith('/catalog') ? css.activeLink : ''
            }`}
          >
            Catalog
          </Link>
        </nav>
      </div>
    </header>
  );
}