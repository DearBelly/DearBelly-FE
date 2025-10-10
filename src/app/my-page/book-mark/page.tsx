'use client';

import { useState, useEffect, ReactNode } from "react";
import { Box } from "@chakra-ui/react";
import { MobileLayout } from "../../../components/Layouts/MobileLayout";
import { ContendCardOutput } from '@/components/ContentCard/ContendCardOutput';
import type { ContendCardProps } from '@/components/ContentCard/ContentCard';
import { ChakraIcons } from "@/lib/withChakraIcon";

export default function BookMark() {
  const [cards, setCards] = useState<ContendCardProps[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('token') || process.env.NEXT_PUBLIC_TEMP_TOKEN;

    if (token) {
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/news/bookmarks?page=0&size=20`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("북마크 데이터: ", data);
          const content = data?.data?.content;

          if (Array.isArray(content)) {
            if (content.length > 0) {
              const mappedCards: ContendCardProps[] = content.map((item: any) => ({
                id: item.newsId ?? 0,
                title: item.title || "제목 없음",
                subTitle: item.subTitle || "내용 없음",
                imageSrc: item.imageUrl || "",
              }));
              setCards(mappedCards);
            } else {
              setCards([]);
              console.log("content length is 0 (빈 배열)");
            }
          } else {
            console.error("content가 배열이 아님:", content);
            setCards([]);
          }
        })
        .catch((err) => console.error("북마크 불러오기 실패: ", err));
    }
  }, []);

  useEffect(() => {
    console.log("카드 개수:", cards.length);
  }, [cards]);

  return (
    <MobileLayout
      topbarMode="back"
      topbarTitle="북마크 모음"
      topbarBackground="filled"
    >
      <Box
        className="body_wrapper"
        display="flex"
        flexDirection="column"
        alignItems="center"
        mt="0.62rem"
        mb="0.62rem"
        width="calc(100vw - 2.5rem)"
        maxW="35rem"
        mx="auto"
      >
        {cards.length > 0 ? (
          <ContendCardOutput cards={cards} />
        ) : (
          <Box
            className="error_wrapper"
            position="fixed"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="0.5rem"
            w="100%"
            maxW="35rem"
            mx="auto"
          >
            <ChakraIcons.DangerCircle size="7vh" color="text.text4" />
            <ErrorContent>북마크 정보가 없습니다</ErrorContent>
          </Box>
        )}
      </Box>
    </MobileLayout>
  );
}

const ErrorContent = ({ children }: { children: ReactNode }) => (
  <Box
    display="flex"
    alignItems="center"
    justifyContent="center"
    color="text.text4"
    textStyle="body_167001"
    px="1rem"
    maxWidth="90%"
    whiteSpace="nowrap"
    overflow="hidden"
    textOverflow="ellipsis"
  >
    {children}
  </Box>
);
