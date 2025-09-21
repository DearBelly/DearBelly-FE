"use client";

import { TopBarBottomButtonLayout } from "@/components/Layouts/TopBarBottomButtonLayout";
import { LetterEditBox } from "@/components/TextField/LetterEditBox";
import { Box } from "@chakra-ui/react";
import { TrashSolid } from "@mynaui/icons-react";
import { useRouter } from "next/navigation";

export default async function EditLetterPage({
  params,
  searchParams,
}: {
  params: Promise<{ date: string }>;
  searchParams?: Promise<{ content?: string }>;
}) {
  const router = useRouter();
  const { date } = await params;
  const { content } = await searchParams ?? {};

  const deleteText = (
    <Box
      color="text.text1"
      cursor="pointer"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <TrashSolid size={24} />
    </Box>
  );

  return (
    <TopBarBottomButtonLayout
      topbarTitle="편지함"
      nextLabel="완료"
      topbarRightContent={deleteText}
      onNext={() => {
        router.push(`/letters`);
      }}
    >
      <Box display="flex" flexDirection="column" mt="20px" w="100%" maxW="35rem" alignItems="center">
        <LetterEditBox value={content ?? ""} onChange={() => {}} />
      </Box>
    </TopBarBottomButtonLayout>
  );
}
