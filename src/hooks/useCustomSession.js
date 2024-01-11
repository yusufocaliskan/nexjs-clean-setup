import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const useCustomSession = () => {
  const nextAuthSession = useSession();
  const [session, setCustomizedSession] = useState();

  //TODO: use an api request, using this way instead
  useEffect(() => {
    let status = "unauthenticated";
    if (nextAuthSession?.data?.isAuthenticated) {
      status = "authenticated";
    }
    const newSession = {
      status: status,
      data: nextAuthSession.data,
      update: nextAuthSession.update,
      isAuthorized: status === "authenticated",
    };
    setCustomizedSession(newSession);
  }, [nextAuthSession]);

  // const check = async () => {
  //   try {
  //     const response = await fetch("/api/auth/custom-session", {
  //       method: "GET",
  //     });
  //     console.log(response);
  //     if (response.ok) {
  //       const session = await response.json();
  //       console.log("Authenticated:", session);
  //       // Handle the authenticated session
  //     } else {
  //       console.log("Not authenticated");
  //       // Handle unauthenticated scenario
  //     }
  //   } catch (error) {
  //     console.error("Error checking session:", error);
  //   }
  // };
  //
  return { session, ...session };
};
export default useCustomSession;
