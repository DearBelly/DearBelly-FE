import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FamilyCodeState {
  familyCode: string;
  isVerified: boolean;
  isError: boolean;
  isLoading: boolean;
  setFamilyCode: (code: string) => void;
  verify: () => Promise<boolean>;
  reset: () => void;
}

export const useFamilyCodeStore = create<FamilyCodeState>()(
  persist(
    (set, get) => ({
      familyCode: "",
      isVerified: false,
      isError: false,
      isLoading: false,

      setFamilyCode: (code) => {
        set({ familyCode: code, isVerified: false, isError: false });
      },

      verify: async () => {
        const { familyCode } = get();
        set({ isLoading: true });

        const ok = await new Promise<boolean>((resolve) => {
          setTimeout(() => {
            resolve(familyCode === "123456");
          }, 500);
        });

        set({
          isVerified: ok,
          isError: !ok,
          isLoading: false,
        });

        return ok;
      },

      reset: () => {
        set({
          familyCode: "",
          isVerified: false,
          isError: false,
          isLoading: false,
        });
      },
    }),
    {
      name: "dearbelly_family_code", 
      partialize: (s) => ({ isVerified: s.isVerified }),
    }
  )
);
