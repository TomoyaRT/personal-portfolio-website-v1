import { useEffect, useRef, MutableRefObject } from 'react';
import { Vector2 } from 'three';

interface SplatData {
  mouseX: number;
  mouseY: number;
  velocityX: number;
  velocityY: number;
}

const usePointerEvents = (
  mainRef: MutableRefObject<HTMLElement | null>,
  size: { width: number; height: number },
  force: number
) => {
  const splatStack = useRef<SplatData[]>([]);
  const lastMouse = useRef(new Vector2());
  const hasMoved = useRef(false);

  useEffect(() => {
    if (!mainRef.current) {
      console.error('Main reference is not initialized');
      return undefined;
    }

    const element = mainRef.current;

    const handlePointerMove = (event: PointerEvent | TouchEvent) => {
      const clientX = (event as PointerEvent).clientX || (event as TouchEvent).touches?.[0]?.clientX;
      const clientY = (event as PointerEvent).clientY || (event as TouchEvent).touches?.[0]?.clientY;

      if (clientX === undefined || clientY === undefined) return;

      const deltaX = clientX - lastMouse.current.x;
      const deltaY = clientY - lastMouse.current.y;

      if (!hasMoved.current) {
        hasMoved.current = true;
        lastMouse.current.set(clientX, clientY);
        return;
      }

      lastMouse.current.set(clientX, clientY);

      splatStack.current.push({
        mouseX: clientX / size.width,
        mouseY: 1.0 - clientY / size.height,
        velocityX: deltaX * force,
        velocityY: -deltaY * force,
      });
    };

    element.addEventListener('pointermove', handlePointerMove as EventListener, { passive: true });

    return () => {
      element.removeEventListener('pointermove', handlePointerMove as EventListener);
    };
  }, [mainRef, size, force]);

  return splatStack;
};

export default usePointerEvents;
