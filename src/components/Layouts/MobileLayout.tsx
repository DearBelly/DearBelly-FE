/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ReactNode } from 'react';
import { TopBar } from '../TopBar/TopBar';
import { BottomNavigation } from '../BottomNavigation/BottomNavigation';

// 서치바 추가 외 TOPBAR변경 내용 반영을 위해 인터페이스의 PROPS 요소 추가함
interface MobileLayoutProps {
  topbarContent?: ReactNode;
  children: ReactNode;
  hasTopPadding?: boolean;
  topbarMode?: 'logo' | 'back';
  topbarBackground?: 'filled' | 'transparent';
  topbarTitle?: string;
  showButtomNav?: boolean;
  searchbarContent?: ReactNode;
}

export const MobileLayout = ({ topbarContent, children, hasTopPadding=true, topbarMode='logo', topbarBackground='filled', topbarTitle, showButtomNav=true, searchbarContent}: MobileLayoutProps) => {
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
  padding-top: 50px; 
  padding-bottom: 60px; 
  box-sizing: border-box;
`;


const noTopPaddingStyle = css`
  padding-top: 0 !important;
`;

const noBottomPaddingStyle = css`
  padding-bottom: 0 !important;
`;