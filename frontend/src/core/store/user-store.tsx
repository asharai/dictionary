import create from 'zustand';

export interface IUser {
  email: string;
  fullName: string;
  avatarUrl?: string;
  token: string;
}

export interface IUserStore {
  isAuthorized: boolean;
  user?: IUser;
  logIn: (payload: IUser) => void;
}

export const useUserStore = create<IUserStore>(set => ({
  isAuthorized: false,
  user: undefined,

  logIn: payload =>
    set(() => ({
      isAuthorized: true,
      user: payload,
    })),

  logOut: () =>
    set(() => ({
      isAuthorized: false,
      user: undefined,
    })),
}));
