/** @jsxImportSource @emotion/react */
import React, {useState} from 'react';
import { css } from '@emotion/react';
import Image from 'next/image';

export interface CategoryIconProps {
    name: string;
    imageSrc?: string;
    onClick?: () => void;
    isSelected?: boolean;
}

export const CategoryIcon = ({ name, imageSrc, onClick, isSelected = false}: CategoryIconProps) => {    
    return (
        <div css={wrapper} onClick={onClick}>
            <div css={[icon_wrapper, isSelected && select_icon_wrapper]}>
                {imageSrc && (
                    <Image src={imageSrc} alt={name} width={40} height={40}/>
                )}
            </div>
            <div css={text_wrapper}>{name}</div>
        </div>
    );
};

const wrapper = css`
  display: relative;
  width: 2.88rem;
  height: 4rem;   
  align-items: center;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  display: flex;
  justify-content: center;
  cursor: pointer;
`;

const select_icon_wrapper = css`
  border: 2px solid var(--Text-Text-1, #202020);
`;

const icon_wrapper = css`
    width: 2.75rem;
    height: 2.75rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0.75rem;
    background-color: var(--BG-BG-3);
    
`;

const text_wrapper = css`
    overflow: hidden;
    color: var(--Text-Text-1, #202020);
    text-align: center;
    font-feature-settings: 'liga' off, 'clig' off;
    text-overflow: ellipsis;
    font-family: "NanumSquare Neo";
    font-size: 0.625rem;
    font-style: normal;
    font-weight: 700;
    line-height: 0.75rem; 
`;