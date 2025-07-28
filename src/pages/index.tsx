import { Box, Text, Image } from "@chakra-ui/react"; // Image import 추가!
import { useGetBreakPointValue } from "../context/BreakPointProvider";

export default function Home() {
  const isPc = useGetBreakPointValue();

  return (
    <Box
      bg="#F9F7F7"
      minW="320px"
      minH="100vh"
      display="flex"
      flexDirection="column"
    >
    {isPc ? (
      <>
        <Image src="/icons/logo.svg" alt="logo" width="18.75rem" height="18.75rem" mb={4} />
        <Image src="/icons/logo_text.svg" alt="logo text" width="18.75rem" height="auto" />
      </>
    ) : (
      <>
        <Image src="/icons/logo.svg" alt="logo" width="9.375rem" height="auto" mt="16.66rem" mb="1.91rem" ml="6.75rem" />
        <Image src="/icons/logo_text.svg" alt="logo text" width="9.54069rem" height="auto" ml="7rem" />
      </>
    )}
    </Box>
  );
}