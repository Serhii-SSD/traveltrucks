import Link from 'next/link';
import css from './Header.module.css';

export default function Header() {
  return (
    <header className={css.header}>
      <div className={css.container}>
        <Link href="/" className={css.logo}>
          <svg className={css.logoIcon} width="136" height="16">
            <use href="/sprite.svg#TravelTrucks" />
          </svg>
        </Link>

        <nav className={css.nav}>
          <Link href="/" className={css.navLink}>
            Home
          </Link>
          <Link href="/catalog" className={css.navLink}>
            Catalog
          </Link>
        </nav>
      </div>
    </header>
  );
}