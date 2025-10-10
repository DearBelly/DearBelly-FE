'use client';

import { Box, Text, Image } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { ChakraIcons } from "@/lib/withChakraIcon";
import { Button } from "../Button/Button";
import { ScheduleBottomSheet } from "../BottomSheets/ScheduleSheet";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { fetchDailySchedules, ScheduleResponse } from "@/lib/schedules";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  date: string | null;
  onAddSchedule: (name: string, bgColor: string, date: string) => void;
}

export function ScheduleModal({
  isOpen,
  onClose,
  date,
  onAddSchedule,
}: ScheduleModalProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [dailySchedules, setDailySchedules] = useState<ScheduleResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // 날짜가 변경될 때마다 일정 조회
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
      setDailySchedules(schedules);
    } catch (error) {
      console.error('일정 조회 실패:', error);
      setDailySchedules([]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  const handleDateFormat = (date: string) => {
    return format(new Date(date), "M월 d일 (E)", { locale: ko });
  };

  const handleAddSchedule = async (name: string, bgColor: string) => {
    // 일정 등록 한도 체크
    if (dailySchedules.length >= 10) {
      alert('하루에 최대 10개의 일정만 등록할 수 있습니다.');
      return;
    }

    try {
      await onAddSchedule(name, bgColor, date || "");
      // 일정 추가 후 목록 새로고침
      loadDailySchedules();
    } catch (error) {
      console.error('일정 추가 실패:', error);
    }
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
          {isLoading ? (
            <Box display="flex" justifyContent="center" alignItems="center" h="100%">
              <Image src='/images/computerVision/spinner.svg' alt='로딩 스피너' width='7vw'/>
            </Box>
          ) : dailySchedules.length === 0 ? (
            <Box display="flex" justifyContent="center" h="100%">
              <Text textStyle="body_14700120" color="text.text3">
                등록된 일정이 없습니다
              </Text>
            </Box>
          ) : dailySchedules.length >= 6 ? (
            // 6개 이상일 때 슬라이더 사용 
            <Box
              css={{
                "& .slick-slider": {
                  width: "100%",
                },
                "& .slick-slide > div": {
                  display: "flex",
                  justifyContent: "center",
                },
                "& .slick-dots li": {
                  margin: "0 -0.2rem",
                },
                "& .slick-dots li.slick-active button:before": {
                  color: "text.text1",    
                },
              }}
            >
              <Slider
                dots={true}
                infinite={false}
                speed={500}
                slidesToShow={1}
                centerMode={true}
                centerPadding="0px"
                slidesToScroll={1}
                arrows={false}
                beforeChange={(_: number, next: number) => setCurrentSlide(next)}
              >
                <Box>
                  <Box
                    display="flex"
                    flexDirection="column"
                    gap="0.5rem"
                    h="240px"
                    overflowY="auto"
                  >
                    {dailySchedules.slice(0, 5).map((schedule) => (
                      <Box
                        key={schedule.id}
                        h="40px"
                        borderRadius="12px"
                        bg={`bg.calendar${schedule.color.slice(-1)}`}
                        display="flex"
                        alignItems="center"
                        px="16px"
                        flexShrink={0}
                      >
                        <Text
                          textStyle="body_14700120"
                          overflow="hidden"
                          textOverflow="ellipsis"
                          whiteSpace="nowrap"
                        >
                          {schedule.schedule}
                        </Text>
                      </Box>
                    ))}
                  </Box>
                </Box>
                <Box>
                  <Box
                    display="flex"
                    flexDirection="column"
                    gap="0.5rem"
                    h="240px"
                    overflowY="auto"
                  >
                    {dailySchedules.slice(5, 10).map((schedule) => (
                      <Box
                        key={schedule.id}
                        h="40px"
                        borderRadius="12px"
                        bg={`bg.calendar${schedule.color.slice(-1)}`}
                        display="flex"
                        alignItems="center"
                        px="14px"
                        flexShrink={0}
                      >
                        <Text
                          textStyle="body_14700120"
                          overflow="hidden"
                          textOverflow="ellipsis"
                          whiteSpace="nowrap"
                        >
                          {schedule.schedule}
                        </Text>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Slider>
            </Box>
          ) : (
            // 6개 미만일 때 일반 리스트
            dailySchedules.map((schedule) => (
              <Box
                key={schedule.id}
                h="40px"
                borderRadius="12px"
                bg={`bg.calendar${schedule.color.slice(-1)}`}
                display="flex"
                alignItems="center"
                px="14px"
                flexShrink={0}
              >
                <Text
                  textStyle="body_14700120"
                  overflow="hidden"
                  textOverflow="ellipsis"
                  whiteSpace="nowrap"
                >
                  {schedule.schedule}
                </Text>
              </Box>
            ))
          )}
        </Box>

        {/* Drawer 오픈 */}
        <Button 
          size="medium" 
          width="100%" 
          onClick={() => setIsDrawerOpen(true)}
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

      {/* Drawer */}
      <ScheduleBottomSheet
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onSubmit={handleAddSchedule}
      />
    </>
  );
}