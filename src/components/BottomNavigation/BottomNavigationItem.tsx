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
  justify-content: center;
  align-items: center;
  gap: 0.375rem;
  padding: 0.25rem 0 0.5625rem 0;
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
  font-size: var(--Primitive-sm, 0.75rem);
  font-style: normal;
  font-weight: 400;
  line-height: var(--Line-Height-line-height-S, 1.125rem);
  letter-spacing: -0.0075rem;
`;

const inactiveLabel = css`
  color: var(--Text-Text-2, #6C6B6B);
`;

const activeLabel = css`
  color: var(--Text-Text-7, #DE473D);
`;
