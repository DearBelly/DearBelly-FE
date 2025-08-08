/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';

export interface InputBoxProps {
  mode: 'default' | 'transparent';
  title: string;
  placeholder?: string;
  icon?: React.ReactNode;
  message?: string;
  errorMessage?: string;
  isError?: boolean;
  onClick?: () => void;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputBox = ({
  mode,
  title,
  placeholder = '텍스트를 입력해 주세요',
  icon,
  message,
  errorMessage,
  isError = false,
  onClick,
  value,
  onChange,
}: InputBoxProps) => {
  const displayMessage = isError ? errorMessage : message;

  return (
    <div css={wrapperStyle}>
      <div css={textboxStyle(mode)}>
        <span css={titleStyle}>{title}</span>
        <div css={contentWrapperStyle}>
          <input
            type="text"
            placeholder={placeholder}
            css={inputStyle}
            onClick={onClick}
            aria-label={title}
            value={value}
            onChange={onChange}
          />
          {icon && <span css={iconStyle}>{icon}</span>}
        </div>
      </div>
      {displayMessage && (
        <span css={messageStyle(isError)} aria-live="polite">
          {displayMessage}
        </span>
      )}
    </div>
  );
};

const wrapperStyle = css`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const textboxStyle = (mode: 'default' | 'transparent') => css`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 1rem;
  background: ${mode === 'default' ? '#fff' : 'transparent'};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 0.75rem 1rem;
  gap: 0.25rem;
`;

const titleStyle = css`
  font-family: 'NanumSquare Neo';
  font-weight: 800;
  font-size: 10px;
  line-height: 14px;
  letter-spacing: -0.1px;
  color: #202020;
  font-style: normal;
`;

const contentWrapperStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
`;

const inputStyle = css`
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  font-weight: 400;
  font-style: normal;
  font-size: 12px;
  line-height: 24px;
  letter-spacing: -0.24px;
  font-family: 'NanumSquare Neo';
  background-color: transparent;
  color: #202020;

  &::placeholder {
    color: #d0d0d0;
  }
`;

const iconStyle = css`
  position: flex;
  width: 20px;
  height: 20px;
  color: #949393;
`;

const messageStyle = (isError: boolean) => css`
  font-family: 'NanumSquare Neo';
  margin-top: 0.5rem;
  margin-left: 1rem;
  font-weight: 400;
  font-size: 10px;
  line-height: 14px;
  letter-spacing: -0.1px;
  color: ${isError ? '#FF7B00' : '#949393'};
  font-style: normal;
`;
