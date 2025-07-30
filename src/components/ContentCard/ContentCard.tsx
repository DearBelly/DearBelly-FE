/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Image from 'next/image';

const fallbackImage = '/images/default_image.png';
export interface ContendCardProps {
  title: string;
  description: string;
  imageSrc?: string;
}

export const ContendCard = ({ title, description, imageSrc}: ContendCardProps) => {
  return (
    <div css={cardContainer}>
      <div css={textWrapper}>
        <h2 css={titleStyle}>{title}</h2>
        <p css={descriptionStyle}>{description}</p>
      </div>
      <div>
        <div css={imageWrapperStyle}>
            <Image
              src={imageSrc || fallbackImage}
              alt={title}
              fill
              style={{ objectFit: 'cover' }}
            />
        </div>
      </div>
    </div>
  );
};

const cardContainer = css`
  display: flex;
  width: 20.9375rem;
  padding: 0.75rem 0;
  flex-direction: row;      
  align-items: center;
  justify-content: space-between;
  gap: 0.625rem;
  border-bottom: 0.0625rem solid #E8E7E7;
`;

const textWrapper = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  padding: 0.75rem 0;
`;

const titleStyle = css`
  overflow: hidden;
  color: var(--Text-Text-1, #202020);
  font-feature-settings: 'liga' off, 'clig' off;
  text-overflow: ellipsis;
  font-family: "NanumSquare Neo";
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 800;
  line-height: 1.125rem; 
  letter-spacing: -0.00875rem;
`;

const descriptionStyle = css`
  overflow: hidden;
  color: var(--Text-Text-3, #949393);
  font-feature-settings: 'liga' off, 'clig' off;
  text-overflow: ellipsis;
  font-family: "NanumSquare Neo";
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1rem; 
  letter-spacing: -0.0075rem;
  margin-top: 0.5rem;
`;

const imageWrapperStyle = css`
  position: relative;
  width: 4rem;
  height: 4rem;
  overflow: hidden;
  flex-shrink: 0;
  border-radius: 0.5rem;
`;
