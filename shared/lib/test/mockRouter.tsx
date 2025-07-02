'use client';

import { PathnameContext } from 'next/dist/shared/lib/hooks-client-context.shared-runtime';

import { ReactNode } from 'react';

interface MockPathnameProviderProps {
  pathname: string;
  children: ReactNode;
}

/* 클라이언트 환경에서 usePathname을 mock */
export const MockPathnameProvider = ({ pathname, children }: MockPathnameProviderProps) => {
  return (
    <PathnameContext.Provider value={pathname}>
      {children}
    </PathnameContext.Provider>
  );
};
