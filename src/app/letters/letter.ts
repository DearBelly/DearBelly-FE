export interface Letter {
    id: number;
    content: string;
    nickname: string;
    imgUrl: string;
    createdAt: string;   
    editable: boolean;
  }
  
  export interface LettersResponse {
    httpStatus: number;
    message: string;
    data: Letter[];
    success: boolean;
  }
  