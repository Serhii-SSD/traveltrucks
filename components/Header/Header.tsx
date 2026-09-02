'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from './Header.module.css';

export default function Header() {
    const pathname = usePathname();
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <Link href="/" className={styles.logo}>
                    TravelTrucks
                </Link>
                <nav className={styles.nav}>
                    <Link href="/" className={pathname === '/' ? styles.active : styles.Link }>
                    Home
                    </Link>
                <Link href="/catalog" className={pathname.startsWith('/catalog') ? styles.active : styles.Link}>
                Catalog
                </Link>
                </nav>
            </div>
        </header>
    )
}