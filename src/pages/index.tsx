import { Box, Text, Image } from "@chakra-ui/react"; // Image import 추가!
import { useGetBreakPointValue } from "../context/BreakPointProvider";

export default function Home() {
  const isPc = useGetBreakPointValue();

  return (
    <Box
      minH="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      p={{ base: 4, md: 8 }}
    >
    {isPc ? (
      <>
        <Image src="/icons/logo.svg" alt="logo" width="18.75rem" height="18.75rem" mb={4} />
        <Image src="/icons/logo_text.svg" alt="logo text" width="18.75rem" height="auto" />
      </>
    ) : (
      <>
        <Image src="/icons/logo.svg" alt="logo" width="9.375rem" height="9.375rem" mb={4} />
        <Image src="/icons/logo_text.svg" alt="logo text" width="9.375rem" height="auto" />
      </>
    )}
    </Box>
  );
}