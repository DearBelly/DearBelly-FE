import { Box, Text } from "@chakra-ui/react";
import { useGetBreakPointValue } from "../context/BreakPointProvider";

export default function Home() {
  const isPc = useGetBreakPointValue();

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
