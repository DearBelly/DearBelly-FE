/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from '@mynaui/icons-react';

const fallbackImage = '/images/default_image.svg';

interface InlineCardProps {
  imageDescription: string;
  description: string;
  shortcutLink: string;
  shortcutHref: string;
  imageSrc?: string;
}

export const InlineCard = ({
  imageDescription,
  description,
  shortcutLink,
  shortcutHref,
  imageSrc,
}: InlineCardProps) => {
  return (
    <div css={cardContainer}>
      <div css={textWrapper}>
        <p css={descriptionStyle}>{description}</p>
        <div css={shortcutWrapper}>
          <Link
            href={shortcutHref}
            css={shortcutLinkStyle}
            aria-label={`${shortcutLink} 페이지로 이동`}
          >
            {shortcutLink}
            <ChevronRight css={iconStyle} />
          </Link>
        </div>
      </div>
      <div css={imageWrapperStyle}>
        <Image
          src={imageSrc || fallbackImage}
          alt={imageDescription}
          fill
          style={{ objectFit: 'cover' }}
        />
      </div>
    </div>
  );
};

const cardContainer = css`
  height: 6rem;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 20.9375rem;
  padding: 1rem;
  gap: 0.75rem;
  border-radius: 1rem;
  background: var(--BG-BG-4, #e8e7e7);
`;

const textWrapper = css`
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const descriptionStyle = css`
  color: var(--Text-Text-2, #6c6b6b);
  font-feature-settings: 'liga' off, 'clig' off;
  margin: 0;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1rem;
  letter-spacing: -0.00875rem;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const shortcutWrapper = css`
  display: flex;
  align-items: center;
`;

const shortcutLinkStyle = css`
  color: var(--Text-Text-8, #de473d);
  font-size: 0.75rem;
  font-weight: 800;
  line-height: 0.875rem;
  letter-spacing: -0.0075rem;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
`;

const iconStyle = css`
  width: 1.25rem;
  height: 1.25rem;
`;

const imageWrapperStyle = css`
  position: relative;
  width: 4rem;
  height: 4rem;
  overflow: hidden;
  flex-shrink: 0;
`;