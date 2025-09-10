"use client";

import { TopBarBottomButtonLayout } from "@/components/Layouts/TopBarBottomButtonLayout";
import LetterCard from "@/components/Letter/LetterCard";
import { Box, Text } from "@chakra-ui/react";
import { Calendar } from "@mynaui/icons-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const currentUser = { userName: "푸르니" };

export default function LettersPage() {
  const router = useRouter();
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
      <Box w="100%" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
        {/* 상단 헤더 */}
        <Box
        w="100%"
        display="flex"
        flexDirection="row"
        gap="4px"
        alignItems="center"
        justifyContent="flex-end"
        color="text.text1"
        mb="8px"
        >
          <Text textStyle="body_14400222">2025년 8월</Text>
          <Calendar size={16} />
        </Box>

        {/* 편지 리스트 */}
        <Box display="flex" flexDirection="column" gap="16px" w="100%" maxW="35rem">
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
              <Link key={letter.id} href={href} style={{ textDecoration: "none" }}>
                <LetterCard {...letter} />
              </Link>
            );
          })}
        </Box>
      </Box>
    </TopBarBottomButtonLayout>
  );
}
