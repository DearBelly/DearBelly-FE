/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

interface TopBarProps {
  children: React.ReactNode;
}

export const TopBar = ({ children }: TopBarProps) => {
  return (
    <header css={containerStyle}>
      <div css={statusBarStyle} />
      <div css={barStyle}>
        <div css={contentStyle}>
          {children}
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

  max-height: 88px;

  @media (max-width: 360px) {
    max-height: 92px;
  }
`;

const statusBarStyle = css`
  height: 44px;

  @media (max-width: 360px) {
    height: 36px;
  }
`;

const barStyle = css`
  height: 44px;

  @media (max-width: 360px) {
    height: 56px;
  }

  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const contentStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  width: 100%;
  max-width: 375px;
  padding: 0 20px;
  height: 100%; 

  @media (max-width: 360px) {
    max-width: 360px;
  }

  & > * {
    height: 24px;
  }
`;
