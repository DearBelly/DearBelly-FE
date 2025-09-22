import type { HeroCardProps } from '@/components/HeroCard/HeroCard';
import type { NoticeBoxProps } from '@/components/NoticeComponent/NoticeBox';
import type { ContendCardProps } from '@/components/ContentCard/ContentCard';
import type { CategoryIconProps } from '@/components/CategoryIcon/CategoryIcon';

// 히어로 카드 데이터 (내용 정해지면 고정 - DB 저장 X)
export const testData: HeroCardProps[] = [
  {
    title: `10~20주차에는\nIST 검사를 받아야 해요!`,
    description: '목덜미 투명대와 산모 혈액을 통해 다운증후군 등 염색체 이상 위험을 확인해요.',
    imageSrc: '/images/information_hero/1.png',
    mode: 'imageMode',
  },
  {
    title: `10~22주차에는\nNIPT 검사를 받아야 해요!`,
    description: '산모 혈액 속 태아 DNA로 다운·에드워드·파타우 증후군 여부를 안전하게 선별해요.',
    imageSrc: '/images/information_hero/2.png',
    mode: 'imageMode',
  },
  {
    title: `11~13주차에는\n융모막 검사를 받아야 해요!`,
    description: '고령 산모나 기형아 검사 이상 시 염색체 진단을 위해 시행하는 검사예요.',
    imageSrc: '/images/information_hero/3.png',
    mode: 'imageMode',
  },
  {
    title: `16~20주차에는\n양수 검사를 받아야 해요!`,
    description: '고령 산모나 이상 소견이 있을 때 태아 염색체 이상 여부를 확인해요.',
    imageSrc: '/images/information_hero/4.png',
    mode: 'imageMode',
  },
  {
    title: `20~24주차에는\n태아 심장 기형 검사를 받아야 해요!`,
    description: '심장 기형을 조기 발견하고 초음파로 주요 기형을 확인할 수 있어요.',
    imageSrc: '/images/information_hero/5.png',
    mode: 'imageMode',
  },
  {
    title: `24~28주차에는\n임신성 당뇨 검사를 받아야 해요!`,
    description: '산모와 아기의 합병증 예방을 위해 당 대사 이상 여부를 점검해요.',
    imageSrc: '/images/information_hero/6.png',
    mode: 'imageMode',
  },
  {
    title: `26~28주차에는\n4D 초음파를 받아야 해요!`,
    description: '태아의 얼굴·손발을 입체적으로 관찰하고 기형 여부를 확인해요.',
    imageSrc: '/images/information_hero/7.png',
    mode: 'imageMode',
  },
  {
    title: `30~35주차에는\n항문외과 검사를 받아야 해요!`,
    description: '치질·치루 등 임신 중 흔한 항문 질환을 조기 확인해요.',
    imageSrc: '/images/information_hero/8.png',
    mode: 'imageMode',
  },
  {
    title: `32주차에는\nNST 검사를 받아야 해요!`,
    description: '태아 심음과 자궁 수축을 측정해 아기의 건강 상태를 진단해요.',
    imageSrc: '/images/information_hero/7.png',
    mode: 'imageMode',
  },
  {
    title: `35주차 이후에는\n분만 전 검사를 받아야 해요!`,
    description: '혈액검사·초음파 등으로 산모와 태아 상태를 최종 점검해 분만 방법을 결정해요.',
    imageSrc: '/images/information_hero/1.png',
    mode: 'imageMode',
  },
];


// 공지 컴포 데이터 
export const testData2: NoticeBoxProps[] = [
  { 
    label: '약물 판단 기능을 개선 중입니다',
  },
  { 
    label: '산전 검사 스케줄러가 곧 더 편리해집니다',
  },
  { 
    label: '아이 편지함에 새로운 기능이 추가됩니다',
  },
];

// 아이콘 데이터 (고정임 - DB 저장 X)
export const iconData: CategoryIconProps[] = [
  {
    page: 0,
    name: '전체',
    imageSrc: '/images/information/all_light.svg',
  },
  {
    page: 1,
    name: '건강',
    imageSrc: '/images/information/health_light.svg',
  },
  {
    page: 2,
    name: '지원금',
    imageSrc: '/images/information/money_light.svg',
  },
  {
    page: 3,
    name: '임신준비',
    imageSrc: '/images/information/ready_light.svg',
  },
  {
    page: 4,
    name: '출산육아',
    imageSrc: '/images/information/granulation_light.svg',
  },
  {
    page: 5,
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
