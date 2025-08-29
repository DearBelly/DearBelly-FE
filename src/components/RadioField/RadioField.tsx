import React from 'react';

interface RadioFieldProps {
  label: string;
  checked: boolean;
  onClick?: () => void;
  name?: string;
  value?: string; 
}

export const RadioField = ({ label, checked, onClick, name, value }: RadioFieldProps) => {
  return (
    <label
      style={{
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '0.25rem',   
        flexDirection: 'row',
      }}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onClick}
        style={{ display: 'none' }}
      />
      <span
        style={{
          width: '1rem',
          height: '1rem',
          border: '2px solid #D0D0D0',
          borderRadius: '50%',
          position: 'relative',
          display: 'inline-block',
        }}
      >
        {checked && (
          <span
            style={{
              width: '0.625rem',
              height: '0.625rem',
              background: '#FF6257',
              borderRadius: '50%',
              boxSizing: 'border-box',
              border: '1px solid var(--Border-Border, #E8E7E7)',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />
        )}
      </span>
      <span
        style={{
          color: checked ? '#202020' : '#D0D0D0',
          fontFeatureSettings: '"liga" off, "clig" off',
          fontFamily: 'var(--Font-Family-font-family, "NanumSquare Neo")',
          fontSize: '0.875rem',
          fontStyle: 'normal',
          fontWeight: 400,
          lineHeight: 'var(--Line-Height-line-height-XL, 1.875rem)',
          letterSpacing: '-0.0175rem',
        }}
      >
        {label}
      </span>
    </label>
  );
};