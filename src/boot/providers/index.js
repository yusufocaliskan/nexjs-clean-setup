'use client';
import ThemeProvider from '@/theme/provider';
import ReduxProvider from './redux';
import NextAuthCustomProvider from './nextAuth';

const RootProvider = ({children}) => {
  return (
    <>
      <NextAuthCustomProvider>
        <ReduxProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </ReduxProvider>
      </NextAuthCustomProvider>
    </>
  );
};
export default RootProvider;
