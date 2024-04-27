import { create } from "zustand";

interface RegisterStore {
  email: string;
  nickname: string;
  color: string;
  image: string;
  setData: (key: string, value: string) => void;
}

export const useRegisterStore = create<RegisterStore>((set) => ({
  email: "",
  nickname: "",
  color: "",
  image: "",
  setData: (key: string, value: string) => set(() => ({ [key]: value })),
}));
