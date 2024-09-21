import { useEffect, type ReactNode } from 'react';
import { Header } from '#/components/Header';

type Props = {
  children: ReactNode,
  pageTitle: string,
}

export function Layout ({ children, pageTitle }: Props) {

  useEffect(() => { 
    const browserTabTitle = `${pageTitle} | Seach Country App`;
    document.title = browserTabTitle;
  }, [pageTitle]);

  return (
    <>
      <Header />
      {children}
    </>
  );
}