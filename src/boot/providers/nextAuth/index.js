import { SessionProvider } from "next-auth/react";
const NextAuthCustomProvider = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};
export default NextAuthCustomProvider;
