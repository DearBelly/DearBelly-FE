import { useBreakpointValue } from "@chakra-ui/react"

export function useMobileBreakPoint() {
    const isIOSSize = useBreakpointValue({ base: false, sm: true }); 
    const isAOSSize = useBreakpointValue({ base: true, sm: false });
    return { isIOSSize, isAOSSize };
  }