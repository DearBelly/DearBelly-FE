import { PhotoGuideModal } from './PhotoGuideModal';
import { PhotoBtn } from './PhotoBtn'; 

export default {
  title: 'Modal/PhotoGuideModal',
  component: PhotoGuideModal,
  tags: ['autodocs'],
};

export const Upload = () => {
  return (
    <PhotoGuideModal>
     <PhotoBtn variant="large">확인</PhotoBtn>
    </PhotoGuideModal>
  );
};

export const Picture = () => {
  const handleImageUpload = (file: File) => {
    console.log('촬영된 이미지:', file);
    alert(`이미지가 업로드되었습니다: ${file.name}`);
  };

  return (
    <PhotoGuideModal 
      onImageUpload={handleImageUpload}
    >
     <PhotoBtn variant="assistive">다시찍기</PhotoBtn>
     <PhotoBtn variant="primary">결과보기</PhotoBtn>
    </PhotoGuideModal>
  );
};