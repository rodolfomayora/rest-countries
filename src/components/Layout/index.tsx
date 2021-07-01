import React, { FC, useEffect } from 'react';

import Header from '../Header';
import { LayoutProps } from './types';

const Layout: FC<LayoutProps> = ({ children, pageTitle }) => {

  useEffect(() => { 
    const browserTabTitle: string = `${pageTitle} | Seach Country App`;
    document.title = browserTabTitle;
  },
  [pageTitle])

  return (
    <>
      <Header />
      {children}
    </>
  );
}

export default Layout;