'use client';

import dynamic from 'next/dynamic';
import styles from './Footer.module.scss';

const BackgroundCanvas = dynamic(() => import('@/canvas/background/Index'), {
  ssr: false,
});

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.background}>
        <BackgroundCanvas />
      </div>
      <div className={styles.content}>
        <p className={styles.text}>© 2025 · Flowing Black Background</p>
        <p className={styles.subtext}>Migrated with Next.js & React Three Fiber</p>
      </div>
    </footer>
  );
}
