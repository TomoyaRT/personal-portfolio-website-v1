'use client';

import { useEffect, type ReactNode } from 'react';
import Lenis from 'lenis';
import { useStore } from '@/lib/store';
import Loader from './Loader';
import Layout from './Layout';

interface ClientLayoutProps {
  children: ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const setLenis = useStore((state) => state.setLenis);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    setLenis(lenis);

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [setLenis]);

  return (
    <>
      <Loader />
      <Layout>{children}</Layout>
    </>
  );
}
