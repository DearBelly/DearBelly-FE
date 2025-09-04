import { create } from "zustand";
import { persist } from "zustand/middleware";

interface NicknameStore {
  nickname: string;
  setNickname: (nickname: string) => void;
  clearNickname: () => void;
}

export const useNicknameStore = create<NicknameStore>()(
  persist(
    (set) => ({
      nickname: "",
      setNickname: (nickname) => set({ nickname }),
      clearNickname: () => set({ nickname: "" }),
    }),
    {
      name: "dearbelly_nickname", 
    }
  )
);
