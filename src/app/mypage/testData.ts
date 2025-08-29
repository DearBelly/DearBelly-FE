import type { ProfileListProps } from '@/components/ProfileList/ProfileList';
import type { ContendCardProps } from '@/components/ContentCard/ContentCard';

export const testData : ProfileListProps[] = [
    { 
      id: 1,
      name: '한교동',
      mode: 'transparent',
    },
    { 
        id: 2,
        name: '폼폼푸린',
        mode: 'transparent',
    },
    { 
        id: 3,
        name: '시나몬롤',
        mode: 'transparent',
    },
    { 
        id: 4,
        name: '헬로키티',
        mode: 'transparent',
    },
    { 
        id: 5,
        name: '포차코',
        mode: 'transparent',
    },
  ];

  export const rawTestData  : ProfileListProps[] = [
    { 
        id: 1,
        name: '아기1',
        mode: 'transparent',
        isDot: true,
        babyGender: 'female',
    },
    { 
        id: 2,
        name: '아기2',
        mode: 'transparent',
        isDot: true,
        babyGender: 'male',
    },
    { 
        id: 3,
        name: '아기3',
        mode: 'transparent',
        isDot: true,
        babyGender: 'unknown',
    },
    { 
        id: 4,
        name: '아기4',
        mode: 'transparent',
        isDot: true,
        babyGender: 'unknown',
    },
    { 
        id: 5,
        name: '아기5',
        mode: 'transparent',
        isDot: true,
        babyGender: 'female',
    },
  ];

  // 성별에 따라 이미지 바꾸기
  const genderImageMap: Record<string, string> = {
    female: '/images/babyInfo/female.svg',
    male: '/images/babyInfo/male.svg',
    unknown: '/images/babyInfo/none.svg',
  };

  export const testData2: ProfileListProps[] = rawTestData.map(item => ({
    ...item,
    mode: 'transparent',
    isDot: true,
    profileSrc: genderImageMap[item.babyGender??'none']
  }));

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