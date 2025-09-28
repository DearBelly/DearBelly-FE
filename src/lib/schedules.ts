const API = process.env.NEXT_PUBLIC_API_BASE_URL;

export interface CreateScheduleRequest {
  schedule: string;
  startDate: string;
  endDate: string;
  color: "CALENDAR1" | "CALENDAR2" | "CALENDAR3" | "CALENDAR4" | "CALENDAR5";
}

export interface ScheduleResponse {
  id: number;
  schedule: string;
  startDate: string;
  endDate: string;
  color: string;
}

export async function createSchedule(data: CreateScheduleRequest): Promise<void> {
  const token = localStorage.getItem("token") || process.env.NEXT_PUBLIC_TEMP_TOKEN;
  
  const res = await fetch(`${API}/api/v1/schedules`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  
  if (!res.ok) {
    throw new Error("일정 등록 실패");
  }
  
  // API는 성공 응답만 반환하므로 데이터는 반환하지 않음
  return;
}

export async function fetchDailySchedules(date: string): Promise<ScheduleResponse[]> {
  const token = localStorage.getItem("token") || process.env.NEXT_PUBLIC_TEMP_TOKEN;
  
  const res = await fetch(`${API}/api/v1/schedules/daily?date=${date}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  
  if (!res.ok) {
    throw new Error("일정 조회 실패");
  }
  
  const json = await res.json();
  return json.data || [];
}

export async function fetchMonthlySchedules(year: number, month: number): Promise<ScheduleResponse[]> {
   const token = localStorage.getItem("token") || process.env.NEXT_PUBLIC_TEMP_TOKEN;
  const url = `${API}/api/v1/schedules/monthly?year=${year}&month=${month}`;
  
  console.log('API 호출 URL:', url);
  console.log('토큰:', token ? '있음' : '없음');
  
  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  
  console.log('API 응답 상태:', res.status);
  
  if (!res.ok) {
    throw new Error("월별 일정 조회 실패");
  }
  
  const json = await res.json();
  console.log('API 응답 데이터:', json);
  return json.data || [];
}

// 색상 매핑
export function mapColorToApiFormat(bgColor: string): "CALENDAR1" | "CALENDAR2" | "CALENDAR3" | "CALENDAR4" | "CALENDAR5" {
  const colorMap: Record<string, "CALENDAR1" | "CALENDAR2" | "CALENDAR3" | "CALENDAR4" | "CALENDAR5"> = {
    "bg.calendar1": "CALENDAR1",
    "bg.calendar2": "CALENDAR2", 
    "bg.calendar3": "CALENDAR3",
    "bg.calendar4": "CALENDAR4",
    "bg.calendar5": "CALENDAR5",
  };
  
  return colorMap[bgColor] || "CALENDAR1";
}

// API 색상을 UI 색상으로 변환
export function mapApiColorToUiFormat(apiColor: string): string {
  const colorMap: Record<string, string> = {
    "CALENDAR1": "bg.calendar1",
    "CALENDAR2": "bg.calendar2",
    "CALENDAR3": "bg.calendar3",
    "CALENDAR4": "bg.calendar4",
    "CALENDAR5": "bg.calendar5",
  };
  
  return colorMap[apiColor] || "bg.calendar1";
}

// ScheduleResponse를 FullCalendar 이벤트 형식으로 변환
export function convertToCalendarEvent(schedule: ScheduleResponse) {
  return {
    id: schedule.id.toString(),
    title: schedule.schedule,
    start: schedule.startDate,
    end: schedule.endDate,
    backgroundColor: mapApiColorToUiFormat(schedule.color),
  };
}
