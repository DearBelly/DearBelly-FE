export type ScheduleRequest = {
  schedule: string;
  startDate: string;
  endDate: string;
  color: "CALENDAR1" | "CALENDAR2" | "CALENDAR3" | "CALENDAR4" | "CALENDAR5" | "CALENDAR6";
};
  
export type ScheduleResponse = {
  scheduleId: number;
  schedule: string;
  startDate: string;
  endDate: string;
  color: string;
};
  