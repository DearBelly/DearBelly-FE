import { ScheduleRequest } from "@/types/Schedule";
const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

const getToken = () => {
  return localStorage.getItem("token") || process.env.NEXT_PUBLIC_TEMP_TOKEN;
};

// 일정 등록
export const createSchedule = async (schedule: ScheduleRequest) => {
  const response = await fetch(`${API_BASE}/api/v1/schedules`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(schedule),
  });

  if (!response.ok) throw new Error("일정 등록 실패");
  return await response.json();
};

// 일정 수정
export const updateSchedule = async (
  scheduleId: number,
  schedule: ScheduleRequest
) => {
  const response = await fetch(`${API_BASE}/api/v1/schedules/${scheduleId}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(schedule),
  });

  if (!response.ok) throw new Error("일정 수정 실패");
  return await response.json();
};

// 일정 삭제
export const deleteSchedule = async (scheduleId: number) => {
  const response = await fetch(`${API_BASE}/api/v1/schedules/${scheduleId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  if (!response.ok) throw new Error("일정 삭제 실패");
  return await response.json();
};

// 일정 상세 조회
export const getScheduleDetail = async (scheduleId: number) => {
  const response = await fetch(`${API_BASE}/api/v1/schedules/${scheduleId}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  if (!response.ok) throw new Error("일정 조회 실패");
  return await response.json();
};

// 일별 일정 조회
export const getDailySchedules = async (date: string) => {
  const response = await fetch(`${API_BASE}/api/v1/schedules/daily?date=${date}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  if (!response.ok) throw new Error("일일 일정 조회 실패");
  return await response.json();
};

// 월별 일정 조회
export const getMonthlySchedules = async (year: number, month: number) => {
  const response = await fetch(
    `${API_BASE}/api/v1/schedules/monthly?year=${year}&month=${month}`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  if (!response.ok) throw new Error("월간 일정 조회 실패");
  return await response.json();
};
