import { create } from "zustand";

interface FamilyCodeState {
  isVerified: boolean;
  isError: boolean;
  isLoading: boolean;
  verify: (code: string) => Promise<boolean>;
  reset: () => void;
}

export const useFamilyCodeStore = create<FamilyCodeState>((set) => ({
  isVerified: false,
  isError: false,
  isLoading: false,

  verify: async (code: string) => {
    set({ isLoading: true });

    try {
      // 여기서 실제 서버 API 호출
      // const res = await fetch("/api/verify-family", { method: "POST", body: JSON.stringify({ code }) });
      // const ok = res.ok;

      // 지금은 mock
      const ok = await new Promise<boolean>((resolve) => {
        setTimeout(() => resolve(code === "123456"), 500);
      });

      set({ isVerified: ok, isError: !ok, isLoading: false });
      return ok;
    } catch (e) {
      set({ isVerified: false, isError: true, isLoading: false });
      return false;
    }
  },

  reset: () => set({ isVerified: false, isError: false, isLoading: false }),
}));
