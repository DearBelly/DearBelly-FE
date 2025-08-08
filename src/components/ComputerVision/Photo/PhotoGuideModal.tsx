/** @jsxImportSource @emotion/react */
import React, { useState, useRef, useCallback } from 'react';
import { css } from '@emotion/react';

interface PhotoGuideModalProps {
  children?: React.ReactNode;
  onImageUpload?: (file: File) => void;
}

export const PhotoGuideModal = ({ children, onImageUpload }: PhotoGuideModalProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = useCallback((file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        onImageUpload?.(file);
      };
      reader.readAsDataURL(file);
    }
  }, [onImageUpload]);

  const handleFileInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  }, [handleFileSelect]);

  const handleDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(false);

    const files = event.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  }, [handleFileSelect]);

  const handleClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  return (
    <div css={wrapper}>
      <div css={modalWrapper}>
        <div css={contentWrapper}>
          <h3 css={title}>의약품 촬영 가이드</h3>
          {/* 이미지 영역 */}
            <div
              css={[imageArea, (isDragOver || isHovered) && activeBorder]}
              onClick={handleClick}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {selectedImage ? (
                <img
                  src={selectedImage}
                  alt="업로드된 이미지"
                  css={imageStyle}
                />
              ) : (
                <div css={placeholderText}></div>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleFileInputChange}
              style={{ display: 'none' }}
            />
          <div css={guideText}>
            한 번에 한 장씩만 찍어주세요<br />
            정확한 각도에서 촬영해주세요
          </div>
        </div>

        <div css={btnWrapper}>{children}</div>
      </div>
    </div>
  );
};

const wrapper = css`
  width: 100%;
  height: 100%;
  padding: 0 2.81rem;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const modalWrapper = css`
  position: relative;
  border-radius: 1.25rem;
  padding: 1.75rem 1rem 1rem 1rem;
  background: var(--BG-BG-3, #fff);
  width: 100%;
  height: 100%;
  box-sizing: content-box;
  align-items: flex-start;
`;

const contentWrapper = css`
  padding: 0 3.22rem;
  width: 100%;
  height: 100%;
`;

const title = css`
  font-family: var(--Font-Family-font-family, "NanumSquare Neo");
  font-size: 0.875rem;;
  color: var(--Text-Text-1, #202020);
  text-align: center;
  font-feature-settings: 'liga' off, 'clig' off;
  font-style: normal;
  font-weight: 600;
  line-height: var(--Line-Height-line-height-S, 1.125rem);
  letter-spacing: -0.01rem;
  margin-bottom: 1rem;
  margin-top: -0.5rem;
  white-space: normal;
  word-break: keep-all;
  overflow-wrap: break-word;
`;

const imageArea = css`
  width: 100%;
  aspect-ratio: 1 / 1;
  flex-shrink: 0;
  margin: 0 auto 1rem;
  border: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: #f8f9fa;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
`;

const activeBorder = css`
  border: 1px solid #8c8c8c;
`;

const imageStyle = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const placeholderText = css`
  text-align: center;
  color: #666;
  font-size: 0.875rem;
`;

const guideText = css`
  color: var(--Text-Text-1, #202020);
  text-align: center;
  font-feature-settings: 'liga' off, 'clig' off;
  font-family: "NanumSquare Neo";
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1rem; 
  letter-spacing: -0.006rem;
  /* white-space: normal;
  word-break: keep-all;
  overflow-wrap: break-word; */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const btnWrapper = css`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  margin-top: 1.5rem;
`;
