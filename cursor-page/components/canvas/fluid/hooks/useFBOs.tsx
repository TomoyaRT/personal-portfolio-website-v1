import * as THREE from 'three';

import useDoubleFBO from '@/components/canvas/fluid/hooks/useDoubleFBO';
import { useFBO } from '@react-three/drei';
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';
import { useMemo } from 'react';
import useOpts from '@/components/canvas/fluid/hooks/useOpts';

const useFBOs = () => {
  const OPTS = useOpts();

  const density = useDoubleFBO(OPTS.dyeRes, OPTS.dyeRes, {
    samples: 0,
    type: THREE.HalfFloatType,
    format: THREE.RGBAFormat,
    minFilter: THREE.LinearFilter,
  });

  const velocity = useDoubleFBO(OPTS.simRes, OPTS.simRes, {
    samples: 0,
    type: THREE.HalfFloatType,
    format: THREE.RGFormat,
    minFilter: THREE.LinearFilter,
  });

  const pressure = useDoubleFBO(OPTS.simRes, OPTS.simRes, {
    samples: 0,
    type: THREE.HalfFloatType,
    format: THREE.RedFormat,
    minFilter: THREE.NearestFilter,
  });

  const divergence = useFBO(OPTS.simRes, OPTS.simRes, {
    samples: 0,
    type: THREE.HalfFloatType,
    format: THREE.RedFormat,
    minFilter: THREE.NearestFilter,
  });

  const curl = useFBO(OPTS.simRes, OPTS.simRes, {
    samples: 0,
    type: THREE.HalfFloatType,
    format: THREE.RedFormat,
    minFilter: THREE.NearestFilter,
  });

  const FBOs = useMemo(
    () => ({
      density,
      velocity,
      pressure,
      divergence,
      curl,
    }),
    [curl, density, divergence, pressure, velocity],
  );

  useIsomorphicLayoutEffect(
    () => () => {
      Object.values(FBOs).forEach((FBO: any) => FBO.dispose());
    },
    [FBOs],
  );

  return FBOs;
};
export default useFBOs;
