import React, { createContext, useContext } from "react";
import useBreakPoint from "../hooks/useBreakPoint";

const BreakPointContext = createContext<boolean | undefined>(undefined);

interface Props {
  children?: React.ReactNode;
}

export const BreakPointProvider = ({ children }: Props) => {
  const { isPc, isMobile } = useBreakPoint();
  
  const isLoading = isPc === undefined && isMobile === undefined;

  if (isLoading) {
    return null;
  }

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
