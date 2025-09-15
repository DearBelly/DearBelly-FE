"use client";

import { useState, useRef, useEffect } from "react";
import { TopBarBottomButtonLayout } from "@/components/Layouts/TopBarBottomButtonLayout";
import LetterCard from "@/components/Letter/LetterCard";
import { Box, Text } from "@chakra-ui/react";
import { Calendar } from "@mynaui/icons-react";
import { useRouter } from "next/navigation";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import Link from "next/link";

const currentUser = { userName: "푸르니" };

export default function LettersPage() {
  const router = useRouter();
  const [selectedMonth, setSelectedMonth] = useState<Date>(new Date());
  const [open, setOpen] = useState(false);

  const calendarRef = useRef<HTMLDivElement>(null);

  // ✅ 달력 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const letters = [
    {
      id: 1,
      userName: "푸르니",
      date: "2025-08-28",
      content: "사랑하는 아가야, 오늘도 건강하게 잘 자라고 있니?",
    },
    {
      id: 2,
      userName: "연두",
      date: "2025-08-27",
      content: "아빠는 오늘도 열심히 일하면서 너를 생각했단다!",
    },
    {
      id: 3,
      userName: "지니",
      date: "2025-08-25",
      content: "힘든 순간도 있겠지만, 곧 기쁨이 찾아올 거야 🌸",
    },
  ];

  return (
    <TopBarBottomButtonLayout
      topbarTitle="편지함"
      nextLabel="편지쓰러 가기"
      onNext={() => router.push("/letters/new")}
      onBack={() => router.push("/home")}
    >
      <Box
        w="100%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        {/* 월 선택 */}
        <Box w="100%" position="relative" ref={calendarRef}>
          <Box
            display="flex"
            flexDirection="row"
            gap="4px"
            alignItems="center"
            justifyContent="flex-end"
            color="text.text1"
            pb="8px"
            cursor="pointer"
            onClick={() => setOpen((prev) => !prev)}
          >
            <Text textStyle="body_14400222">
              {format(selectedMonth, "yyyy년 M월")}
            </Text>
            <Calendar size={16} />
          </Box>

          {/* 달력 */}
          {open && (
            <Box
              position="absolute"
              top="100%"
              right={0}
              zIndex={3000}
              mt="4px"
            >
              <DatePicker
                selected={selectedMonth}
                onChange={(date) => {
                  if (date) setSelectedMonth(date);
                  setOpen(false);
                }}
                dateFormat="yyyy-MM"
                showMonthYearPicker
                inline
              />
            </Box>
          )}
        </Box>

        {/* 편지 리스트 */}
        <Box
          display="flex"
          flexDirection="column"
          gap="16px"
          w="100%"
          maxW="35rem"
          mt="16px"
        >
          {letters.map((letter) => {
            const href =
              letter.userName === currentUser.userName
                ? `/letters/${letter.date}/me?userName=${letter.userName}&content=${encodeURIComponent(
                    letter.content
                  )}`
                : `/letters/${letter.date}/${letter.userName}?content=${encodeURIComponent(
                    letter.content
                  )}`;

            return (
              <Link
                key={letter.id}
                href={href}
                style={{ textDecoration: "none" }}
              >
                <LetterCard {...letter} />
              </Link>
            );
          })}
        </Box>
      </Box>
    </TopBarBottomButtonLayout>
  );
}
