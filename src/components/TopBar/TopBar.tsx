/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ChevronLeft } from "@mynaui/icons-react";

export interface TopBarProps {
  mode?: 'logo' | 'back';
  backgroundType?: 'filled' | 'transparent';
  title?: string;
  rightContent ?: React.ReactNode;
  searchContent ?: React.ReactNode;
}

export const TopBar = ({
  mode = 'logo',
  backgroundType = 'filled',
  title,
  rightContent,
  // 서치바 전용 props 추가함
  searchContent
}: TopBarProps): React.ReactNode => {
  return (
    <header css={[containerStyle, backgroundType === 'transparent' ? transparentStyle : filledStyle]}>
      <div css={barStyle}>
        <div css={contentStyle}>
          {mode === 'logo' && (
            <div css={logoSectionStyle}>
              <img src="/logos/logo_text.svg" alt="logo" width={102} height={20} />
            </div>
          )}
          {mode === 'back' && (
            <div css={backSectionStyle}>
              <ChevronLeft css={css`width: 24px; height: 24px;`} />
              {title && <span css={titleStyle}>{title}</span>}
            </div>
          )}
          {/* 서치바의 경우, 가운데에 위치해야 함 */}
          {searchContent && (
            <div css={centerStyle}>
              {searchContent}
            </div>
          )}
          {rightContent && (
            <div style={{ marginLeft: "auto", display: "flex" }}>
              {rightContent}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

const containerStyle = css`
  background-color: rgba(249, 247, 248, 0.5);
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1000;
`;

const transparentStyle = css`
  background-color: transparent;
`;

const filledStyle = css`
  background-color: #F9F7F7;
`;

const barStyle = css`
  height: 44px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 360px) {
    height: 56px;
  }
`;

const contentStyle = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 20px;
  height: 100%;
`;

const logoSectionStyle = css`
  display: flex;
  align-items: center;
`;

const backSectionStyle = css`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  gap: 8px;
`;

const titleStyle = css`
  color: var(--Text-Text-1, #202020);
  font-family: "NanumSquare Neo";
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: -0.32px;
`;

// 서치바 스타일 추가
const centerStyle = css`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  `;