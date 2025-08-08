import React from 'react';
import styles from './NoticeBox.module.css';
export interface NoticeBoxProps {
  label: string;
}

export const NoticeBox = ({ label }: NoticeBoxProps) => {
  return (
    <div className={styles.noticebox}>
        <span className={styles.label}>{label}</span>
    </div>
  );
};
