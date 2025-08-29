/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useRouter } from "next/navigation";
import Image from 'next/image';

const fallbackImage = '/images/default_image.png';
export interface ContendCardProps {
  id: number;
  title: string;
  description: string;
  imageSrc?: string;
  routerSrc?: string;
  onClick?: () => void;
  isLast?: boolean;
}

export const ContendCard = ({ id, title, description, imageSrc, isLast }: ContendCardProps) => {
  // 각 컨텐트 카드를 클릭하면 해당 id의 디테일 페이지가 보이도록 수정 필요함 
  const router = useRouter();
  const handleDetailClick = () => {
    router.push(`/info/detail`);
  };

  return (
    <div css={cardContainer(isLast)} onClick={handleDetailClick}>
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

const cardContainer = (isLast?: boolean) => css`
  display: flex;
  width: 20.9375rem;
  padding: 0.75rem 0;
  flex-direction: row;      
  align-items: center;
  justify-content: space-between;
  gap: 0.625rem;
  cursor: pointer;
  border-bottom: ${isLast ? 'none' : '0.0625rem solid #E8E7E7'};
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
