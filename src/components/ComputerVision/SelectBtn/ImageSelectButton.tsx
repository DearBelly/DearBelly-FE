import React from 'react';
import { motion } from "framer-motion";
interface ImageSelectButtonProps {
  icon: React.ReactNode;
  text: string;
  onClick?: () => void;
}

export const ImageSelectButton = ({ icon, text, onClick }: ImageSelectButtonProps) => (
  <motion.div
    whileTap={{ scale: 0.9 }}
    style={{
      padding: '0 1.25rem',
      width: '100%',
      boxSizing: 'border-box',
    }}
  >
      <button
        style={{
            display: 'flex',
            width: '100%',
            height: '5.25rem',
            padding: '1rem',
            flexDirection: 'row',
            alignItems: 'center', 
            gap: '0.625rem',
            flexShrink: 0,
            borderRadius: '1rem',
            background: '#FFF',
            border: 'none',
            cursor: 'pointer',
            marginBottom: '2vh',
        }}
        onClick={onClick}
      >
        {icon}
        <span
            style={{
                color: '#202020',
                fontFamily: 'var(--Font-Family-font-family, "NanumSquare Neo")',
                fontSize: '0.85rem',
                fontStyle: 'normal',
                fontWeight: 'bold',
                lineHeight: 'var(--Line-Height-line-height-XL, 1.875rem)',
                letterSpacing: '-0.0175rem',
                marginLeft: '1rem',
            }}
        >
          {text}
        </span>
      </button>
  </motion.div>
);