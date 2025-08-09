/** @jsxImportSource @emotion/react */
"use client"
import { css } from '@emotion/react';
import { ReactNode } from 'react';
import { TopBar, TopBarProps } from '../TopBar/TopBar';
import { BottomNavigation } from '../BottomNavigation/BottomNavigation';

interface MobileLayoutProps {
  topBarProps: TopBarProps;
  children: ReactNode;
  hasTopPadding?: boolean;
  showButtomNav?: boolean;
}

export const MobileLayout = ({ children, topBarProps, hasTopPadding=true, showButtomNav=true }: MobileLayoutProps) => {
  return (
    <div css={layoutStyle}>
      <TopBar {...topBarProps} />
      <main css={[contentStyle, !hasTopPadding && noTopPaddingStyle]}>
        {children}
      </main>
      { showButtomNav && <BottomNavigation />}
    </div>
  );
};

const layoutStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 100vw;
  min-height: 100vh;
  background-color: #F9F7F7;

  margin: 0 auto;
  position: relative;
`;

const contentStyle = css`
  flex: 1;
  width: 100%;
  box-sizing: border-box;
  padding-right: 20px;
  padding-left: 20px;
  
  padding-top: 44px; /* iOS 기준 */
  @media (max-width: 360px) {
    padding-top: 56px; /* AOS 기준 */
  }

  padding-bottom: 54px; /* iOS 기준 */
  @media (max-width: 360px) {
    padding-bottom: 62px; /* AOS 기준 */
  }

  overflow-y: auto;
  -webkit-overflow-scrolling: touch; 
`;

const noTopPaddingStyle = css`
  padding-top: 0 !important;
  padding-right: 0 !important;
  padding-left: 0 !important;
`;