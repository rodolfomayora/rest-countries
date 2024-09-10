import { useEffect } from 'react';
import type { ReactNode } from 'react';
import Header from '../Header';

type Props = {
  children: ReactNode,
  pageTitle: string,
}

export default function Layout ({ children, pageTitle }: Props) {

  useEffect(() => { 
    const browserTabTitle: string = `${pageTitle} | Seach Country App`;
    document.title = browserTabTitle;
  }, [pageTitle])

  return (
    <>
      <Header />
      {children}
    </>
  );
}