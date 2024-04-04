import { useRouter } from 'next/router';

export const useIsPrivatePage = () => {
  const router = useRouter();
  if (typeof window !== 'undefined') {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) router.push('/login');
  }
};
