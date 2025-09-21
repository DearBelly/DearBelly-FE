import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CategoryId =
  | "HEALTH"
  | "FINANCIAL"
  | "PREGNANCY_PLANNING"
  | "CHILD"
  | "EMOTIONAL";

export type SignupStep = 1 | 2 | 3 | 4;

export interface SignupData {
  nickname: string;
  profileImageFile?: File;
  profileImage?: string;

  isPregnant: boolean;
  isExpectingMother: boolean;
  LMP?: string;
  gender: string;
  birth: string;

  interestingInformation: CategoryId[];
  familyCode?: string;
  isVerified: boolean;
}

interface SignupStore {
  step: SignupStep;
  data: SignupData;

  setData: (info: Partial<SignupData>) => void;
  nextStep: () => void;
  prevStep: () => void;
  reset: () => void;
}

const initialData: SignupData = {
  nickname: "",
  profileImage: undefined,
  isPregnant: true,
  isExpectingMother: false,
  LMP: "",
  gender: "",
  birth: "",
  interestingInformation: [],
  familyCode: undefined,
  isVerified: false,
};

export const useSignupStore = create<SignupStore>()(
  persist(
    (set) => ({
      step: 1,
      data: initialData,
      setData: (info) =>
        set((state) => ({ data: { ...state.data, ...info } })),
      nextStep: () =>
        set((state) => ({ step: Math.min(state.step + 1, 4) as SignupStep })),
      prevStep: () =>
        set((state) => ({ step: Math.max(state.step - 1, 1) as SignupStep })),
      reset: () => set({ step: 1, data: initialData }),
    }),
    { name: "dearbelly-info" }
  )
);
