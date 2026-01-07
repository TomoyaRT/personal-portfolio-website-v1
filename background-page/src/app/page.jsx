'use client';

import dynamic from 'next/dynamic';
import Footer from '@/components/Footer';
import styles from './page.module.scss';

const BackgroundCanvas = dynamic(() => import('@/canvas/background/Index'), {
  ssr: false,
});

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Flowing Black Background Effect</h1>
        <p className={styles.description}>
          This is a demonstration of the flowing black background effect migrated from the original portfolio.
        </p>

        <div className={styles.canvasContainer}>
          <BackgroundCanvas />
        </div>
      </main>

      <Footer />
    </div>
  );
}
