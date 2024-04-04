import { atom } from 'jotai';

export interface CurrentUser {
  email: string;
  username: string;
}

export const currentUserAtom = atom<CurrentUser | null>(
  null as CurrentUser | null
);
