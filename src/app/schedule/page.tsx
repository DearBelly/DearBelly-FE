'use client';

import './calendar.css';
import { useRouter } from 'next/navigation';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useState, useEffect } from 'react';
import ScheduleModal from '@/components/Modals/ScheduleModal';
import { MobileLayout } from '@/components/Layouts/MobileLayout';
import { Box, Text } from '@chakra-ui/react';
import { LoginModal } from '@/components/LoginModal/LoginModal';

export default function CalendarPage() {
  const router = useRouter();

  const [isLogin, setIsLogin] = useState(false);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [scheduleList, setScheduleList] = useState<any[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLogin(!!token);
  }, []);

  const handleDateClick = (info: any) => {
    setSelectedDate(info.dateStr);

    if (isLogin) {
      setIsScheduleOpen(true); 
    } else {
      setIsLoginOpen(true); 
    }
  };

  const handleAddSchedule = (name: string, bgColor: string) => {
    setScheduleList((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        title: name,
        start: selectedDate,
        backgroundColor: bgColor,
      },
    ]);
  };

  return (
    <MobileLayout hasSidePadding={false}>
      <Box display="flex" justifyContent="center" w="100%" pt="15px" pb="40px">
        <Box w="100%" maxW="40rem" px="10px">
          <FullCalendar
            height="auto"
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
              left: 'prev',
              center: 'title',
              right: 'next',
            }}
            locale="ko"
            expandRows={true}
            dayMaxEvents={3}
            events={scheduleList}
            dateClick={handleDateClick}
            moreLinkContent={(args) => (
              <Text textStyle="caption_97004">+{args.num}</Text>
            )}
            eventContent={({ event }) => (
              <Box
                display="flex"
                alignItems="flex-start"
                bg={event.backgroundColor}
                borderRadius="4px"
                px="1px"
                py="2px"
                textStyle="caption_97004"
                overflow="hidden"
                textOverflow="ellipsis"
                whiteSpace="nowrap"
              >
                {event.title}
              </Box>
            )}
          />
        </Box>
      </Box>

      {/* 일정 추가 모달 */}
      {isScheduleOpen && (
        <Box
          position="fixed"
          top="0"
          left="0"
          right="0"
          bottom="0"
          w="100%"
          bg="rgba(0,0,0,0.5)"
          display="flex"
          alignItems="center"
          justifyContent="center"
          zIndex="9999"
          onClick={() => setIsScheduleOpen(false)}
        >
          <Box onClick={(e) => e.stopPropagation()}>
            <ScheduleModal
              isOpen={isScheduleOpen}
              onClose={() => setIsScheduleOpen(false)}
              date={selectedDate}
              scheduleList={scheduleList}
              onAddSchedule={handleAddSchedule}
            />
          </Box>
        </Box>
      )}

      {/* 로그인 모달 */}
      {isLoginOpen && (
        <LoginModal />
      )}
    </MobileLayout>
  );
}
