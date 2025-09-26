// app/login/success/page.tsx
"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function LoginSuccessPage() {
  const params = useSearchParams();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const onceRef = useRef(false);

  useEffect(() => {
    if (onceRef.current) return;
    onceRef.current = true;

    const code = params.get("code");
    const state = params.get("state");

    if (!code || !state) {
      setError("네이버 로그인에 실패했습니다. (code/state 없음)");
      return;
    }

    (async () => {
      try {
        const API = process.env.NEXT_PUBLIC_API_BASE_URL!;
        const url =
          `${API}/api/v1/auth/naver?code=${encodeURIComponent(code)}&state=${encodeURIComponent(state)}`;

        const res = await fetch(url, {
          method: "POST",
          credentials: "include", // Refresh 쿠키 저장 필수
        });

        // (옵션) 디버그: 바디 확인
        const clone = res.clone();
        console.log("status", res.status);
        console.log("content-type", res.headers.get("content-type"));
        console.log("body", await clone.json().catch(async () => await res.text()));

        if (!res.ok) throw new Error("네이버 토큰 교환 실패");

        const data = await res.json();
        if (!data?.accessToken) throw new Error("accessToken 없음");

        localStorage.setItem("accessToken", data.accessToken);

        // URL에서 code/state 제거
        router.replace("/profile/setup");
      } catch (e) {
        console.error(e);
        setError("로그인 처리 중 오류가 발생했습니다.");
      }
    })();
  }, [params, router]);

  if (error) return <div>{error}</div>;
  return <div>로그인 처리 중...</div>;
}
