/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ReactNode } from 'react';
import { TopBar } from '../TopBar/TopBar';
import { BottomNavigation } from '../BottomNavigation/BottomNavigation';

interface MobileLayoutProps {
  topbarContent?: ReactNode;
  children: ReactNode;
}

export const MobileLayout = ({ topbarContent, children }: MobileLayoutProps) => {
  return (
    <div css={layoutStyle}>
      <TopBar>{topbarContent}</TopBar>
      <main css={contentStyle}>{children}</main>
      <BottomNavigation />
    </div>
  );
};

const layoutStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background-color: #fff;

  margin: 0 auto;
  position: relative;
`;

const contentStyle = css`
  flex: 1;
  width: 100%;
  padding-top: 88px; 
  padding-bottom: 60px; 
  box-sizing: border-box;
`;
