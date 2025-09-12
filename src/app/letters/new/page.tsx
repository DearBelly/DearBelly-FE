"use client";

import { TopBarBottomButtonLayout } from "@/components/Layouts/TopBarBottomButtonLayout";
import { LetterEditBox } from "@/components/TextField/LetterEditBox";
import { Box } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { writeLetter } from "@/lib/apis/writeLetter";

export default function NewLetterPage() {
  const router = useRouter();
  const [content, setContent] = useState("");

  const TEMP_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1Iiwicm9sZSI6IlJPTEVfVVNFUiIsImlhdCI6MTc1Njk2MzQ3NCwiZXhwIjoxNzU5NTU1NDc0fQ.OlPkY53NiuOukJsarRWEaPEwLpIAREBEAHO0j_C2IW4";``

  const handleNext = async () => {
    try {
      const res = await writeLetter({ content }, TEMP_TOKEN);
      if (res.success) {
        router.push("/letters");
      } else {
        alert("편지 전송에 실패했습니다.");
      }
    } catch (err) {
      console.error(err);
      alert("서버 오류가 발생했습니다.");
    }
  };


  return (
    <TopBarBottomButtonLayout
      topbarTitle="편지함"
      nextLabel="완료"
      onNext={handleNext}
    >
      <Box
        display="flex"
        flexDirection="column"
        mt="20px"
        w="100%"
        maxW="35rem"
        alignItems="center"
        justifyContent="center"
      >
        <LetterEditBox content={content} onChange={setContent} />
      </Box>
    </TopBarBottomButtonLayout>
  );
}
