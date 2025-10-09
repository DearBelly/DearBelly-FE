'use client'
import { ReactNode } from 'react'
import usePreventZoom from '../../hooks/usePreventZoom '

export const PreventZoomWrapper = ({ children }: { children: ReactNode }) => {
  usePreventZoom()
  return <>{children}</>
}
