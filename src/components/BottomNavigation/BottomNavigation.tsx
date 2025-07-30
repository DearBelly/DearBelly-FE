/** @jsxImportSource @emotion/react */
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
        <BottomNavigationItem icon={<BookOpenSolid />} label="정보" href="/Information/Information" isActive={pathname === '/info'} />
        <BottomNavigationItem icon={<HomeSmileSolid />} label="홈" href="/" isActive={pathname === '/'} />
        <BottomNavigationItem icon={<CenterFocusSolid />} label="스캔" href="/ComputerVision/Scan" isActive={pathname === '/scan'} />
        <BottomNavigationItem icon={<UserSquareSolid />} label="마이" href="/mypage" isActive={pathname === '/mypage'} />
      </div>
      <div css={bottomSpacerStyle} />
    </nav>
  );
};

const containerStyle = css`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);

  width: 100%;
  background: #fff;
  border-top: 0.5px solid #e8e7e7;
  border-right: 0.5px solid #e8e7e7;
  border-left: 0.5px solid #e8e7e7;
  border-radius: 1.25rem 1.25rem 0 0;

  display: flex;
  flex-direction: column;
`;

const contentStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1 0 0;
  align-self: stretch;

  height: calc(23.4 * 2.75rem); /* default: iOS 기준 */

  @media (max-width: 360px) {
    height: calc(22.5 * 3.5rem); /* AOS 기준 */
  }
`;

const bottomSpacerStyle = css`
  height: calc(100% - calc(23.4 * 2.75rem)); /* default: iOS 기준 */

  @media (max-width: 360px) {
    height: calc(100% - calc(22.5 * 3.5rem));
  }
`;