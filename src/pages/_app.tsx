import { wrapper } from '@/store/store';
import '@/styles/globals.css';
import '@/styles/App.css';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { ReactElement, ReactNode, useEffect, useState } from 'react';
import { Router } from 'next/router';

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement, isLoading?: boolean) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export function App({ Component, pageProps }: AppPropsWithLayout) {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    Router.events.on('routeChangeStart', () => {
      setIsLoading(true);
    });

    Router.events.on('routeChangeComplete', () => {
      setIsLoading(false);
    });

    Router.events.on('routeChangeError', () => {
      setIsLoading(false);
    });
  }, [Router]);
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(<Component {...pageProps} />, isLoading);
}

export default wrapper.withRedux(App);
