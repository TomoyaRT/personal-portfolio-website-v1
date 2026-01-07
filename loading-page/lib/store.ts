import { create } from 'zustand';
import type Lenis from 'lenis';

interface StoreState {
  lenis: Lenis | undefined;
  setLenis: (lenis: Lenis) => void;
  introOut: boolean;
  setIntroOut: (introOut: boolean) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

export const useStore = create<StoreState>((set) => ({
  lenis: undefined,
  setLenis: (lenis) => set({ lenis }),
  introOut: false,
  setIntroOut: (introOut) => set({ introOut }),
  isLoading: true,
  setIsLoading: (isLoading) => set({ isLoading }),
}));
