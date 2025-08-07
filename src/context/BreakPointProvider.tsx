"use client";

import React, { createContext, useContext } from "react";
import useBreakPoint from "@/hooks/useBreakPoint";

const BreakPointContext = createContext<boolean | undefined>(undefined);

export const BreakPointProvider = ({ children }: { children: React.ReactNode }) => {
  const { isPc } = useBreakPoint();

  return (
    <BreakPointContext.Provider value={isPc}>
      {children}
    </BreakPointContext.Provider>
  );
};

export default BreakPointProvider;

export const useGetBreakPointValue = () => {
  const context = useContext(BreakPointContext);
  if (context === undefined) {
    throw new Error("useGetBreakPointValue must be used within a BreakPointProvider");
  }
  return context;
};
