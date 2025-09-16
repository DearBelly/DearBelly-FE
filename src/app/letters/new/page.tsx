"use client";

import { useState, useEffect } from "react";
import { TopBarBottomButtonLayout } from "@/components/Layouts/TopBarBottomButtonLayout";
import { LetterEditBox } from "@/components/TextField/LetterEditBox";
import { Box } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function NewLetterPage() {
  const router = useRouter();
  const [content, setContent] = useState("");
  const [isLogin, setIsLogin] = useState(false);

  const trimmedContent = content.trim();

  const handleSubmit = async () => {
    const token = localStorage.getItem("token") || process.env.NEXT_PUBLIC_TEMP_TOKEN;
    const today = new Date().toISOString().split("T")[0];

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/letters`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            content: trimmedContent,
            date: today,
          }),
        }
      );

      if (!response.ok) throw new Error("편지 작성 오류");

      const json = await response.json();
      console.log("편지 작성 성공: ", json);

      router.push("/letters");
    } catch (err) {
      console.log("편지 작성 오류: ", err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLogin(!!token);
  }, []);

  return (
    <TopBarBottomButtonLayout
      topbarTitle="편지함"
      nextLabel="완료"
      onNext={handleSubmit}
      nextDisabled={content.trim().length === 0}
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
        <LetterEditBox value={content} onChange={setContent} />
      </Box>
    </TopBarBottomButtonLayout>
  );
}
