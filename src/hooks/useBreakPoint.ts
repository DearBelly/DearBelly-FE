import { useBreakpointValue } from "@chakra-ui/react";

const useBreakPoint = () => {
  const isMobile = useBreakpointValue({
    base: true,
    sm: true,
    md: false,
    lg: false,
    xl: false,
  });

  const isPc = useBreakpointValue({
    base: false,
    sm: false,
    md: true,
    lg: true,
    xl: true,
  });

  return { isMobile, isPc };
};

export default useBreakPoint;