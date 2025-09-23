"use client";

import { useEffect, useState } from "react";
import { TopBarBottomButtonLayout } from "@/components/Layouts/TopBarBottomButtonLayout";
import LetterCard from "@/components/Letter/LetterCard";
import { Box } from "@chakra-ui/react";
import { useParams, useRouter } from "next/navigation";
import { Letter } from "@/app/letters/letter";

export default function MyLetterPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const DEFAULT_PROFILE_IMAGE = "/images/icon_default_profile.svg";

  const [letter, setLetter] = useState<Letter | null>(null);

  useEffect(() => {
    const fetchLetter = async () => {
      const token =
        localStorage.getItem("token") || process.env.NEXT_PUBLIC_TEMP_TOKEN;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/letters/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.ok) {
        const json = await res.json();
        setLetter(json.data);
      }
    };

    if (id) fetchLetter();
  }, [id]);

  return (
    <TopBarBottomButtonLayout
      topbarTitle="편지함"
      nextLabel="수정하기"
      onNext={() => router.push(`/letters/${id}/me/edit`)}
    >
      <Box
        display="flex"
        flexDirection="column"
        mt="20px"
        w="100%"
        maxW="35rem"
        alignItems="center"
      >
        {letter && (
          <LetterCard
            nickname={letter.nickname}
            createdAt={letter.createdAt}
            content={letter.content}
            imgUrl={letter.imgUrl ?? DEFAULT_PROFILE_IMAGE }
          />
        )}
      </Box>
    </TopBarBottomButtonLayout>
  );
}
