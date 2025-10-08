import { create } from "zustand";

interface UserState {
  token: string | null;
  username: string;
  userEmail: string;
  profileImg: string;
  isPregnant: boolean;
  impDate: string | null;
  gender: string;
  login: string;
  birth: string;
  setUser: (data: Partial<UserState>) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set, get) => ({
  token: null,
  username: "",
  userEmail: "",
  profileImg: "",
  isPregnant: false,
  impDate: null,
  gender: "",
  login: "",
  birth: "",

  setUser: (data) => {
    const current = get();

    const normalizedData = { ...data };
    if (data.profileImg) {
      normalizedData.profileImg = !data.profileImg.startsWith("blob:")
        ? encodeURI(data.profileImg)
        : "/images/icon_default_profile.svg";
    }

    let hasChanged = false;
    for (const [key, value] of Object.entries(normalizedData)) {
      if ((current as any)[key] !== value) {
        hasChanged = true;
        break;
      }
    }
    if (!hasChanged) return;

    set({ ...current, ...normalizedData });
  },

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
