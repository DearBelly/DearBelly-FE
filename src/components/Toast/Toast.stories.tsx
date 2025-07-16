import { Toast } from './Toast';
import { FunnyCircleSolid } from "@mynaui/icons-react";

export default {
  title: 'components/Toast',
  component: Toast,
  tags: ['autodocs'],
};

export const Default = () => (
  <Toast icon={<FunnyCircleSolid color='white' />} message="닉네임 변경이 완료되었습니다" />
);