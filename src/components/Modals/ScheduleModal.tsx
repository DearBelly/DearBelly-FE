'use client';

import { Box, Text } from "@chakra-ui/react";
import { useState } from "react";
import { ChakraIcons } from "@/utils/withChakraIcon";
import { Button } from "../Button/Button";
import { ScheduleBottomSheet } from "../BottomSheet/ScheduleSheet";
import { format } from "date-fns";
import { ko } from "date-fns/locale";


interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  date: string | null;
  scheduleList: any[];
  onAddSchedule: (name: string, bgColor: string) => void;
}

export default function ScheduleModal({
  isOpen,
  onClose,
  date,
  scheduleList,
  onAddSchedule,
}: ScheduleModalProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  if (!isOpen) return null;

  // 선택한 날짜에 해당하는 일정만 필터링
  const dailySchedules = scheduleList.filter((s) => s.start === date);

  const handleDateFormat = (date: string) => {
    return format(new Date(date), "M월 d일 (E)", { locale: ko });
  };

  return (
    <>
      <Box
        w="76dvw"
        maxW="35rem"
        h="28.625rem"
        bg="bg.bg3"
        borderRadius="20px"
        px="1rem"
        py="28px"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <Text textStyle="body_168001" color="text.text1">
          {date ? `${handleDateFormat(date)}` : "날짜 없음"}
        </Text>

        {/* 일정 리스트 */}
        <Box
          mt="2rem"
          w="100%"
          h="280px"
          display="flex"
          flexDirection="column"
          gap="0.5rem"
        >
          {dailySchedules.map((schedule) => (
            <Box
              key={schedule.id}
              h="40px"
              borderRadius="12px"
              bg={schedule.backgroundColor}
              display="flex"
              alignItems="center"
              px="14px"
            >
              <Text
                textStyle="body_14700120"
                overflow="hidden"
                textOverflow="ellipsis"
                whiteSpace="nowrap"
              >
                {schedule.title}
              </Text>
            </Box>
          ))}
        </Box>

        {/* 할 일 추가 버튼 → Drawer 오픈 */}
        <Button size="medium" width="100%" onClick={() => setIsDrawerOpen(true)}>
          <Box display="flex" flexDirection="row" alignItems="center" gap="8px">
            <ChakraIcons.Plus size={20} color="icon.icon5" />
            <Text textStyle="caption_12800" color="button.text.secondary">
              할 일 추가하기
            </Text>
          </Box>
        </Button>
      </Box>

      {/* Drawer */}
      <ScheduleBottomSheet
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onSubmit={onAddSchedule}
      />
    </>
  );
}