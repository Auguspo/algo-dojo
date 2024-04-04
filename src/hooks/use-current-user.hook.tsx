import { useAtom } from 'jotai';
import { currentUserAtom } from 'src/store';

export const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom);
  return { currentUser, setCurrentUser };
};
