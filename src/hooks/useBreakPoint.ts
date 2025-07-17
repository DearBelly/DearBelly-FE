import { useBreakpointValue } from "@chakra-ui/react";

const useBreakPoint = () => {
  const isMobile = useBreakpointValue({
    base: true,
    sm: true,
    lg: false,
  });

  const isPc = useBreakpointValue({
    base: false,
    sm: false,
    lg: true,
  });
  
  return { isMobile, isPc };
};

export default useBreakPoint;