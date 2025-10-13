"use client";

import { Box, Text, Image, Portal } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { ChakraIcons } from "@/lib/withChakraIcon";
import { Button } from "../Button/Button";
import { ScheduleBottomSheet } from "../BottomSheets/ScheduleSheet";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { fetchDailySchedules, updateSchedule, mapColorToApiFormat, mapApiColorToUiFormat, deleteSchedule } from "@/lib/schedule";
import { ScheduleResponse } from "@/types/schedule";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  date: string | null;
  onAddSchedule: (name: string, bgColor: string) => Promise<void>; // 날짜는 모달이 관리
}

export function ScheduleModal({
  isOpen,
  onClose,
  date,
  onAddSchedule,
}: ScheduleModalProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [dailySchedules, setDailySchedules] = useState<ScheduleResponse[]>([]);
  const [editSchedule, setEditSchedule] = useState<ScheduleResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  // 날짜 변경 시 일정 조회
  useEffect(() => {
    if (isOpen && date) {
      loadDailySchedules();
    }
  }, [isOpen, date]);

  const loadDailySchedules = async () => {
    if (!date) return;
    setIsLoading(true);
    try {
      const schedules = await fetchDailySchedules(date);
      setDailySchedules(
        schedules.map(s => ({
        ...s,
        color: mapApiColorToUiFormat(String(s.color)),
        }))
      );
    } catch (error) {
      console.error("일정 조회 실패:", error);
      setDailySchedules([]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  const handleDateFormat = (d: string) => {
    return format(new Date(d), "M월 d일 (E)", { locale: ko });
  };

  const handleAddSchedule = async (name: string, bgColor: string) => {
    if (dailySchedules.length >= 10) {
      alert("하루에 최대 10개의 일정만 등록할 수 있습니다.");
      return;
    }
    try {
      await onAddSchedule(name, bgColor);
      await loadDailySchedules();
    } catch (error) {
      console.error("일정 추가 실패:", error);
    }
  };

  const startEdit = (s: ScheduleResponse) => {
    setEditSchedule(s);
    setIsDrawerOpen(true);
  };

  const handleEditSubmit = async (name: string, bgColor: string) => {
    if (!editSchedule || !date) return;
    try {
      await updateSchedule(editSchedule.id, {
        schedule: name,
        startDate: date,
        endDate: date,
        color: mapColorToApiFormat(bgColor),
      });
      await loadDailySchedules();
    } catch (e) {
      console.error("일정 수정 실패:", e);
    } finally {
      setEditSchedule(null);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteSchedule(id);
      await loadDailySchedules();
    } catch (e) {
      console.error("일정 삭제 실패:", e);
    } finally {
      setEditSchedule(null);
    }
  };

  const closeSheet = () => {
    setIsDrawerOpen(false);
    setEditSchedule(null);
  };
  
  return (
    <Portal>
      <Box
        position="fixed"
        inset="0"
        bg="blackAlpha.500"
        zIndex="overlay"
        display="flex"
        alignItems="center"
        justifyContent="center"
        onClick={onClose}
      >
        <Box
          onClick={(e) => e.stopPropagation()}
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
          zIndex="modal"
        >
          <Text textStyle="body_168001" color="text.text1">
            {date ? `${handleDateFormat(date)}` : "날짜 없음"}
          </Text>

          {/* 일정 리스트 */}
          <Box mt="2rem" w="100%" h="280px" display="flex" flexDirection="column" gap="0.5rem">
            {isLoading ? (
              <Box display="flex" justifyContent="center" alignItems="center" h="100%">
                <Image src="/images/computerVision/spinner.svg" alt="로딩 스피너" width="7vw" />
              </Box>
            ) : dailySchedules.length === 0 ? (
              <Box display="flex" justifyContent="center" h="100%">
                <Text textStyle="body_14700120" color="text.text3">
                  등록된 일정이 없습니다
                </Text>
              </Box>
            ) : dailySchedules.length >= 6 ? (
              <Box
                css={{
                  "& .slick-slider": { width: "100%" },
                  "& .slick-slide > div": { display: "flex", justifyContent: "center" },
                  "& .slick-dots li": { margin: "0 -0.2rem" },
                  "& .slick-dots li.slick-active button:before": { color: "var(--chakra-colors-text-text1)" },
                }}
              >
                <Slider
                  dots
                  infinite={false}
                  speed={500}
                  slidesToShow={1}
                  centerMode
                  centerPadding="0px"
                  slidesToScroll={1}
                  arrows={false}
                  beforeChange={(_, next) => setCurrentSlide(next)}
                >
                  <Box>
                    <Box display="flex" flexDirection="column" gap="0.5rem" h="240px" overflowY="auto">
                      {dailySchedules.slice(0, 5).map((s) => (
                        <Box
                          key={s.id}
                          h="40px"
                          borderRadius="12px"
                          bg={String(s.color)}
                          onClick={() => startEdit(s)}
                          cursor="pointer"
                          display="flex"
                          alignItems="center"
                          px="16px"
                          flexShrink={0}
                        >
                          <Text textStyle="body_14700120" overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
                            {s.schedule}
                          </Text>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                  <Box>
                    <Box display="flex" flexDirection="column" gap="0.5rem" h="240px" overflowY="auto">
                      {dailySchedules.slice(5, 10).map((s) => (
                        <Box
                          key={s.id}
                          h="40px"
                          borderRadius="12px"
                          bg={String(s.color)}
                          display="flex"
                          alignItems="center"
                          px="14px"
                          flexShrink={0}
                          onClick={() => startEdit(s)}       
                          cursor="pointer"
                        >
                          <Text textStyle="body_14700120" overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
                            {s.schedule}
                          </Text>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                </Slider>
              </Box>
            ) : (
              dailySchedules.map((s) => (
                <Box
                  key={s.id}
                  h="40px"
                  borderRadius="12px"
                  bg={String(s.color)}
                  display="flex"
                  alignItems="center"
                  px="14px"
                  flexShrink={0}
                  onClick={() => startEdit(s)}        
                  cursor="pointer"
                >
                  <Text textStyle="body_14700120" overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
                    {s.schedule}
                  </Text>
                </Box>
              ))
            )}
          </Box>

          {/* Drawer 오픈 */}
          <Button
            size="medium"
            width="100%"
            onClick={() => { setEditSchedule(null); setIsDrawerOpen(true); }}
            isDisabled={dailySchedules.length >= 10}
          >
            <Box display="flex" flexDirection="row" alignItems="center" gap="8px">
              <ChakraIcons.Plus size={20} color="icon.icon5" />
              <Text textStyle="caption_12800" color="button.text.secondary">
                {dailySchedules.length >= 10 ? "일정 등록 한도 초과" : "할 일 추가하기"}
              </Text>
            </Box>
          </Button>
        </Box>
      </Box>

      <ScheduleBottomSheet
        open={isDrawerOpen}
        onClose={closeSheet}
        onSubmit={editSchedule ? handleEditSubmit : handleAddSchedule} 
        mode={editSchedule ? "edit" : "create"}
        savedContent={editSchedule?.schedule}
        savedColor={editSchedule ? String(editSchedule.color) : "bg.calendar1"}
        scheduleId={editSchedule?.id}
        onDelete={handleDelete}
      />
    </Portal>
  );
}
