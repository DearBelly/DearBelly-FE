import { create } from "zustand";

interface UserState {
  token: string | typeof process.env.NEXT_PUBLIC_TEMP_TOKEN;
  username: string;
  userEmail: string;
  profileImg: string;
  isPregnant: boolean;
  impDate: Date | null;  
  gender: string;
  login: string;
  birth: string;
  setUser: (data: {
    token?: string;
    username?: string;
    userEmail?: string;
    profileImg?: string;
    isPregnant?: boolean;
    impDate?: string; 
    gender?: string;
    login?: string;
    birth?: string;
  }) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  token: process.env.NEXT_PUBLIC_TEMP_TOKEN,
  username: "",
  userEmail: "",
  profileImg: "",
  isPregnant: false,
  impDate: null,  
  gender: "",
  login: "",
  birth: "",

  setUser: (data) =>
    set((state) => ({
      token: data.token ?? state.token,
      username: data.username ?? state.username,
      userEmail: data.userEmail ?? state.userEmail,
      profileImg: data.profileImg ?? state.profileImg,
      isPregnant: data.isPregnant ?? state.isPregnant,
      impDate: data.impDate ? new Date(data.impDate) : state.impDate,
      gender: data.gender ?? state.gender,
      login: data.login ?? state.login,
      birth: data.birth ?? state.birth,
    })),

  clearUser: () =>
    set({
      token: null,
      username: "",
      userEmail: "",
      profileImg: "",
      isPregnant: false,
      impDate: null,
      gender: "",
      login: "",
      birth: "",
    }),
}));
