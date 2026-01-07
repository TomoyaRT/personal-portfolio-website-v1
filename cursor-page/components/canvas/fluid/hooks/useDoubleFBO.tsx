import { useFBO } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

const useDoubleFBO = (width: number, height: number, options: any) => {
  const read = useFBO(width, height, options);
  const write = useFBO(width, height, options);

  const fbo = useRef({
    read,
    write,
    swap: () => {
      const temp = fbo.current.read;
      fbo.current.read = fbo.current.write;
      fbo.current.write = temp;
    },
    dispose: () => {
      fbo.current.read.dispose();
      fbo.current.write.dispose();
    },
  });

  return fbo.current;
};
export default useDoubleFBO;
