import React from 'react';
import { FunnyCircleSolid } from "@mynaui/icons-react";

export const Toast = () => (
  <div style={{
    display: 'flex',
    width: 'calc(100vw - 2.5rem)',
    height: '3rem',
    flexDirection: 'row',
    alignItems: 'center',        
    gap: '0.5rem',
    borderRadius: '6.1875rem',
    background: 'var(--Toast-Toast-BG, rgba(0, 0, 0, 0.50))',
    backdropFilter: 'blur(5px)',
    paddingLeft: '0.5rem',
    margin: '0 1.25rem'
  }}>
    <div 
        className='iconBox' 
        style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '2rem', 
            height: '2rem', 
            borderRadius: '50%', 
            backgroundColor: 'var(--Background-3, #FFF)'
        }}
    >
        <FunnyCircleSolid color='var(--Toast-Background, rgba(0, 0, 0, 0.50))'/>
    </div>
    <span
    style={{
        color: 'var(--Text-5, #F2F0F0)',
        fontFeatureSettings: "'liga' off, 'clig' off",
        fontFamily: '"NanumSquare Neo"',
        fontSize: '0.875rem',
        fontStyle: 'normal',
        fontWeight: 700,
        lineHeight: '1.25rem', 
        letterSpacing: '-0.00875rem',
    }}
    >
        변경이 완료되었습니다
    </span>
  </div>
);

