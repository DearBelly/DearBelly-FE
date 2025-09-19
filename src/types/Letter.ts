export type Letter = {
  id: number;
  content: string;
  nickname: string;
  imgUrl: string;
  createdAt: string;
  editable: boolean;
};
  
export type WriteLetterRequest = {
  content: string;
};