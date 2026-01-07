import { forwardRef, useMemo } from 'react';

import FluidEffect from '@/components/canvas/fluid/effect/FluidEffect';
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';

interface FluidEffectWrapperProps {
  intensity?: number;
  fluidColor?: string;
  backgroundColor?: string;
  showBackground?: boolean;
  tFluid?: any;
}

const FluidEffectWrapper = forwardRef<any, FluidEffectWrapperProps>((props, ref) => {
  const effect = useMemo(() => new FluidEffect(props), [JSON.stringify(props)]);

  useIsomorphicLayoutEffect(
    () => () => {
      if (effect) effect.dispose();
    },
    [effect],
  );

  return <primitive ref={ref} object={effect} />;
});

FluidEffectWrapper.displayName = 'FluidEffectWrapper';

export default FluidEffectWrapper;
