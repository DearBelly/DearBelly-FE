"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import useBreakPoint from "@/hooks/useBreakPoint"

const BreakPointContext = createContext<boolean | undefined>(undefined)

export const BreakPointProvider = ({ children }: { children: React.ReactNode }) => {
  const [isMounted, setIsMounted] = useState(false)
  const [isPc, setIsPc] = useState<boolean | undefined>(undefined)
  const breakPoint = useBreakPoint()

  useEffect(() => {
    setIsMounted(true)
    setIsPc(breakPoint.isPc)
  }, [breakPoint.isPc])

  if (!isMounted) return null

  return (
    <BreakPointContext.Provider value={isPc}>
      {children}
    </BreakPointContext.Provider>
  )
}

export const useGetBreakPointValue = () => {
  const context = useContext(BreakPointContext)
  if (context === undefined) {
    throw new Error("useGetBreakPointValue must be used within a BreakPointProvider")
  }
  return context
}
