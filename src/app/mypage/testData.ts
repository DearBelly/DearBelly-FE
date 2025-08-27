import type { ProfileListProps } from '@/components/ProfileList/ProfileList';

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