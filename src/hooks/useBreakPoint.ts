import { useBreakpointValue } from "@chakra-ui/react"

export default function useBreakPoint() {
  const isMobile = useBreakpointValue({ base: true, lg: false })
  const isPc = useBreakpointValue({ base: false, lg: true })
  return { isMobile, isPc }
}
