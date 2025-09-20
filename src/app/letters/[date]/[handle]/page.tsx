import { TopBarBottomButtonLayout } from "@/components/Layouts/TopBarBottomButtonLayout";
import LetterCard from "@/components/Letter/LetterCard";
import { Box } from "@chakra-ui/react";
import { Letter } from "@/app/letters/letter";

export default async function OthersLetterPage({
  params,
  searchParams,
}: {
  params: Promise<{ date: string }>;
  searchParams?: Promise<{ nickname?: string; content?: string; imgUrl?: string }>;
}) {
  const { date } = await params;
  const { nickname, content, imgUrl } = await searchParams ?? {};

  return (
    <TopBarBottomButtonLayout topbarTitle="편지함" hideButton={true}>
      <Box display="flex" flexDirection="column" mt="20px" w="100%" h="100%" maxW="35rem" alignItems="center">
        <LetterCard
          nickname={nickname ?? "익명"}
          createdAt={date}
          content={content ?? "내용 없음"}
          imgUrl={imgUrl ?? "/images/profile.svg"}
        />
      </Box>
    </TopBarBottomButtonLayout>
  );
}
