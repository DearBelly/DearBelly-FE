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
import { LettersResponse } from "./letter";
import { Letter } from "./letter";
import { toUrlDate } from "@/lib/date";

export default function LettersPage() {
  const router = useRouter();

  const [selectedMonth, setSelectedMonth] = useState<Date>(new Date());
  const [open, setOpen] = useState(false);
  const [letters, setLetters] = useState<Letter[]>([]);

  const calendarRef = useRef<HTMLDivElement>(null);

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

  const getLetters = async () => {
    const token = localStorage.getItem("token") || process.env.NEXT_PUBLIC_TEMP_TOKEN;

    try {
      const year = selectedMonth.getFullYear();
      const month = selectedMonth.getMonth() + 1;

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/letters?year=${year}&month=${month}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error("편지 조회 오류");

      const json: LettersResponse = await response.json();
      setLetters(json.data);
    } catch (err) {
      console.log("편지 조회 오류: ", err);
    }
  };
  useEffect(() => {
    getLetters();
  }, [selectedMonth]);

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

        <Box
          display="flex"
          flexDirection="column"
          gap="16px"
          w="100%"
          maxW="35rem"
          mt="16px"
        >
          {letters.map((letter) => {
            const href = letter.editable
              ? `/letters/${letter.id}/me`
              : `/letters/${letter.id}/${letter.nickname}`;
            return (
              <Link
                key={letter.id}
                href={href}
                style={{ textDecoration: "none" }}
              >
                <LetterCard
                  nickname={letter.nickname}
                  createdAt={letter.createdAt}
                  content={letter.content}
                  imgUrl={letter.imgUrl}
                />
              </Link>
            );
          })}
        </Box>
      </Box>
    </TopBarBottomButtonLayout>
  );
}
