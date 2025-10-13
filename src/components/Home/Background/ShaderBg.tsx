'use client';

import React from 'react';
import { ShaderGradient, ShaderGradientCanvas } from '@shadergradient/react';

type Props = { urlString: string; style?: React.CSSProperties };

export default function ShaderBg({ urlString, style }: Props) {
  return (
    <ShaderGradientCanvas
      style={{ 
        position: 'absolute', 
        inset: 0, 
        width: '100%',
        height: '100%', 
        pointerEvents: 'none', 
        zIndex: 0, 
        contain: 'strict', 
        ...style 
      }}
    >
      <ShaderGradient control="query" urlString={urlString} />
    </ShaderGradientCanvas>
  );
}
