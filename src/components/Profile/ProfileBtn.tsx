import React from 'react';
import styles from './ProfileBtn.module.css';

export interface ProfileBtnProps {
  children: React.ReactNode;
  variant?: 'large_pink' | 'regular_pink' | 'regular_gray';
  onClick?: () => void;
}

export const ProfileBtn = ({
  children,
  variant = 'large_pink',
  onClick,
}: ProfileBtnProps) => {
  return (
    <button
      className={
        styles.button +
        ' ' +
        (variant === 'large_pink'
          ? styles.large
          : variant === 'regular_pink'
          ? styles.pink
          : styles.gray)
      }
      onClick={onClick}
    >
      {children}
    </button>
  );
};
