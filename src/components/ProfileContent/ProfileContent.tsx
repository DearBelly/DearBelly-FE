/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ChevronRight } from "@mynaui/icons-react";
import * as motion from "motion/react-client"
import React, { useState, useEffect } from "react"

interface ProfileContentProps {
    content: string;
    onClick?: () => void;

    showToggle?: boolean;
    onToggleChange?: (on:boolean) => void;
}

export const ProfileContent = ({
    content, 
    showToggle=false,
    onToggleChange,
    onClick
}:ProfileContentProps) => {
    const [isOn, setIsOn] = useState<boolean>(true);

    // 마운트 시 로컬 스토리지에 값 저장 
    useEffect(() => {
        const ligthMode_save = localStorage.getItem('lightMode');
        if(ligthMode_save !== null){
            setIsOn(ligthMode_save == 'true');
        } else {
            localStorage.setItem("lightMode", "true");
        }
    }, []);

    // 토글 클릭 시 상태 변경 
    const handleToggleClick = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        const next = !isOn;
        setIsOn(next);

        localStorage.setItem("lightMode", String(next));
        // 차크라 키 때문에 라이트, 다크 저장이 계속 차크라 기준으로 변하여 차크랍 값도 세팅
        localStorage.setItem('chakra-ui-color-mode', next ? 'light' : 'dark');
        onToggleChange?.(next);
    };

    return (
        <div 
            css={contentWrapper} 
            onClick={showToggle ? undefined : onClick}
            role={!showToggle && onClick ? 'button' : undefined}
        >
            <p css={contentStyle}>{content}</p>
            {showToggle ? (
                <button
                    css={toggleContainer(isOn)}
                    onClick={handleToggleClick}
                    aria-pressed={isOn}
                >
                    <motion.div
                    css={toggleHandle}
                    layout
                    transition={{ type: "spring", duration: 0.2, bounce: 0.2 }}
                    />
                </button>
            ) : (
                <ChevronRight/>
            )}
        </div>
    );
};

const contentWrapper = css`
    display: flex;  
    height: 2.5rem;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    padding-left: 0.5rem;
    cursor: pointer;
`;

const contentStyle = css`
    flex: 1;     
    color: var(--Text-Text-1, #202020);
    font-feature-settings: 'liga' off, 'clig' off;
    font-family: "NanumSquare Neo";
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.5rem; 
    letter-spacing: -0.0175rem;
    white-space: nowrap;       
    overflow: hidden;       
    text-overflow: ellipsis;      
    word-break: normal;
`;

const toggleContainer = (isOn: boolean) => css`
  width: 2.5rem;  
  height: 1.375rem;
  background: ${isOn ? '#FF6257' : '#ffa6a0'};
  border-radius: 9999px;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0.125rem;
  justify-content: ${isOn ? 'flex-end' : 'flex-start'};
  border: none;
`;

const toggleHandle = css`
  width: 1rem;
  height: 1rem;
  border-radius: 9999px;
  background: #FFF;
`;