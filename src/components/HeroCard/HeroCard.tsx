/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Image from 'next/image';
import { Button } from '@/components/Button';

const fallbackImage = '/images/default_image.png';

interface HeroCardProps {
  title: string;
  description: string;
  imageSrc?: string;
  mode: 'buttonMode' | 'imageMode';
}

export const HeroCard = ({ title, description, imageSrc, mode }: HeroCardProps) => {
  return (
    <div css={cardContainer}>
      <div css={textWrapper}>
        <h2 css={titleStyle}>{title}</h2>
        <p css={descriptionStyle}>{description}</p>
      </div>
      <div css={contentsSection}>
        {mode === 'imageMode' && (
          <Image
            src={imageSrc || fallbackImage}
            alt={title}
            width={120}
            height={80}
            css={imageStyle}
          />
        )}
        {mode === 'buttonMode' && (
          <Button size="large">바로가기</Button>
        )}
      </div>
    </div>
  );
};

const cardContainer = css`
  display: flex;
  width: 20.9375rem;
  padding: 1rem;
  gap: 1rem;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 1rem;
  background: var(--BG-BG-3, #fff);
`;

const textWrapper = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
`;

const titleStyle = css`
  color: var(--Text-Text-1, #202020);
  font-feature-settings: 'liga' off, 'clig' off;
  font-family: "NanumSquare Neo";
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 800;
  line-height: 1.375rem;
  letter-spacing: -0.0125rem;
  margin: 0;
  width: 100%;

  display: -webkit-box;
  -webkit-line-clamp: 2;  /* 두 줄까지만 표시 */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const descriptionStyle = css`
  height: 1rem;
  color: var(--Text-Text-2, #6C6B6B);
  font-feature-settings: 'liga' off, 'clig' off;
  font-family: "NanumSquare Neo";
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1rem;
  letter-spacing: -0.00875rem;
  margin: 0;
  width: 100%;

  overflow: hidden;  /* 한 줄까지만 표시 */
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const contentsSection = css`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.625rem;
  align-self: stretch;
`;

const imageStyle = css`
  width: 7.5rem;
  height: 5rem;
`;
