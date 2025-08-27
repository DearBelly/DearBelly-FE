/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { DotsVertical } from "@mynaui/icons-react";
import { DropdownMenu } from '../DropdownMenu/DropdownMenu';
import { useState, useRef, useEffect } from "react";

export interface ProfileListProps {
  id?: number;
  profileSrc?: string;
  name: string;
  mode: "default" | "transparent";
  isMe?: boolean;
  isDot?: boolean;
  babyGender?: string;
}

export const ProfileList = ({ mode='transparent', profileSrc, name='알 수 없음', isMe=false, isDot=false, babyGender }: ProfileListProps) => {
  const [open, setOpen] = useState(false);
  const iconRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e:MouseEvent) => {
      if(iconRef.current && !iconRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div css={ListContainer(mode)}>
        <div css={profileWrapper}>
            <div css={profile}>
                <img 
                    src={profileSrc || '/images/profile.svg'} 
                    alt='프로필 기본'
                    css={profileImg}
                />
                { isMe &&
                <img 
                    src='/images/me.svg'
                    alt='내 표시'
                    css={isMeImg}
                />
                }
            </div>
        </div>

        <div css={nameWrapper}>{name}</div>

      {isDot && (
        <div ref={iconRef} css={dotsIconWrapper}>
          <DotsVertical css={dotsIcon} onClick={() => setOpen((prev) => !prev)} />
          {open && (
            <div css={dropdownPosition}>
              <DropdownMenu />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const ListContainer = (mode: "default" | "transparent") => css`
  width: calc(100vw - 2.5rem);
  height: 3.5rem; 
  justify-content: flex-start;
  padding-left: 1rem;
  padding-right: 1rem;
  display: flex;
  align-items: center;
  gap: 0.62rem;
  /* background-color: ${mode === "default" ? "var(--bg-bg3)" : "transparent"}; */
  background-color: ${mode === "default" ? "var(--Background-3, #FFF)" : "transparent"};
  border-radius: 0.75rem;
`;

const profileWrapper = css`
  width: 2.5rem;
  height: 2.5rem; 
`;

const profile = css`
    position: relative;
    width: 2.5rem;
    height: 2.5rem; 
    border-radius: 50%;
`;

const profileImg = css`
    width: 100%;
    height: 100%;
    object-fit: cover; 
    display: block;
`;

const isMeImg = css`
    position: absolute;
    bottom: 0; 
    right: 0;   
`;

const nameWrapper = css`
    overflow: hidden;
    color: var(--Text-1, #202020);
    font-feature-settings: 'liga' off, 'clig' off;
    text-overflow: ellipsis;
    font-family: "NanumSquare Neo";
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 700;
    line-height: 1.25rem; 
    letter-spacing: -0.00875rem;
`;

const dotsIcon = css`
    margin-left: auto;
    cursor: pointer;
`;

const dotsIconWrapper = css`
  margin-left: auto;
  position: relative;
`;

const dropdownPosition = css`
  position: absolute;
  top: 100%;   
  right: 0;   
  margin-top: 0.25rem;
  z-index: 1000;
`;