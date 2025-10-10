"use client";

import { TopBarBottomButtonLayout } from "@/components/Layouts/TopBarBottomButtonLayout";
import { LetterEditBox } from "@/components/TextField/LetterEditBox";
import { Box } from "@chakra-ui/react";
import { TrashSolid } from "@mynaui/icons-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

export default function EditLetterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialContent = useMemo(() => searchParams.get("content") ?? "", [searchParams]);
  const [content, setContent] = useState(initialContent);

  const deleteText = (
    <Box
      color="text.text1"
      cursor="pointer"
      display="flex"
      alignItems="center"
      justifyContent="center"
      onClick={() => {
        // TODO: 삭제 로직이 있다면 여기서 실행
      }}
    >
      <TrashSolid size={24} />
    </Box>
  );

  return (
    <TopBarBottomButtonLayout
      topbarTitle="편지함"
      nextLabel="완료"
      topbarRightContent={deleteText}
      onNext={() => router.push(`/letters`)}
    >
      <Box display="flex" flexDirection="column" mt="20px" w="100%" maxW="35rem" alignItems="center">
        <LetterEditBox value={content} onChange={setContent} />
      </Box>
    </TopBarBottomButtonLayout>
  );
}
