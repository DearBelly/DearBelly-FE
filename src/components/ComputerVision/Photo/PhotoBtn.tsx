'use client';

import React from 'react';
import { Box } from '@chakra-ui/react';

export interface PhotoBtnProps {
  children: React.ReactNode;
  variant?: 'primary' | 'assistive' | 'large';
  onClick?: () => void;
}

export const PhotoBtn = ({
  children,
  variant = 'primary',
  onClick,
}: PhotoBtnProps) => {

  const baseStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    fontFamily: '"NanumSquare Neo", sans-serif',
    fontWeight: 800,
    fontSize: '0.625rem',
    lineHeight: '0.875rem',
    letterSpacing: '-0.00625rem',
    border: 'none',
    borderRadius: '6.1875rem',
    px: '1.5rem',
    py: '0.5rem',
    cursor: 'pointer',
    transition: 'background 0.15s, opacity 0.15s',
    flex: 1,
    _hover: { opacity: 0.6 },
  };

  const variantStyles = {
    primary: {
      w: '100%',
      h: '2.5rem',
      bg: 'var(--Button-Solid-Primary, #FF6257)',
      color: 'var(--text-text-5-inverse, #F2F0F0)',
    },
    assistive: {
      w: '100%',
      h: '2.5rem',
      bg: 'var(--Button-Solid-Assistive, #E8E7E7)',
      color: 'var(--Text-Text-1, #202020)',
    },
    large: {
      w: '100%',
      h: '2.5rem',
      bg: 'var(--Button-Solid-Primary, #FF6257)',
      color: 'var(--text-text-5-inverse, #F2F0F0)',
    },
  };

  return (
    <Box
      as="button"
      onClick={onClick}
      {...baseStyles}
      {...variantStyles[variant]}
    >
      {children}
    </Box>
  );
};
