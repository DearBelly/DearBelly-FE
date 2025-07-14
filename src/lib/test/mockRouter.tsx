'use client';

import { PathnameContext } from 'next/dist/shared/lib/hooks-client-context.shared-runtime';
import { ReactNode } from 'react';

interface MockPathnameProviderProps {
  pathname: string;
  children: ReactNode;
}

export const MockPathnameProvider = ({ pathname, children }: MockPathnameProviderProps) => {
  return (
    <PathnameContext.Provider value={pathname}>
      {children}
    </PathnameContext.Provider>
  );
};
