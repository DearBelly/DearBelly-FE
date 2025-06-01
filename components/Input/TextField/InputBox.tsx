import React from 'react';
import styles from './InputBox.module.css';
import { IoIosSend } from "react-icons/io";

const icon = <IoIosSend size={24} color="#000" />;

export interface InputBoxProps {
  provider: 'default' | 'active';
  onClick?: () => void;
}

const providerInfo = {
  default: {
    title: '주제',
    star: '*',
    detail: '텍스트를 입력해 주세요',
    icon: icon,
  },
  active: {
    title: '주제',
    star: '*',
    detail: '텍스트를 입력해 주세요',
    icon: icon,
  },
};

export const InputBox = ({ provider, onClick }: InputBoxProps) => {
  const { title, detail, star, icon } = providerInfo[provider];

  return (
    <div className={`${styles.textbox} ${styles[provider]}`}>
      <span className={styles.title}>{title}</span>
      <span className={styles.star}>{star}</span>
      <input
        type="text"
        placeholder={detail}
        className={styles.input}
        onClick={onClick}
      />
      <span className={styles.icon}>{icon}</span>
    </div>
  );
};
