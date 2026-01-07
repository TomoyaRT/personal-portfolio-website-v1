'use client';

import { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { EffectComposer } from '@react-three/postprocessing';
import Fluid from '@/components/canvas/fluid/Fluid';

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={mainRef}
      style={{
        width: '100vw',
        height: '100vh',
        position: 'relative',
        background: 'white',
      }}
    >
      {/* Centered Home Text */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '4rem',
          fontWeight: 'bold',
          color: '#000',
          zIndex: 1,
          userSelect: 'none',
        }}
      >
        Home
      </div>

      {/* Fluid Canvas */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 10,
          mixBlendMode: 'difference',
        }}
      >
        <Canvas
          eventSource={mainRef.current || undefined}
          style={{ width: '100%', height: '100%' }}
        >
          <EffectComposer>
            <Fluid mainRef={mainRef} fluidColor="#f0f4f1" />
          </EffectComposer>
        </Canvas>
      </div>
    </div>
  );
}
