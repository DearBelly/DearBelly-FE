import type { HeroCardProps } from '@/components/HeroCard/HeroCard';
import type { NoticeBoxProps } from '@/components/NoticeComponent/NoticeBox';
import type { ContendCardProps } from '@/components/ContentCard/ContentCard';
import type { CategoryIconProps } from '@/components/CategoryIcon/CategoryIcon';

// 히어로 카드 데이터 (내용 정해지면 고정 - DB 저장 X)
export const testData: HeroCardProps[] = [
  {
    title: '건강한 임신을 위한 팁',
    description: '임신 중 챙겨야 할 필수 정보를 알려드려요.',
    imageSrc: '/images/default_image.svg',
    mode: 'imageMode',
  },
  {
    title: '1주차에는 aa검사를 받아야 해요!',
    description: 'aa검사는 bb를 위해 필수적이에요.',
    imageSrc: '/images/default_image.svg',
    mode: 'imageMode',
  },
  {
    title: '2주차에는 aa검사를 받아야 해요!',
    description: 'aa검사는 bb를 위해 필수적이에요.',
    imageSrc: '/images/default_image.svg',
    mode: 'imageMode',
  },
  {
    title: '3주차에는 aa검사를 받아야 해요!',
    description: 'aa검사는 bb를 위해 필수적이에요.',
    imageSrc: '/images/default_image.svg',
    mode: 'imageMode',
  },
  {
    title: '4주차에는 aa검사를 받아야 해요!',
    description: 'aa검사는 bb를 위해 필수적이에요.',
    imageSrc: '/images/default_image.svg',
    mode: 'imageMode',
  },
];

// 정책 컴포 데이터 
export const testData2 : NoticeBoxProps[] = [
  { 
    label: '5월은 ab 정책을 신청할 수 있어요.',
  },
  { 
    label: '6월은 ab 정책을 신청할 수 있어요.',
  },
  { 
    label: '7월은 ab 정책을 신청할 수 있어요.',
  },
];

// 아이콘 데이터 (고정임 - DB 저장 X)
export const iconData: CategoryIconProps[] = [
  {
    name: '전체',
    imageSrc: '/images/information/mind_light.svg',
  },
  {
    name: '지원금',
    imageSrc: '/images/information/money_light.svg',
  },
  {
    name: '교육',
    imageSrc: '/images/information/education_light.svg',
  },
  {
    name: '임신전반',
    imageSrc: '/images/information/granulation_light.svg',
  },
  {
    name: '임신준비',
    imageSrc: '/images/information/ready_light.svg',
  },
  {
    name: '신체건강',
    imageSrc: '/images/information/health_light.svg',
  },
  {
    name: '정신건강',
    imageSrc: '/images/information/mind_light.svg',
  },
];

// 추천 컴포 데이터
export const testData3 : ContendCardProps[] = [
  { id: 1, title: '깊이 잠들고 싶어요..', description: '깊은 숙면을 도와주는 5가지 습관', imageSrc: '/images/default_image.svg' },
  { id: 2, title: '깊이 잠들고 싶어요..', description: '깊은 숙면을 도와주는 5가지 습관', imageSrc: '/images/default_image.svg' },
  { id: 3, title: '깊이 잠들고 싶어요..', description: '깊은 숙면을 도와주는 5가지 습관', imageSrc: '/images/default_image.svg' },
];

export const testData_preg_all : ContendCardProps[] = [
  { id: 1, title: '임신에 대한 모든 것', description: '깊은 숙면을 도와주는 5가지 습관', imageSrc: '/images/default_image.svg' },
];

export const testData_health : ContendCardProps[] = [
  { id: 1, title: '깊이 잠들고 싶어요..', description: '깊은 숙면을 도와주는 5가지 습관', imageSrc: '/images/default_image.svg' },
  { id: 2, title: '깊이 잠들고 싶어요..', description: '깊은 숙면을 도와주는 5가지 습관', imageSrc: '/images/default_image.svg' },
  { id: 3, title: '깊이 잠들고 싶어요..', description: '깊은 숙면을 도와주는 5가지 습관', imageSrc: '/images/default_image.svg' },
];

export const testData_education : ContendCardProps[] = [
  { id: 1, title: '오은영 박사의 교육법!', description: '깊은 숙면을 도와주는 5가지 습관', imageSrc: '/images/default_image.svg' },
  { id: 2, title: '오은영 박사의 교육법!', description: '깊은 숙면을 도와주는 5가지 습관', imageSrc: '/images/default_image.svg' },
  { id: 3, title: '오은영 박사의 교육법!', description: '깊은 숙면을 도와주는 5가지 습관', imageSrc: '/images/default_image.svg' },
];

export const testData_ready : ContendCardProps[] = [
  { id: 1, title: '육아 필수템', description: '깊은 숙면을 도와주는 5가지 습관', imageSrc: '/images/default_image.svg' },
  { id: 2, title: '육아 필수템', description: '깊은 숙면을 도와주는 5가지 습관', imageSrc: '/images/default_image.svg' },
  { id: 3, title: '육아 필수템', description: '깊은 숙면을 도와주는 5가지 습관', imageSrc: '/images/default_image.svg' },
];

export const testData_mind : ContendCardProps[] = [
  { id: 1, title: '산후 우울증 이겨내는 법', description: '깊은 숙면을 도와주는 5가지 습관', imageSrc: '/images/default_image.svg' },
  { id: 2, title: '산후 우울증 이겨내는 법', description: '깊은 숙면을 도와주는 5가지 습관', imageSrc: '/images/default_image.svg' },
  { id: 3, title: '산후 우울증 이겨내는 법', description: '깊은 숙면을 도와주는 5가지 습관', imageSrc: '/images/default_image.svg' },
];

export const testData_money : ContendCardProps[] = [
  { id: 1, title: '정부에서 지원금 받으면서 육아해요', description: '깊은 숙면을 도와주는 5가지 습관', imageSrc: '/images/default_image.svg' },
  { id: 2, title: '정부에서 지원금 받으면서 육아해요', description: '깊은 숙면을 도와주는 5가지 습관', imageSrc: '/images/default_image.svg' },
  { id: 3, title: '정부에서 지원금 받으면서 육아해요', description: '깊은 숙면을 도와주는 5가지 습관', imageSrc: '/images/default_image.svg' },
];

export const testData_all : ContendCardProps[] = [
  { id: 1, title: '깊이 잠들고 싶어요..', description: '깊은 숙면을 도와주는 5가지 습관', imageSrc: '/images/default_image.svg' },
  { id: 2, title: '깊이 잠들고 싶어요..', description: '깊은 숙면을 도와주는 5가지 습관', imageSrc: '/images/default_image.svg' },
  { id: 3, title: '깊이 잠들고 싶어요..', description: '깊은 숙면을 도와주는 5가지 습관', imageSrc: '/images/default_image.svg' },
  { id: 4, title: '오은영 박사의 교육법!', description: '깊은 숙면을 도와주는 5가지 습관', imageSrc: '/images/default_image.svg' },
  { id: 5, title: '오은영 박사의 교육법!', description: '깊은 숙면을 도와주는 5가지 습관', imageSrc: '/images/default_image.svg' },
  { id: 6, title: '오은영 박사의 교육법!', description: '깊은 숙면을 도와주는 5가지 습관', imageSrc: '/images/default_image.svg' },
  { id: 7, title: '육아 필수템', description: '깊은 숙면을 도와주는 5가지 습관', imageSrc: '/images/default_image.svg' },
  { id: 8, title: '육아 필수템', description: '깊은 숙면을 도와주는 5가지 습관', imageSrc: '/images/default_image.svg' },
  { id: 9, title: '육아 필수템', description: '깊은 숙면을 도와주는 5가지 습관', imageSrc: '/images/default_image.svg' },
  { id: 10, title: '산후 우울증 이겨내는 법', description: '깊은 숙면을 도와주는 5가지 습관', imageSrc: '/images/default_image.svg' },
  { id: 11, title: '산후 우울증 이겨내는 법', description: '깊은 숙면을 도와주는 5가지 습관', imageSrc: '/images/default_image.svg' },
  { id: 12, title: '산후 우울증 이겨내는 법', description: '깊은 숙면을 도와주는 5가지 습관', imageSrc: '/images/default_image.svg' },
  { id: 13, title: '정부에서 지원금 받으면서 육아해요', description: '깊은 숙면을 도와주는 5가지 습관', imageSrc: '/images/default_image.svg' },
  { id: 14, title: '정부에서 지원금 받으면서 육아해요', description: '깊은 숙면을 도와주는 5가지 습관', imageSrc: '/images/default_image.svg' },
  { id: 15, title: '정부에서 지원금 받으면서 육아해요', description: '깊은 숙면을 도와주는 5가지 습관', imageSrc: '/images/default_image.svg' },
];