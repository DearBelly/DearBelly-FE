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
      const token = localStorage.getItem("token") || process.env.NEXT_PUBLIC_TEMP_TOKEN; 
  
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/family-code/join`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ code }),
      });
  
      if (!res.ok) {
        set({ isVerified: false, isError: true, isLoading: false });
        return false;
      }
  
      const data = await res.json();
  
      if (data.success) {
        set({ isVerified: true, isError: false, isLoading: false });
        return true;
      } else {
        set({ isVerified: false, isError: true, isLoading: false });
        return false;
      }
    } catch (e) {
      console.error("가족 코드 검증 요청 실패", e);
      set({ isVerified: false, isError: true, isLoading: false });
      return false;
    }
  }, 
  reset: () => set({ isVerified: false, isError: false, isLoading: false }),
}));
