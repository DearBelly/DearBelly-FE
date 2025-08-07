/** @jsxImportSource @emotion/react */
"use client"
import { css } from '@emotion/react';
import { usePathname } from 'next/navigation';
import { BottomNavigationItem } from './BottomNavigationItem';
import { CalendarSolid, BookOpenSolid, HomeSmileSolid, CenterFocusSolid, UserSquareSolid } from '@mynaui/icons-react';

export const BottomNavigation = () => {
  const pathname = usePathname();

  return (
    <nav css={containerStyle}>
      <div css={contentStyle}>
        <BottomNavigationItem icon={<CalendarSolid />} label="일정" href="/schedule" isActive={pathname === '/schedule'} />
        <BottomNavigationItem icon={<BookOpenSolid />} label="정보" href="/info" isActive={pathname === '/info'} />
        <BottomNavigationItem icon={<HomeSmileSolid />} label="홈" href="/" isActive={pathname === '/'} />
        <BottomNavigationItem icon={<CenterFocusSolid />} label="스캔" href="/scan" isActive={pathname === '/scan'} />
        <BottomNavigationItem icon={<UserSquareSolid />} label="마이" href="/mypage" isActive={pathname === '/mypage'} />
      </div>
    </nav>
  );
};

const containerStyle = css`
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 1000;
  width: 100%;
  background: #fff;
  border-top: 0.5px solid #e8e7e7;
  border-right: 0.5px solid #e8e7e7;
  border-left: 0.5px solid #e8e7e7;
  border-radius: 1.25rem 1.25rem 0 0;
  padding-bottom: 10px;
`;

const contentStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;

  height: 44px; /* default: iOS 기준 */

  @media (max-width: 360px) {
    height: 52px; /* AOS 기준 */
  }
`;