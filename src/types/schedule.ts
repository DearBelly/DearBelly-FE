export type ApiColor = "CALENDAR1" | "CALENDAR2" | "CALENDAR3" | "CALENDAR4" | "CALENDAR5";

export interface ScheduleRequest {
  schedule: string;
  startDate: string; // YYYY-MM-DD
  endDate: string;   // YYYY-MM-DD
  color: ApiColor;
}

export interface ScheduleResponse {
  id: number;
  schedule: string;
  startDate: string;
  endDate: string;
  color: ApiColor | string; 
}
