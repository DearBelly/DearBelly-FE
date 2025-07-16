/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { ReactNode } from 'react';

export interface ButtonProps {
  type?: 'primary' | 'secondary';
  size?: 'large' | 'medium' | 'small';
  width?: string;   
  height?: string;  
  disabled?: boolean;
  children: ReactNode;
  onClick?: () => void;
}

const baseStyle = css`
  display: inline-flex;
  padding: 0rem 1rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  border: none;
  cursor: pointer;
  border-radius: 6.1875rem;
  font-style: normal;
  font-feature-settings: 'liga' off, 'clig' off;
`;

const typeStyles = {
  primary: css`
    background: #FF6257;
    color: #f2f0f0;
  `,
  secondary: css`
    background: #E8E7E7;
    color: #202020;
  `,
  disabled: css`
    background: #F2F0F0;
    color: #D0D0D0;
    cursor: not-allowed;
  `,
};

const sizeStyles = {
  large: css`
    width: 7.6875rem;
    height: 3rem;
    font-size: 0.875rem;
    font-weight: 700;
    line-height: 1rem;
    letter-spacing: -0.00875rem;
  `,
  medium: css`
    width: 6.4375rem;
    height: 2.5rem;
    font-size: 0.75rem;
    font-weight: 400;
    line-height: 0.875rem;
    letter-spacing: -0.0075rem;
  `,
  small: css`
    width: 6.4375rem;
    height: 2rem;
    font-size: 0.75rem;
    font-weight: 400;
    line-height: 0.875rem;
    letter-spacing: -0.0075rem;
  `,
};

export const Button = ({
  type = 'primary',
  size = 'large',
  width,
  height,
  disabled = false,
  children,
  ...props
}: ButtonProps) => {
  const customSizeStyle = css({
    width,
    height,
  });

  const buttonStyle = [
    baseStyle,
    sizeStyles[size],
    customSizeStyle,
    disabled ? typeStyles.disabled : typeStyles[type],
  ];

  return (
    <button css={buttonStyle} disabled={disabled} {...props}>
      {children}
    </button>
  );
};
