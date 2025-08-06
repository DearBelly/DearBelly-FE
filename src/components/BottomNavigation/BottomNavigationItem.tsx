/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Link from 'next/link';

interface BottomNavigationItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  isActive?: boolean;
}

export const BottomNavigationItem = ({
  icon,
  label,
  href,
  isActive = false,
}: BottomNavigationItemProps) => {
  return (
    <Link href={href} css={linkStyle}>
      <div css={itemStyle}>
        <div
          css={[
            iconWrapperStyle,
            isActive ? activeIconColor : inactiveIconColor,
          ]}
        >
          {icon}
        </div>
        <span css={[labelStyle, isActive ? activeLabel : inactiveLabel]}>
          {label}
        </span>
      </div>
    </Link>
  );
};

const linkStyle = css`
  flex: 1 0 0;
  text-decoration: none;
`;

const itemStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  gap: 3px;
  padding-top: 4px;
  padding-bottom: 2px;
`;

const iconWrapperStyle = css`
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: 100%;
    height: 100%;
  }
`;

const inactiveIconColor = css`
  svg {
    fill: #949393;
  }
`;

const activeIconColor = css`
  svg {
    fill: #FF6257;
  }
`;

const labelStyle = css`
  text-align: center;
  font-feature-settings: 'liga' off, 'clig' off;
  font-size: 9px;
  font-style: normal;
  font-weight: 400;
  line-height: 11px;
  letter-spacing: -0.09px;
`;

const inactiveLabel = css`
  color: var(--Text-Text-2, #6C6B6B);
`;

const activeLabel = css`
  color: var(--Text-Text-7, #DE473D);
`;
