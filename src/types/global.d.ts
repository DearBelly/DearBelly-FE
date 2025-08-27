export {};

// 카카오토 공유하기 기능을 위해 선언 
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Kakao: any;
  }
}