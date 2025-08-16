/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ReactNode } from 'react';

export interface ButtonProps {
  type?: 'primary' | 'secondary';
  size?: 'large' | 'medium' | 'small';
  width?: string;    
  isDisabled?: boolean;
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
  font-family: "NanumSquare Neo";
  font-weight: 800;
`;

const typeStyles = {
  primary: css`
    background: #FF6257;
    color: #f2f0f0;
  `,
  secondary: css`
    background: var(--BG-BG-4, #E8E7E7);
    color: var(--Text-Text-1);
  `,
  disabled: css`
    background: var(--BG-BG-2, #F2F0F0);
    color: #D0D0D0;
    cursor: not-allowed;
  `,
};

const sizeStyles = {
  large: css`
    width: 7.4375rem;
    height: 3rem;
    font-size: 0.75rem;
    line-height: 1.25rem; /* 166.667% */
    letter-spacing: -0.0075rem;
  `,
  medium: css`
    width: 6.1875rem;
    height: 2.5rem;
    font-size: 0.625rem;
    line-height: 0.875rem; /* 140% */
    letter-spacing: -0.00625rem;
  `,
  small: css`
    width: 6.1875rem;
    height: 2rem;
    font-size: 0.625rem;
    line-height: 0.875rem; /* 140% */
    letter-spacing: -0.00625rem;
  `,
};

export const Button = ({
  type = 'primary',
  size = 'large',
  width,
  isDisabled = false,
  children,
  onClick,
  ...props
}: ButtonProps) => {
  const customSizeStyle = css({
    width,
  });

  const buttonStyle = [
    baseStyle,
    sizeStyles[size],
    customSizeStyle,
    isDisabled ? typeStyles.disabled : typeStyles[type],
  ];

  return (
    <button 
      css={buttonStyle} 
      disabled={isDisabled} 
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};