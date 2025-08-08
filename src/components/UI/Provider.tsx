"use client"

import { ChakraProvider } from "@chakra-ui/react"
import { ThemeProvider } from "next-themes"
import { system } from "@/theme/system"
import { BreakPointProvider } from "@/context/BreakPointProvider"

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider value={system}>
      <ThemeProvider attribute="class">
        <BreakPointProvider>
          {children}
        </BreakPointProvider>
      </ThemeProvider>
    </ChakraProvider>
  )
}
