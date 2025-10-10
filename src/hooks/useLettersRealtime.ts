'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { EventSourcePolyfill } from 'event-source-polyfill';
import { isInTodayWindowKST } from '@/lib/timeKST';

export type LettersEvent = 'unread' | 'today' | 'family' | 'message' | 'heartbeat';
export type IconToShow = 'none' | 'family-letter' | 'today-letter';

type UnreadPayload = { unreadExist: boolean };

const FIVE_MIN_MS = 5 * 60 * 1000;
const ONE_MIN_MS = 60 * 1000;

function decideIcon(now: Date): IconToShow {
  return isInTodayWindowKST(now) ? 'today-letter' : 'family-letter';
}

export function useLettersRealtime() {
  const [letterIcon, setLetterIcon] = useState<IconToShow>('none');
  const [hasUnread, setHasUnread] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const esRef = useRef<EventSourcePolyfill | null>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearHideTimer = () => {
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
  };

  const showIconForOneMinute = useCallback(() => {
    setLetterIcon(decideIcon(new Date()));
    clearHideTimer();
    hideTimerRef.current = setTimeout(() => setLetterIcon('none'), ONE_MIN_MS);
  }, []);

  /** 5분 폴링: unread가 존재하면 1분간 아이콘 표시 */
  const startPolling = useCallback(() => {
    const base = process.env.NEXT_PUBLIC_API_BASE_URL!;
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const headers: HeadersInit = token
      ? { Authorization: `Bearer ${token}`, Accept: 'application/json' }
      : { Accept: 'application/json' };

    async function checkUnreadOnce() {
      try {
        const res = await fetch(`${base}/api/v1/letters/check`, { headers });
        if (!res.ok) return;
        const json = (await res.json()) as { unreadExist?: boolean; data?: { isUnreadExist?: boolean } };
        // 백엔드 공통 래퍼를 고려( CommonResponse )해서 두 형태 모두 수용
        const unread =
          typeof json.unreadExist === 'boolean'
            ? json.unreadExist
            : Boolean(json.data?.isUnreadExist);

        setHasUnread(unread);

        if (unread) {
          showIconForOneMinute();
        }
      } catch {
        /* 네트워크 실패는 무시하고 다음 주기 */
      }
    }

    // 즉시 1회 실행 + 5분 주기
    checkUnreadOnce();
    pollRef.current = setInterval(checkUnreadOnce, FIVE_MIN_MS);
  }, [showIconForOneMinute]);

  /** SSE 연결: 이벤트 수신 시 1분간 배너 표시 */
  const startSSE = useCallback(() => {
    const base = process.env.NEXT_PUBLIC_API_BASE_URL!;
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (!token) {
      setError('No token for SSE');
      return;
    }

    const lastId = localStorage.getItem('sse:lastEventId') || undefined;
    const headers: Record<string, string> = { Authorization: `Bearer ${token}` };
    if (lastId) headers['Last-Event-ID'] = lastId;

    const es = new EventSourcePolyfill(`${base}/api/v1/sse/connect`, {
      headers,
      withCredentials: false,
      heartbeatTimeout: 60_000,
    } as any);

    const saveLastId = (e: MessageEvent & { lastEventId?: string }) => {
      if (e.lastEventId) localStorage.setItem('sse:lastEventId', e.lastEventId);
    };

    const handleAnyTrigger = () => {
      // 이벤트가 오면 배너 1분 표시 (KST 00:00~00:10이면 today-letter)
      showIconForOneMinute();
      // unread 존재 여부도 긍정적으로 세팅(UX용)
      setHasUnread(true);
    };

    es.onmessage = (e: MessageEvent) => {
      saveLastId(e as any);
      try {
        const payload = JSON.parse(e.data) as UnreadPayload | Record<string, unknown>;
        if (typeof (payload as UnreadPayload).unreadExist === 'boolean') {
          setHasUnread((payload as UnreadPayload).unreadExist);
          if ((payload as UnreadPayload).unreadExist) handleAnyTrigger();
        } else {
          handleAnyTrigger();
        }
      } catch {
        handleAnyTrigger();
      }
    };

    const onUnread = (e: MessageEvent) => {
      saveLastId(e as any);
      try {
        const payload = JSON.parse(e.data) as UnreadPayload;
        setHasUnread(!!payload.unreadExist);
        if (payload.unreadExist) handleAnyTrigger();
      } catch {
        handleAnyTrigger();
      }
    };
    const onFamily = (e: MessageEvent) => {
      saveLastId(e as any);
      handleAnyTrigger();
    };
    const onToday = (e: MessageEvent) => {
      saveLastId(e as any);
      handleAnyTrigger();
    };

    es.addEventListener('unread', onUnread);
    es.addEventListener('family', onFamily);
    es.addEventListener('today', onToday);

    es.onerror = () => {
      setError('SSE connection error');
      // 자동 재연결은 polyfill이 처리
    };

    esRef.current = es;
  }, [showIconForOneMinute]);

  useEffect(() => {
    startSSE();
    startPolling();

    // 탭 비활성 → 활성 시 즉시 1회 폴링(상태 신선도)
    const onVisible = () => {
      if (document.visibilityState === 'visible') {
        // 즉시 배지 최신화
        const base = process.env.NEXT_PUBLIC_API_BASE_URL!;
        const token = localStorage.getItem('token');
        const headers: HeadersInit = token
          ? { Authorization: `Bearer ${token}`, Accept: 'application/json' }
          : { Accept: 'application/json' };
        fetch(`${base}/api/v1/letters/check`, { headers })
          .then((r) => (r.ok ? r.json() : null))
          .then((j) => {
            if (!j) return;
            const unread =
              typeof j.unreadExist === 'boolean'
                ? j.unreadExist
                : Boolean(j.data?.isUnreadExist);
            setHasUnread(unread);
          })
          .catch(() => {});
      }
    };
    document.addEventListener('visibilitychange', onVisible);

    return () => {
      document.removeEventListener('visibilitychange', onVisible);
      if (esRef.current) esRef.current.close();
      if (pollRef.current) clearInterval(pollRef.current);
      clearHideTimer();
    };
  }, [startPolling, startSSE]);

  return { letterIcon, hasUnread, error };
}
