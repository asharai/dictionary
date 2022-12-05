import create from 'zustand';

export interface IUser {
  email: string;
  fullName: string;
  avatarUrl?: string;
  token: string;
}

export interface IAuthStore {
  isAuthorized: boolean;
  logIn: () => void;
  logOut: () => void;
}

export const useAuthStore = create<IAuthStore>(set => ({
  isAuthorized: false,

  logIn: () =>
    set(() => ({
      isAuthorized: true,
    })),

  logOut: () => {
    window.localStorage.removeItem('token');
    return set(() => ({
      isAuthorized: false,
    }));
  },
}));
