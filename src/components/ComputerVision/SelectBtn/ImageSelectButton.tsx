import React from 'react';

interface ImageSelectButtonProps {
  icon: React.ReactNode;
  text: string;
  onClick?: () => void;
}

export const ImageSelectButton = ({ icon, text, onClick }: ImageSelectButtonProps) => (
    <button
    style={{
        display: 'flex',
        width: '20.9375rem',
        height: '6rem',
        padding: '1rem',
        flexDirection: 'row',
        alignItems: 'center', 
        gap: '0.625rem',
        flexShrink: 0,
        borderRadius: '1rem',
        background: '#E8E7E7',
        border: 'none',
        cursor: 'pointer',
    }}
    onClick={onClick}
  >
    {icon}
    <span
        style={{
            color: '#202020',
            fontFamily: 'var(--Font-Family-font-family, "NanumSquare Neo")',
            fontSize: '1.25rem',
            fontStyle: 'normal',
            fontWeight: 'bold',
            lineHeight: 'var(--Line-Height-line-height-XL, 1.875rem)',
            letterSpacing: '-0.0175rem',
            marginLeft: '1rem',
        }}
    >{text}</span>
  </button>
);