"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Box, Text } from "@chakra-ui/react";

export default function KakaoCallback() {
  const router = useRouter();
  const params = useSearchParams();

  const code = params.get("code"); 
  const state = params.get("state"); 

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!code) {
      setError("Invalid code.");
      return;
    }

    const fetchKakaoToken = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/kakao?code=${code}&state=${state}`, {
          method: "POST",
          credentials: "include",
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error("Token exchange failed.");
        }

        localStorage.setItem("accessToken", data.accessToken);
        
        router.push("/profile/setup");  
      } catch (error) {
        setError("Login failed. Please try again.");
        console.error("Kakao login error:", error);
      }
    };

    fetchKakaoToken();
  }, [code, state, router]);

  return (
    <Box textAlign="center" mt="20px">
      {error ? (
        <Text color="red.500">{error}</Text>
      ) : (
        <Text>로그인 처리 중...</Text>
      )}
    </Box>
  );
}
