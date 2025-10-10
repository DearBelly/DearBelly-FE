'use client';

import { useEffect, useState, useCallback } from 'react';

type AuthState = boolean | null; // 초기 판별 전

export function useAuthToken() {
  const [isLogin, setIsLogin] = useState<AuthState>(null);

  const readToken = useCallback(() => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('token');
  }, []);

  const refreshAuth = useCallback(() => {
    setIsLogin(Boolean(readToken()));
  }, [readToken]);

  const setToken = useCallback((token: string) => {
    localStorage.setItem('token', token);
    refreshAuth();
  }, [refreshAuth]);

  const clearToken = useCallback(() => {
    localStorage.removeItem('token');
    refreshAuth();
  }, [refreshAuth]);

  useEffect(() => {
    // 초기 동기화
    refreshAuth();

    // 다른 탭/윈도우에서의 변경 감지
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'token') refreshAuth();
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [refreshAuth]);

  return {
    isLogin,          // 토큰 존재 여부만
    refreshAuth,      // 강제 동기화
    readToken,        // 현재 토큰 읽기
    setToken,         // 토큰 저장 + 동기화
    clearToken,       // 토큰 제거 + 동기화
  };
}
