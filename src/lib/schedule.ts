import type { ScheduleRequest, ScheduleResponse, ApiColor } from "@/types/schedule";

const API = process.env.NEXT_PUBLIC_API_BASE_URL;
if (!API) throw new Error("ENV 누락: NEXT_PUBLIC_API_BASE_URL");

const getToken = (): string | undefined => {
  if (typeof window === "undefined") return undefined;
  return (
    localStorage.getItem("token")
    || undefined
  );
};

const apiFetch = async (path: string, init: RequestInit = {}) => {
  const token = getToken();

  const hasBody = typeof init.body !== "undefined";
  const headers: HeadersInit = {
    ...(hasBody ? { "Content-Type": "application/json" } : {}),
    ...(init.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const res = await fetch(`${API}${path}`, {
    cache: "no-store",
    credentials: "include", 
    ...init,
    headers,
  });

  if (!res.ok) {
    let serverMsg = "";
    try {
      const j = await res.json();
      serverMsg = typeof j === "string" ? j : JSON.stringify(j);
    } catch {}
    throw new Error(`${init.method || "GET"} ${path} 실패 (${res.status}) ${serverMsg}`);
  }
  return res;
};

export const uiBgColors = [
  "bg.calendar1",
  "bg.calendar2",
  "bg.calendar3",
  "bg.calendar4",
  "bg.calendar5",
] as const;
export type UiBgColor = (typeof uiBgColors)[number];

const toApiColor = {
  "bg.calendar1": "CALENDAR1",
  "bg.calendar2": "CALENDAR2",
  "bg.calendar3": "CALENDAR3",
  "bg.calendar4": "CALENDAR4",
  "bg.calendar5": "CALENDAR5",
} as const satisfies Record<UiBgColor, ApiColor>;

const toUiColor = {
  CALENDAR1: "bg.calendar1",
  CALENDAR2: "bg.calendar2",
  CALENDAR3: "bg.calendar3",
  CALENDAR4: "bg.calendar4",
  CALENDAR5: "bg.calendar5",
} as const;

export const mapColorToApiFormat = (bgColor: string): ApiColor => {
  if ((uiBgColors as readonly string[]).includes(bgColor)) {
    return toApiColor[bgColor as UiBgColor];
  }
  return "CALENDAR1";
};

export const mapApiColorToUiFormat = (apiColor: string): UiBgColor => {
  const key = apiColor as keyof typeof toUiColor;
  return toUiColor[key] ?? "bg.calendar1";
};

export const convertToCalendarEvent = (s: ScheduleResponse) => ({
  id: String(s.id),
  title: s.schedule,
  start: s.startDate,
  end: s.endDate,
  backgroundColor: mapApiColorToUiFormat(String(s.color)),
});

export async function createSchedule(data: ScheduleRequest): Promise<void> {
  await apiFetch(`/api/v1/schedules`, { method: "POST", body: JSON.stringify(data) });
}

export async function updateSchedule(id: number, data: ScheduleRequest): Promise<void> {
  await apiFetch(`/api/v1/schedules/${id}`, { method: "PATCH", body: JSON.stringify(data) });
}

export async function deleteSchedule(id: number): Promise<void> {
  await apiFetch(`/api/v1/schedules/${id}`, { method: "DELETE" });
}

export async function fetchDailySchedules(date: string): Promise<ScheduleResponse[]> {
  const res = await apiFetch(`/api/v1/schedules/daily?date=${date}`);
  const json = await res.json();
  return json.data || [];
}

export async function fetchMonthlySchedules(year: number, month: number): Promise<ScheduleResponse[]> {
  const res = await apiFetch(`/api/v1/schedules/monthly?year=${year}&month=${month}`);
  const json = await res.json();
  return json.data || [];
}
