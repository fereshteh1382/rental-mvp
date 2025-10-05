import { create } from "zustand";

type UiState = {
  isSignupOpen: boolean;
  openSignup: () => void;
  closeSignup: () => void;
};

export const useUiStore = create<UiState>((set) => ({
  isSignupOpen: false,
  openSignup: () => set({ isSignupOpen: true }),
  closeSignup: () => set({ isSignupOpen: false }),
}));
