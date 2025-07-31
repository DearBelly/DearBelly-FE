/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';

export interface InputBoxProps {
  variant: 'default' | 'transparent';
  title: string;
  detail?: string;
  icon?: React.ReactNode;
  message?: string;
  errorMessage?: string;
  isError?: boolean;
  onClick?: () => void;
}

export const InputBox = ({
  variant,
  title,
  detail = '텍스트를 입력해 주세요',
  icon,
  message,
  errorMessage,
  isError = false,
  onClick,
}: InputBoxProps) => {
  const displayMessage = isError ? errorMessage : message;

  return (
    <div css={wrapperStyle}>
      <div css={textboxStyle(variant)}>
        <span css={titleStyle}>{title}</span>
        <input
          type="text"
          placeholder={detail}
          css={inputStyle}
          onClick={onClick}
          aria-label={title}
        />
        {icon && <span css={iconStyle}>{icon}</span>}
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
  width: 20.9375rem;
`;

const textboxStyle = (variant: 'default' | 'transparent') => css`
  position: relative;
  width: 100%;
  height: 5rem;
  border-radius: 1rem;
  background: ${variant === 'default' ? '#fff' : 'transparent'};
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
  position: absolute;
  top: 50%;
  right: 1rem;
  transform: translateY(-50%);
`;

const messageStyle = (isError: boolean) => css`
  font-family: 'NanumSquare Neo';
  margin-top: 0.5rem;
  margin-left: 1rem;
  font-weight: 400;
  font-size: 10px;
  line-height: 14px;
  letter-spacing: -0.1px;
  color: ${isError ? '#FF4242' : '#949393'};
  font-style: normal;
`;
