import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface ProfileData {
  nickname: string;
  profileImage?: string;
}

interface ProfileStore {
  data: ProfileData;
  setProfile: (info: Partial<ProfileData>) => void;
  reset: () => void;
}

const initialData: ProfileData = {
  nickname: "",
  profileImage: undefined,
};

export const useProfileStore = create<ProfileStore>()(
  persist(
    (set) => ({
      data: initialData,
      setProfile: (info) =>
        set((state) => ({ data: { ...state.data, ...info } })),
      reset: () => set({ data: initialData }),
    }),
    { name: "dearbelly-profile" }
  )
);
