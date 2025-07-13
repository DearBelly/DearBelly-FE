import { Box, Text } from "@chakra-ui/react";
import { useGetBreakPointValue } from "../context/BreakPointProvider";

export default function Home() {
  const isPc = useGetBreakPointValue();

  // 아직 초기 로딩 중
  if (isPc === undefined) {
    return null;
  }

  console.log(isPc);

  return (
    <Box
      bg="green.400"
      minH="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      p={{ base: 4, md: 8 }}
    >
    <Text fontSize={{ base: "2xl", md: "4xl" }} color="white">
      {isPc ? "하이" : "헬로우"}
    </Text>
    </Box>
  );
}
