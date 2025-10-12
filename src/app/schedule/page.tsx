"use client";

import "./calendar.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useState, useEffect, useCallback } from "react";
import { ScheduleModal } from "@/components/Modals/ScheduleModal";
import { MobileLayout } from "@/components/Layouts/MobileLayout";
import { Box, Text } from "@chakra-ui/react";
import { LoginModal } from "@/components/LoginModal/LoginModal";
import {
  createSchedule,
  mapColorToApiFormat,
  fetchMonthlySchedules,
  convertToCalendarEvent,
} from "@/lib/schedules";

export default function CalendarPage() {
  const [isLogin, setIsLogin] = useState(false);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [scheduleList, setScheduleList] = useState<any[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const token = localStorage.getItem("token") || process.env.NEXT_PUBLIC_TEMP_TOKEN;
    setIsLogin(!!token);
  }, []);

  const loadMonthlySchedules = useCallback(async () => {
    try {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 2; // 실제 월과 맞추기 위함
      const schedules = await fetchMonthlySchedules(year, month);
      const calendarEvents = schedules.map(convertToCalendarEvent);
      setScheduleList(calendarEvents);
    } catch (error) {
      console.error("월별 일정 조회 실패:", error);
      setScheduleList([]);
    }
  }, [currentDate]);

  useEffect(() => {
    if (isLogin) loadMonthlySchedules();
  }, [isLogin, loadMonthlySchedules]);

  const handleDateClick = (info: any) => {
    setSelectedDate(info.dateStr);
    setIsScheduleOpen(true);
  };

  const handleAddSchedule = async (name: string, bgColor: string) => {
    if (!selectedDate) return;
    try {
      const apiColor = mapColorToApiFormat(bgColor);
      await createSchedule({
        schedule: name,
        startDate: selectedDate,
        endDate: selectedDate,
        color: apiColor,
      });
      await loadMonthlySchedules();
    } catch (error) {
      console.error("일정 등록 실패:", error);
      alert("일정 등록에 실패했습니다. 다시 시도해주세요.");
      throw error;
    }
  };

  const handleDatesSet = (dateInfo: any) => {
    const newDate = new Date(dateInfo.start);
    setCurrentDate(newDate);
  };

  return (
    <MobileLayout hasSidePadding={false} disableNavPointer={isScheduleOpen || isLoginOpen}>
      <Box display="flex" justifyContent="center" w="100%" pt="15px" pb="40px">
        <Box w="100%" maxW="40rem" px="10px">
          <FullCalendar
            height="80dvh"
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{ left: "prev title next", center: "", right: "" }}
            locale="ko"
            expandRows={false}
            fixedWeekCount={false}
            dayMaxEventRows={4}
            eventOrder="start,-duration,title"
            dayCellContent={(arg) => ({ html: arg.date.getDate().toString() })}
            events={scheduleList}
            dateClick={handleDateClick}
            selectMirror
            datesSet={handleDatesSet}
            moreLinkContent={(args) => <Text textStyle="caption_97004">+{args.num}</Text>}
            eventContent={({ event }) => (
              <Box
                display="flex"
                alignItems="flex-start"
                bg={event.backgroundColor}
                textStyle="caption_97004"
                overflow="hidden"
                textOverflow="ellipsis"
                whiteSpace="nowrap"
                borderRadius="4px"
                px="3px"
                py="2px"
              >
                {event.title}
              </Box>
            )}
          />
        </Box>
      </Box>

      {isScheduleOpen && (
        <ScheduleModal
          isOpen={isScheduleOpen}
          onClose={() => setIsScheduleOpen(false)}
          date={selectedDate}
          onAddSchedule={
            isLogin
            ? handleAddSchedule                        
            : async () => { setIsLoginOpen(true); }   
          }
        />
      )}

      {isLoginOpen && <LoginModal onClose={() => setIsLoginOpen(false)} />}
    </MobileLayout>
  );
}
