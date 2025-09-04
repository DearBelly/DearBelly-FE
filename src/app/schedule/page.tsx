'use client';

import './calendar.css';
import { useRouter } from 'next/navigation';
import { useGetBreakPointValue } from '@/context/BreakPointProvider';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useState } from 'react';
import ScheduleModal from '@/components/Modals/ScheduleModal';
import { MobileLayout } from '@/components/Layouts/MobileLayout';
import { Box, Text } from '@chakra-ui/react';

export default function CalendarPage() {
  const isPc = useGetBreakPointValue();
  const isMobile = !isPc;
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [scheduleList, setScheduleList] = useState<any[]>([]);

  const handleDateClick = (info: any) => {
    setSelectedDate(info.dateStr);
    setIsOpen(true);
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

  if (!isMobile) {
    return <h1>PC</h1>;
  }

  return (
    <MobileLayout hasSidePadding={false}>
      <Box display="flex" flexDirection="column" h="100%" mx="10px" mt="15px" mb="40px"
      css={{
        '& .fc .fc-daygrid-day': {
          backgroundColor: "bg.bg3",
        },
      }}>
        <FullCalendar
          height="100dvh"
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
            <Text textStyle="caption_97004">
              +{args.num}
            </Text>
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

      {isOpen && (
        <Box
          position="fixed"
          top="0"
          left="0"
          right="0"
          bottom="0"
          bg="rgba(0,0,0,0.5)"
          display="flex"
          alignItems="center"
          justifyContent="center"
          zIndex="9999"
          onClick={() => setIsOpen(false)}
        >
          <Box onClick={(e) => e.stopPropagation()}>
            <ScheduleModal
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
              date={selectedDate}
              scheduleList={scheduleList}          
              onAddSchedule={handleAddSchedule}
            />
          </Box>
        </Box>
      )}
    </MobileLayout>
  );
}
