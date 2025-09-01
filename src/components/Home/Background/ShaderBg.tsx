'use client';

import React from 'react';
import { ShaderGradient, ShaderGradientCanvas } from '@shadergradient/react';

type Props = { urlString: string; style?: React.CSSProperties };

export default function ShaderBg({ urlString, style }: Props) {
  return (
    <ShaderGradientCanvas
      style={{ position: 'absolute', inset: 0, width: '100dvw', height: '100dvh', pointerEvents: 'none', zIndex: 0, ...style }}
    >
      <ShaderGradient control="query" urlString={urlString} />
    </ShaderGradientCanvas>
  );
}
