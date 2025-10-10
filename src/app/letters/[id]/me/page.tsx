"use client";

import { useEffect, useState } from "react";
import { TopBarBottomButtonLayout } from "@/components/Layouts/TopBarBottomButtonLayout";
import LetterCard from "@/components/Letter/LetterCard";
import { Box } from "@chakra-ui/react";
import { useParams, useRouter } from "next/navigation";
import { fetchLetterDetail } from "@/lib/letters";                
import type { LetterItem, LetterDetailResponse } from "@/types/letters"; 

export default function MyLetterPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const DEFAULT_PROFILE_IMAGE = "/images/icon_default_profile.svg";
  const DEFAULT_QUESTION = "오늘 하루는 어땠나요?";

  const [letter, setLetter] = useState<LetterItem | null>(null);

  useEffect(() => {
    if (!id) return;

    if (!localStorage.getItem("token")) {
      router.push("/home");
      return;
    }

    let cancelled = false;

    (async () => {
      try {
        const resp: LetterDetailResponse = await fetchLetterDetail(Number(id));
        if (!cancelled) setLetter(resp.data);
      } catch (e) {
        console.log("편지 상세 조회 실패:", e);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [id, router]);

  return (
    <TopBarBottomButtonLayout
      topbarTitle="편지함"
      nextLabel="수정하기"
      onNext={() => router.push(`/letters/${id}/me/edit`)}
      nextDisabled={!letter?.editable}                     
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
            imgUrl={letter.imgUrl ?? DEFAULT_PROFILE_IMAGE}
            questionText={letter.question ?? DEFAULT_QUESTION}    
          />
        )}
      </Box>
    </TopBarBottomButtonLayout>
  );
}
