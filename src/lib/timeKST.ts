export const KST_TZ = 'Asia/Seoul' as const;

// 현재 시각이 KST 00:00 ~ 00:10 범위인지 검사
export function isInTodayWindowKST(now: Date = new Date()): boolean {
  const parts = new Intl.DateTimeFormat('ko-KR', {
    timeZone: KST_TZ,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(now);

  const hh = Number(parts.find((p) => p.type === 'hour')?.value ?? '0');
  const mm = Number(parts.find((p) => p.type === 'minute')?.value ?? '0');

  return hh === 0 && mm < 10;
}
