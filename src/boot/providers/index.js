'use client';

import ReduxProvider from './redux';
import ThemeProvider from '@/theme/provider';
import NextAuthCustomProvider from './nextAuth';

const RootProvider = ({children}) => {
  return (
    <>
      <ReduxProvider>
        <NextAuthCustomProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </NextAuthCustomProvider>
      </ReduxProvider>
    </>
  );
};
export default RootProvider;
