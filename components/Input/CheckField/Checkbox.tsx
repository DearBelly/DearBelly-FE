import React from 'react';

interface CheckBoxProps {
  label: string;
  checked: boolean;
  onClick?: () => void;
}

export const CheckBox = ({ label, checked, onClick }: CheckBoxProps) => {
    return (
      <div
        onClick={onClick}
        style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 16 }}
      >
        <img
          src={checked ? '/icons/check_active.svg' : '/icons/check_disabled.svg'}
          alt={checked ? '선택됨' : '비활성'}
          width={56}
          height={56}
        />
        <span
          style={{
            color: checked ? '#202020' : '#D0D0D0',
            fontWeight: 500,
            fontSize: 32,
          }}
        >
          {label}
        </span>
      </div>
    );
  };