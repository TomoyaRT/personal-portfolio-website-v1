'use client';

import React, { useEffect, useRef, useState, type ReactNode } from 'react';
import gsap from 'gsap';
import { useStore } from '@/lib/store';
import { usePathname } from 'next/navigation';

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  const lenis = useStore((state) => state.lenis);
  const introOut = useStore((state) => state.introOut);
  const setIsLoading = useStore((state) => state.setIsLoading);

  const layoutRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLElement>(null);
  const [currentPath, setCurrentPath] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const pathname = usePathname();

  // Handle route changes and trigger transitions
  useEffect(() => {
    if (currentPath === null) {
      // First render - just set the path
      setCurrentPath(pathname);
      return;
    }

    if (currentPath !== pathname && introOut && !isTransitioning) {
      // Route changed - trigger transition
      setIsTransitioning(true);

      // Exit animation
      lenis?.stop();

      const exitTl = gsap.timeline({
        onComplete: () => {
          setIsLoading(true);
          lenis?.scrollTo(0, { force: true });
          setCurrentPath(pathname);

          // Small delay before enter animation
          setTimeout(() => {
            // Enter animation
            const enterTl = gsap.timeline({
              onComplete: () => {
                setIsLoading(false);
                lenis?.start();
                setIsTransitioning(false);
              },
            });

            enterTl
              .set(layoutRef.current, {
                ease: 'power2.inOut',
                height: '90%',
                opacity: 1,
              })
              .to(
                '#loader',
                {
                  x: '-100%',
                  ease: 'power2.inOut',
                  duration: 0.5,
                },
                0,
              )
              .to(
                mainRef.current,
                {
                  ease: 'power2.inOut',
                  x: '0px',
                  duration: 0.5,
                },
                0,
              )
              .to(
                mainRef.current,
                {
                  ease: 'power2.inOut',
                  borderRadius: 0,
                  scale: 1,
                  duration: 0.5,
                },
                0.5,
              )
              .to(
                layoutRef.current,
                {
                  ease: 'power2.inOut',
                  height: '100%',
                  opacity: 1,
                  duration: 0.5,
                },
                0.5,
              )
              .to(
                'header',
                {
                  ease: 'power2.inOut',
                  autoAlpha: 1,
                  duration: 0.5,
                },
                0.8,
              )
              .to(
                mainRef.current,
                {
                  ease: 'power2.inOut',
                  height: 'auto',
                  border: 'none',
                  pointerEvents: 'auto',
                  duration: 0.5,
                },
                0.8,
              );
          }, 100);
        },
      });

      exitTl
        .to('header', {
          ease: 'power2.inOut',
          autoAlpha: 0,
          duration: 0.5,
          onComplete: () => {
            gsap.set('#loader', {
              scale: 0.9,
              x: '100%',
              borderRadius: '1.3888888889vw',
            });
            gsap.set('header', {
              left: 0,
              top: 0,
              scale: 1,
              duration: 0,
            });
          },
          overwrite: true,
        })
        .to(
          layoutRef.current,
          {
            ease: 'power2.inOut',
            height: '90svh',
            opacity: 1,
            duration: 0.5,
          },
          0,
        )
        .to(
          mainRef.current,
          {
            ease: 'power2.inOut',
            scale: 0.9,
            opacity: 1,
            border: '2px solid #f0f4f1',
            borderRadius: '1.3888888889vw',
            duration: 0.5,
          },
          0,
        )
        .to(
          mainRef.current,
          {
            ease: 'power2.inOut',
            x: '-100%',
            duration: 0.5,
          },
          0.5,
        )
        .to(
          '#loader',
          {
            ease: 'power2.inOut',
            x: '0px',
            duration: 0.5,
          },
          0.5,
        )
        .set(mainRef.current, {
          x: '100%',
        });
    }
  }, [pathname, currentPath, introOut, isTransitioning, lenis, setIsLoading]);

  return (
    <div id="layout" ref={layoutRef}>
      <main ref={mainRef}>{children}</main>
    </div>
  );
}

export default Layout;
