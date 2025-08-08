import React from 'react';
import styles from './SocialLoginButton.module.css';

export interface SocialLoginButtonProps {
  provider: 'naver' | 'google' | 'kakao';
  onClick?: () => void;
}

const providerInfo = {
  naver: {
    label: '네이버 계정으로 시작하기',
    icon: '/logos/naver.svg',
  },
  google: {
    label: '구글 계정으로 시작하기',
    icon: '/logos/google.svg',
  },
  kakao: {
    label: '카카오 계정으로 시작하기',
    icon: '/logos/kakao.svg',
  },
};

export const SocialLoginButton = ({ provider, onClick }: SocialLoginButtonProps) => {
  const { label, icon } = providerInfo[provider];

  return (
    <button className={`${styles.button} ${styles[provider]}`} onClick={onClick}>
      <img src={icon} alt={`${provider} 아이콘`} className={styles.icon} />
      <span>{label}</span>
    </button>
  );
};
