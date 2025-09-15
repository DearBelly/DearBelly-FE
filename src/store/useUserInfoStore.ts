import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface UserInfo {
  nickname: string;
  isPregnant: boolean;
  isExpectingMother?: boolean;
  LMP?: string;
  gender: string;
  birth: string;
  interestingInformation: string[]; 
  familyCode?: string;
  isVerifiedFamilyMembers: boolean;
}

interface UserInfoStore {
  data: UserInfo;
  setUserInfo: (info: Partial<UserInfo>) => void;
  reset: () => void;
  fetch: () => Promise<void>;
}

const initialState: UserInfo = {
  nickname: "",
  isPregnant: true,
  isExpectingMother: false,
  LMP: "",
  gender: "",
  birth: "",
  interestingInformation: [],
  familyCode: undefined,
  isVerifiedFamilyMembers: false,
};

export const useUserInfoStore = create<UserInfoStore>()(
  persist(
    (set) => ({
      data: initialState,
      setUserInfo: (info) =>
        set((state) => ({ data: { ...state.data, ...info } })),
      reset: () => set({ data: initialState }),
      fetch: async () => {
        try {
          const res = await fetch("/api/user/me");
          if (!res.ok) throw new Error("Failed to fetch user info");
          const data: UserInfo = await res.json();
          set({ data });
        } catch (err) {
          console.error(err);
          set({ data: initialState });
        }
      },
    }),
    { name: "dearbelly-user" }
  )
);
