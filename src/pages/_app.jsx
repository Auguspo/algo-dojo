import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useCurrentUser } from 'src/hooks';
import { apiClient } from 'src/utils';

import 'src/styles/globals.css';

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

export default function App({ Component, pageProps: { ...pageProps } }) {
  const router = useRouter();
  const { currentUser, setCurrentUser } = useCurrentUser();
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (currentUser === null && accessToken) {
      console.log({ currentUser, accessToken });
      const getProfile = async () => {
        try {
          const res = await apiClient.get('/user/profile');
          if (res.status === 200) {
            const { user } = res.data;
            setCurrentUser(user);
          }
        } catch (error) {}
      };
      getProfile();
    }
  }, [currentUser]);

  const currentPath = router.asPath;

  let pageTitle = '';
  if (currentPath === '/') {
    pageTitle = 'Algo Dojo';
  } else {
    const lastPathSegment = currentPath.split('/').pop() || '';
    pageTitle = capitalize(lastPathSegment);
  }

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
