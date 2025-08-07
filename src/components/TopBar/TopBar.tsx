/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ChevronLeft } from "@mynaui/icons-react";

export interface TopBarProps {
  mode?: 'logo' | 'back';
  backgroundType?: 'filled' | 'transparent';
  title?: string;
  firstIcon?: React.ReactNode;
  secondIcon?: React.ReactNode;
  logoColor?: string;
  backStepColor?: string;
  iconColor?: string;
  searchContent ?: React.ReactNode;
}

export const TopBar = ({
  mode = 'logo',
  backgroundType = 'filled',
  title,
  firstIcon,
  secondIcon,
  logoColor="#FF6257",
  backStepColor="#202020",
  iconColor = "#202020",
  searchContent
}: TopBarProps): React.ReactNode => {
  return (
    <header css={[containerStyle, backgroundType === 'transparent' ? transparentStyle : filledStyle]}>
      <div css={barStyle}>
        <div css={contentStyle}>
          {mode === 'logo' && (
            <div css={logoSectionStyle(logoColor)}>
              <img src="/logos/logo_text.svg" alt="logo" width={102} height={20} />
            </div>
          )}
          {mode === 'back' && !searchContent && (
            <div css={backSectionStyle(backStepColor)}>
              <ChevronLeft css={css`width: 24px; height: 24px;`} />
              {title && <span css={titleStyle}>{title}</span>}
            </div>
          )}
          {mode === 'back' && searchContent && (
            <div css={backSectionStyle(backStepColor)}>
              {searchContent}
            </div>
          )}
          <div css={iconGroupStyle(iconColor)}>
            {firstIcon}
            {secondIcon}
          </div>
        </div>
      </div>
    </header>
  );
};

const containerStyle = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
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

const logoSectionStyle = (logoColor: string) => css`
  display: flex;
  align-items: center;
  color: ${logoColor};
`;

const backSectionStyle = (backStepColor: string) => css`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  color: ${backStepColor};
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

const iconGroupStyle = (iconColor: string) => css`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  gap: 12px;
  color: ${iconColor};
`;
