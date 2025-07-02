import React from 'react';
import styles from './NoticeBox.module.css';

export interface NoticeBoxProps {
  label: string;
  onClick?: () => void;
}

export const NoticeBox = ({ label, onClick }: NoticeBoxProps) => {
  return (
    <div onClick={onClick}
        className={styles.noticebox}
    >
        <span className={styles.label}>{label}</span>
    </div>
  );
};
