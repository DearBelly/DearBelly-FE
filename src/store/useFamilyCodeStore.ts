import { create } from "zustand";

type ApiBase<T = unknown> = {
  httpStatus: number;
  message: string;
  data: T;
  success: boolean;
};

interface FamilyCodeState {
  isVerified: boolean;
  isLoading: boolean;
  isError: boolean;
  errorMessage: string | null;
  verify: (code: string) => Promise<boolean>;
  reset: () => void;
}

export const useFamilyCodeStore = create<FamilyCodeState>(() => {
  let aborter: AbortController | null = null;

  return {
    isVerified: false,
    isError: false,
    isLoading: false,
    errorMessage: null,

    verify: async (code: string) => {
      aborter?.abort();
      aborter = new AbortController();

      useFamilyCodeStore.setState({
        isLoading: true,
        isError: false,
        errorMessage: null,
      });

      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("로그인이 필요합니다.");
        }

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/family-code/join`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
            credentials: "include",
            body: JSON.stringify({ code }),
            signal: aborter.signal,
          }
        );

        const json = (await res.json().catch(() => null)) as ApiBase | null;

        if (!res.ok) {
          const msg = json?.message || `가족 코드 참여 실패 (HTTP ${res.status})`;
          throw new Error(msg);
        }

        const success = !!json?.success;
        useFamilyCodeStore.setState({
          isVerified: success,
          isError: !success,
          isLoading: false,
          errorMessage: success ? null : json?.message || "인증에 실패했습니다.",
        });
        return success;
      } catch (e: unknown) {
        if ((e as any)?.name === "AbortError") {
          return false;
        }
        const message =
          (e as Error)?.message ?? "인증에 실패했습니다.";
        console.error("가족 코드 검증 요청 실패", e);
        useFamilyCodeStore.setState({
          isVerified: false,
          isError: true,
          isLoading: false,
          errorMessage: message,
        });
        return false;
      }
    },

    reset: () => {
      aborter?.abort();
      useFamilyCodeStore.setState({
        isVerified: false,
        isError: false,
        isLoading: false,
        errorMessage: null,
      });
    },
  };
});
