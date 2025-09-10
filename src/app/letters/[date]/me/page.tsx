"use client";

import { TopBarBottomButtonLayout } from "@/components/Layouts/TopBarBottomButtonLayout";
import LetterCard from "@/components/Letter/LetterCard";
import { Box } from "@chakra-ui/react";
import { useParams, useRouter, useSearchParams } from "next/navigation";

export default function MyLetterPage() {
  const router = useRouter();
  const { date } = useParams<{ date: string }>(); 
  const sp = useSearchParams();

  const userName = sp.get("userName") ?? "익명";
  const content = sp.get("content") ?? "내용 없음";

  return (
    <TopBarBottomButtonLayout
      topbarTitle="편지함"
      nextLabel="수정하기"
      onNext={() => {
        router.push(
          `/letters/${date}/me/edit?content=${encodeURIComponent(content)}`
        );
      }}
    >
      <Box display="flex" flexDirection="column" mt="20px" w="100%" maxW="35rem" alignItems="center">
        <LetterCard userName={userName} date={String(date)} content={content} />
      </Box>
    </TopBarBottomButtonLayout>
  );
}
