"use client";

import { useState, useEffect } from "react";

export function useSSE() {
  const [data, setData] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token available.");
      return;
    }

    // SSE 연결을 위한 EventSource 객체 생성
    const eventSource = new EventSource(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/sse/connect?Authorization=Bearer ${token}`
    );

    // 서버에서 보낸 데이터를 처리하는 이벤트 핸들러
    eventSource.onmessage = (event) => {
      setData(event.data); // 서버에서 전달하는 이벤트 데이터
    };

    eventSource.onerror = () => {
      setError("Failed to connect to SSE.");
    };

    // 컴포넌트가 언마운트 될 때 SSE 연결을 종료
    return () => {
      eventSource.close();
    };
  }, []); // 빈 배열로, 컴포넌트가 처음 마운트될 때만 실행되도록 설정

  return { data, error }; // 서버에서 받은 데이터와 에러를 반환
}
