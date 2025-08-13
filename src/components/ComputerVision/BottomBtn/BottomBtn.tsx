'use client';

/** @jsxImportSource @emotion/react */
import React from 'react';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';

export interface BottomBtnProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const StyledButton = styled.button`
  display: flex;
  width: calc(100% - 2.5rem);
  height: 2.5rem;
  margin: 1.25rem auto 2.12rem auto;
  align-items: center;
  justify-content: center;
  background: var(--Button-Solid-Primary, #FF6257);
  color: var(--text-text-5-inverse, #F2F0F0);
  font-family: 'NanumSquare Neo', sans-serif;
  font-size: 0.625rem;
  font-weight: 800;
  line-height: 0.875rem;
  letter-spacing: -0.00625rem;
  border: none;
  border-radius: 6.1875rem;
  cursor: pointer;
  transition: background 0.15s, opacity 0.15s;

  &:hover {
    opacity: 0.6;
  }
`;

const MotionButton = motion(StyledButton);

export const BottomBtn = ({ children, onClick }: BottomBtnProps) => {
  return (
    <MotionButton
      whileTap={{ scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
      onClick={onClick}
    >
      {children}
    </MotionButton>
  );
};
