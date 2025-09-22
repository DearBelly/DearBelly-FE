// app/login/success/page.tsx
"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function NaverCallback() {
  const params = useSearchParams();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const code = params.get("code");
    const state = params.get("state");

    if (!code || !state) {
      setError("네이버 로그인에 실패했습니다.");
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/naver?code=${code}&state=${state}`, {
      method: "POST",
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("서버 오류");
        return res.json();
      })
      .then((data) => {
        if (!data.success) throw new Error(data.message || "로그인 실패");
        localStorage.setItem("accessToken", data.data.accessToken);
        router.replace("/profile/setup");
      })
      .catch((err) => {
        console.error(err);
        setError("로그인 처리 중 오류가 발생했습니다.");
      });
  }, [params, router]);

  if (error) return <div>{error}</div>;
  return <div>로그인 처리 중...</div>;
}
