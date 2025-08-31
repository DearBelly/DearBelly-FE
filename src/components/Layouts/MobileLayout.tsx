/** @jsxImportSource @emotion/react */
"use client";
import { css } from "@emotion/react";
import { ReactNode } from "react";
import { TopBar } from "../TopBar/TopBar";
import { BottomNavigation } from "../BottomNavigation/BottomNavigation";
interface MobileLayoutProps {
  topbarContent?: ReactNode;
  children: ReactNode;
  hasTopPadding?: boolean;
  topbarMode?: "logo" | "back";
  topbarBackground?: "filled" | "transparent";
  topbarTitle?: string;
  showButtomNav?: boolean;
  searchbarContent?: ReactNode;
  backurl?:string;
}

export const MobileLayout = ({
  topbarContent,
  children,
  hasTopPadding = true,
  topbarMode = "logo",
  topbarBackground = "filled",
  topbarTitle,
  showButtomNav = true,
  searchbarContent,
}: MobileLayoutProps) => {
  return (
    <div css={layoutStyle}>
      {/* 백버튼일 경우, 클릭 시 뒤로가기 구현 */}
      <TopBar
        mode={topbarMode}
        backgroundType={topbarBackground}
        rightContent={topbarContent}
        title={topbarTitle}
        searchContent={searchbarContent}
      />
      <main
        css={[
          contentStyle,
          !hasTopPadding && noTopPaddingStyle,
          !showButtomNav && noBottomPaddingStyle,
        ]}
      >
        {children}
      </main>
      {showButtomNav && <BottomNavigation />}
    </div>
  );
};

const layoutStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 100vw;
  min-height: 100vh;
  background-color: var(--bg);
  margin: 0 auto;
  position: relative;
`;

const contentStyle = css`
  flex: 1;
  width: 100%;
  box-sizing: border-box;
  padding-right: 20px;
  padding-left: 20px;

  /* Top padding: iOS / AOS 기준 */
  padding-top: 44px; /* iOS */
  @media (max-width: 360px) {
    padding-top: 56px; /* AOS */
  }

  /* Bottom padding: iOS / AOS 기준 */
  padding-bottom: 54px; /* iOS */
  @media (max-width: 360px) {
    padding-bottom: 62px; /* AOS */
  }

  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
`;

const noTopPaddingStyle = css`
  padding-top: 0 !important;
`;

const noBottomPaddingStyle = css`
  padding-bottom: 0 !important;
`;