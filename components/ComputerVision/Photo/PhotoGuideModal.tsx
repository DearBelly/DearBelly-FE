import React, { useState, useRef, useCallback } from 'react';

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
    <div style={{
      border: '0.8px solid',
      borderRadius: '1.25rem',
      padding: '1.75rem 1rem 1rem 1rem',
      background: 'var(--BG-BG-3, #FFF)',
      width: '17.8125rem',
      height: '25.5rem',
      margin: '0 auto',
      alignItems: 'flex-start'
    }}>
      <h3 style={{ 
        fontFamily: 'var(--Font-Family-font-family, "NanumSquare Neo")',
        fontSize: 'var(--Primitive-lg, 1.1em)',
        color: 'var(--Text-Text-1, #202020)',
        textAlign: 'center',
        fontFeatureSettings: '\'liga\' off, \'clig\' off',
        fontStyle: 'normal',
        fontWeight: '600',
        lineHeight: 'var(--Line-Height-line-height-S, 1.125rem)',
        letterSpacing: '-0.01rem'
      }}>
        의약품 촬영 가이드
      </h3>
      
      {/* 이미지 업로드 영역 */}
      <div 
        style={{
          width: '9.375rem',
          height: '9.375rem',
          flexShrink: '0',
          margin: '0 auto 1rem',
          border: isDragOver || isHovered ? '1px dashed #3f3f3f' : '1px solid #ccc',
          borderRadius: '0.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          background: selectedImage ? 'transparent' : '#f8f9fa',
          transition: 'all 0.2s ease',
          position: 'relative',
          overflow: 'hidden'
        }}
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
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: '0.5rem'
            }}
          />
        ) : (
          <div style={{
            textAlign: 'center',
            color: '#666',
            fontSize: '0.875rem'
          }}>
          <div>클릭하여 이미지 선택</div>
            <div style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>또는 드래그 앤 드롭</div>
          </div>
        )}
      </div>

      {/* 숨겨진 파일 입력 */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileInputChange}
        style={{ display: 'none' }}
      />

      <div style={{ 
        textAlign: 'center', 
        marginBottom: '1rem',
        color: 'var(--Text-Text-1, #202020)',
        fontFamily: 'var(--Font-Family-font-family, "NanumSquare Neo")',
        fontSize: 'var(--Primitive-md, 0.875rem)',
        fontStyle: 'normal',
        fontWeight: '500',
        lineHeight: 'var(--Line-Height-line-height-M, 1.5rem)',
        letterSpacing: '-0.00875rem'
      }}>
        한 번에 한 장씩만 찍어주세요
        <br />
        정확한 각도에서 촬영해주세요
      </div>
      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
        {children}
      </div>
    </div>
  );
};