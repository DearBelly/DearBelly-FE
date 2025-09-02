'use client';

import { Box, Text, Drawer, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import { ChakraIcons } from "@/utils/withChakraIcon";
import { Button } from "../Button/Button";

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

  return (
    <>
      <Box
        w="76dvw"
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
          {date ? `${date}` : "날짜 없음"}
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

function ScheduleBottomSheet({
  open,
  onClose,
  onSubmit,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (name: string, bgColor: string) => void;
}) {
  const [content, setContent] = useState("");
  const [selectedColor, setSelectedColor] = useState("bg.calendar1");
  const colors = [
    "bg.calendar1",
    "bg.calendar2",
    "bg.calendar3",
    "bg.calendar4",
    "bg.calendar5",
  ];

  return (
    <Drawer.Root open={open} onOpenChange={(e) => !e.open && onClose()} placement="bottom">
      <Drawer.Backdrop bg="rgba(0, 0, 0, 0.5)" />
      <Drawer.Positioner>
        <Drawer.Content borderTopRadius="20px" bg={selectedColor} px="16px" pt="20px" pb="16px">
          {/* 입력창 */}
          <Textarea
            p="0"
            textStyle="body_168001"
            bg="transparent"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="오늘의 할 일"
            resize="none"
            border="none"
            maxHeight="300px"
            _focus={{ outline: "none" }}
            wordBreak="break-all"
          />

          {/* 색상 선택 + 아이콘 */}
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            mt="16px"
          >
            <Box display="flex" gap="12px">
              {colors.map((c) => (
                <Box
                  key={c}
                  w="20px"
                  h="20px"
                  borderRadius="full"
                  border={selectedColor === c ? "2px solid black" : "2px solid transparent"}
                  bg={c}
                  cursor="pointer"
                  onClick={() => setSelectedColor(c)}
                />
              ))}
            </Box>

            <Box display="flex" alignItems="center" gap="12px">
              <ChakraIcons.TrashSolid
                size={20}
                color="icon.icon1"
                onClick={() => setContent("")}
              />
              <ChakraIcons.SendSolid
                size={20}
                color="icon.icon1"
                onClick={() => {
                  if (content.trim()) {
                    onSubmit(content, selectedColor);
                  }
                  setContent("");
                  onClose();
                }}
              />
            </Box>
          </Box>
        </Drawer.Content>
      </Drawer.Positioner>
    </Drawer.Root>
  );
}
