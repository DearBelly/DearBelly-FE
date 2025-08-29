'use client'
import { useBreakpointValue } from "@chakra-ui/react"

export default function useBreakPoint() {
  const isMobile = useBreakpointValue({ base: true, sm: true, md: false, lg: false })
  const isPc = useBreakpointValue({ base: false, sm: false, md: true, lg: true })
  return { isMobile, isPc }
}
