import React from 'react';
import styles from './PhotoBtn.module.css';
import { motion } from 'framer-motion';

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
    <motion.div
      whileTap={{ scale: 0.9 }}
      style={{ width: '100%', height: '100%' }}
    >
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
    </motion.div>
  );
};
