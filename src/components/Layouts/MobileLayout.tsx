/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ReactNode } from 'react';
import { TopBar } from '../TopBar/TopBar';
import { BottomNavigation } from '../BottomNavigation/BottomNavigation';
import Image from 'next/image';

interface MobileLayoutProps {
  topbarContent?: ReactNode;
  children: ReactNode;
}

export const MobileLayout = ({ topbarContent, children }: MobileLayoutProps) => {
  return (
    <div css={layoutStyle}>
      <TopBar 
        mode={topbarMode} 
        backgroundType={topbarBackground} 
        rightContent={topbarContent}
        title={topbarTitle}
        searchContent={searchbarContent}
      />
      <main css={[contentStyle, !hasTopPadding && noTopPaddingStyle, !showButtomNav && noBottomPaddingStyle ]}>
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
  min-height: 100vh;
  background-color: #F9F7F7;

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


const noTopPaddingStyle = css`
  padding-top: 0 !important;
`;

const noBottomPaddingStyle = css`
  padding-bottom: 0 !important;
`;