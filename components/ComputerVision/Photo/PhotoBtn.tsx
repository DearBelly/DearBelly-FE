import React from 'react';
import styles from './PhotoBtn.module.css';

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
  return (
    <button
      className={
        styles.button +
        ' ' +
        (variant === 'large'
          ? styles.large
          : variant === 'assistive'
          ? styles.assistive
          : styles.primary)
      }
      onClick={onClick}
    >
      {children}
    </button>
  );
};
