import { TopBarBottomButtonLayout } from "@/components/Layouts/TopBarBottomButtonLayout";
import LetterCard from "@/components/Letter/LetterCard";
import { Box } from "@chakra-ui/react";

export default async function OthersLetterPage({
  params,
  searchParams,
}: {
  params: Promise<{ date: string }>;
  searchParams?: Promise<{ userName?: string; content?: string }>;
}) {
  const { date } = await params;
  const { userName, content } = await searchParams ?? {};

  return (
    <TopBarBottomButtonLayout topbarTitle="편지함" hideButton={true}>
      <Box display="flex" flexDirection="column" mt="20px" w="100%" h="100%" maxW="35rem" alignItems="center">
        <LetterCard
          userName={userName ?? "익명"}
          date={date}
          content={content ?? "내용 없음"}
        />
      </Box>
    </TopBarBottomButtonLayout>
  );
}
