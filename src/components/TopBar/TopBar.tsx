/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';

interface TopBarProps {
  variant: 'logo' | 'back';
  children?: React.ReactNode;
  rightContent ?: React.ReactNode;
}

export const TopBar = ({ children, rightContent }: TopBarProps): React.ReactNode => {
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const scrollContainer = window;

    const handleScroll = () => {
      const scrollTop = scrollContainer.scrollY;

      if (scrollTop > lastScrollY && scrollTop > 50) {
        setVisible(false); 
      } else {
        setVisible(true);
      }

      setLastScrollY(scrollTop);
    };

    scrollContainer.addEventListener('scroll', handleScroll);
    return () => scrollContainer.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <header css={[containerStyle, !visible && hiddenStyle]}>
      <div css={statusBarStyle} />
      <div css={barStyle}>
        <div css={contentStyle}>
          <div style={{flex:1}}>
            {children}
          </div>
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
  background-color: #F9F7F7;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  transition: transform 0.1s ease-in-out;

  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  max-height: 88px;
  z-index: 1000;

  @media (max-width: 360px) {
    max-height: 92px;
  }
`;

const hiddenStyle = css`
  transform: translate(-50%, -100%);
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
  flex-direction: row;
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