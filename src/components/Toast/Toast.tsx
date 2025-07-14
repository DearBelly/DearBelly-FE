import React from 'react';

interface ToastProps {
  icon: React.ReactNode;
  message: string;
}

export const Toast = ({ icon, message }: ToastProps) => (
  <div style={{
    display: 'flex',
    width: '20.4375rem',
    height: '3rem',
    padding: '0.5rem 1.625rem 0.5rem 0.5rem',
    flexDirection: 'row',
    alignItems: 'center',        
    gap: '0.5rem',
    borderRadius: '6.1875rem',
    background: 'var(--Toast-Toast-BG, rgba(0, 0, 0, 0.50))',
    backdropFilter: 'blur(5px)',
    paddingLeft: '2rem',
  }}>
    {icon}
    <span style={{
        color: 'var(--text-text-5-inverse, #F2F0F0)',
        fontFeatureSettings: 'liga off, clig off',
        fontFamily: 'var(--Font-Family-font-family, "NanumSquare Neo")',
        fontSize: 'var(--Primitive-md, 1.1rem)',
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: 'var(--Line-Height-line-height-M, 1.5rem)',
        letterSpacing: '-0.00875rem',
    }}>{message}</span>
  </div>
);


