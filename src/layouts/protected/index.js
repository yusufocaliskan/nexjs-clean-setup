import GiantLoaderAnimation from "@/components/LoadingGif/GiantLoaderAnimation";
import useCustomSession from "@/hooks/useCustomSession";
import routes from "@/routes";
import { setToken } from "@/store/user";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const ProtectedScreen = ({ children }) => {
  //NOTE: There are many way to protect a page, we choose using laoyut logic
  //which is more customizable
  const { session, isAuthorized } = useCustomSession();

  const router = useRouter();
  const dispatch = useDispatch();

  //set user token
  useEffect(() => {
    if (isAuthorized) {
      const tokens = session?.data?.accessToken;
      if (tokens) dispatch(setToken(tokens));
    }
  }, [session, dispatch, isAuthorized]);

  //Left them to singIn
  useEffect(() => {
    if (!isAuthorized) router.push(routes.login);
  }, [isAuthorized, router]);

  //Display a gif while sending them to the login page
  if (!isAuthorized) return <GiantLoaderAnimation isOpen={true} />;

  // or let the see the actual page
  if (isAuthorized) return <div>{children}</div>;
};

export default ProtectedScreen;
