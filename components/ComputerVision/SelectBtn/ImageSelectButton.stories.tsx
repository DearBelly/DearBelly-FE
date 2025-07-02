import { ImageSelectButton } from './ImageSelectButton';
import { CameraSolid } from "@mynaui/icons-react";
import { ImageSolid } from "@mynaui/icons-react";

export default {
  title: 'Components/ImageSelectButton',
  component: ImageSelectButton,
  tags: ['autodocs'],
};

export const Camera_Compo = () => (
  <ImageSelectButton icon={<CameraSolid width="4rem" height="4rem" />} text="카메라로 촬영하기" />
);
export const Gallery_Compo = () => (
  <ImageSelectButton icon={<ImageSolid width="4rem" height="4rem" />} text="갤러리에서 선택하기" />
);