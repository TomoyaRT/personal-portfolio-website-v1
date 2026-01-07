'use client';

import SplitType from 'split-type';
import gsap from 'gsap';
import styles from './loader.module.scss';
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';
import { useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useStore } from '@/lib/store';

function Loader() {
  const lenis = useStore((state) => state.lenis);
  const introOut = useStore((state) => state.introOut);
  const setIntroOut = useStore((state) => state.setIntroOut);
  const setIsLoading = useStore((state) => state.setIsLoading);

  const progressRef = useRef<HTMLHeadingElement>(null);
  const fullNameRef = useRef<HTMLHeadingElement>(null);
  const shortNameRef = useRef<HTMLHeadingElement>(null);
  const root = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useIsomorphicLayoutEffect(() => {
    let ctx: gsap.Context | undefined;
    if (!introOut) {
      ctx = gsap.context(() => {
        gsap.to(progressRef.current, {
          duration: 5,
          ease: 'power2.inOut',
          innerText: `${100}%`,
          roundProps: 'innerText',
          snap: {
            innerText: 1,
          },
          onComplete: () => {
            gsap.set('header', {
              autoAlpha: 0,
              ease: 'power2.inOut',
            });

            const splitted = new SplitType(fullNameRef.current as HTMLElement, {
              types: 'lines',
              tagName: 'span',
            });
            splitted.lines?.forEach((line) => {
              gsap.to(line, {
                ease: 'power4.inOut',
                top: '-12vw',
                duration: 1,
              });
            });
            gsap.to(shortNameRef.current, {
              opacity: 1,
            });
            const splittedShort = new SplitType(shortNameRef.current as HTMLElement, {
              types: 'lines',
              tagName: 'span',
            });
            splittedShort.lines?.forEach((line) => {
              gsap.to(line, {
                ease: 'power4.inOut',
                top: '0px',
                duration: 1,
              });
            });

            const splittedProgress = new SplitType(progressRef.current as HTMLElement, {
              types: 'lines',
              tagName: 'span',
            });
            splittedProgress.lines?.forEach((line) => {
              gsap.to(line, {
                ease: 'power4.inOut',
                top: '-12vw',
                duration: 1,
              });
            });
            lenis?.scrollTo(0, { force: true });
            gsap.set(document?.getElementById('layout'), {
              height: '90%',
            });

            gsap.set('main', {
              x: '100%',
              scale: 0.9,
              opacity: 1,
              border: '2px solid #f0f4f1',
              borderRadius: '1.3888888889vw',
            });

            gsap.to(root.current, {
              scale: 0.9,
              ease: 'power2.inOut',
              delay: 0.8,
              duration: 0.5,
              borderRadius: '1.3888888889vw',
            });
            gsap.to(root.current, {
              ease: 'power2.inOut',
              delay: 1.7,
              duration: 0.5,
              x: '-100%',
            });

            gsap.to('main', {
              ease: 'power2.inOut',
              delay: 1.7,
              duration: 0.5,
              x: '0px',
            });
            gsap.to('main', {
              ease: 'power2.inOut',
              delay: 2.2,
              duration: 0.5,
              scale: 1,
              borderRadius: 0,
            });
            gsap.to(document?.getElementById('layout'), {
              ease: 'power2.inOut',
              delay: 2.2,
              duration: 0.5,
              height: '100%',
            });
            gsap.to('header', {
              delay: 2.3,
              duration: 0.5,
              ease: 'power2.inOut',
              autoAlpha: 1,
            });
            gsap.to('main', {
              ease: 'power2.inOut',
              delay: 2.7,
              height: 'auto',
              border: 'none',
              pointerEvents: 'auto',
              onComplete: () => {
                setIntroOut(true);
                setIsLoading(false);
                lenis?.start();
              },
            });
          },
        });
      });
    } else if (ctx) {
      ctx.kill();
    }

    return () => {
      if (ctx) {
        ctx.kill();
      }
    };
  }, [lenis, introOut, setIntroOut, setIsLoading, pathname]);

  return (
    <div id="loader" ref={root} className={styles.root}>
      <div className={styles.innerContainer}>
        <div className={styles.fullNameContainer}>
          <h2 ref={fullNameRef} className={styles.fullName}>
            {introOut ? 'Loading' : 'Page Transition Demo'}
          </h2>
        </div>

        {!introOut && (
          <div className={styles.shortNameContainer}>
            <h2 ref={shortNameRef} className={styles.shortName}>
              Welcome
            </h2>
          </div>
        )}

        {!introOut && (
          <div className={styles.progressContainer}>
            <h1 ref={progressRef} className={styles.progress}>
              0%
            </h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default Loader;
