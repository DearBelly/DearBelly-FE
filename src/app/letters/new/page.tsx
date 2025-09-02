"use client";

import { TopBarBottomButtonLayout } from "@/components/Layouts/TopBarBottomButtonLayout";
import { LetterEditBox } from "@/components/TextField/LetterEditBox";
import { Box } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function NewLetterPage() {
  const router = useRouter();

  const handleNext = () => {
    const today = new Date().toISOString().split("T")[0]; 
    router.push(`/letters`);
  };

  return (
    <TopBarBottomButtonLayout
      topbarTitle="편지함"
      nextLabel="완료"
      onNext={handleNext}
    >
      <Box display="flex" flexDirection="column" mt="20px">
        <LetterEditBox />
      </Box>
    </TopBarBottomButtonLayout>
  );
}
