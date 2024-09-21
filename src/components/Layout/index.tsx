import type { ReactNode } from 'react';
import { Helmet } from 'react-helmet';
import { Header } from '#/components/Header';

type Props = {
  children: ReactNode,
  pageTitle: string,
}

export function Layout ({ children, pageTitle }: Props) {
  // tab title
  const metaTitle = `${pageTitle} | Search Country App`;
  return (
    <>
      <Helmet>
        <title>{metaTitle}</title>
      </Helmet>
      <Header />
      {children}
    </>
  );
}