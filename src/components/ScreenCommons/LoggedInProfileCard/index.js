import { ProtectedArea } from "@/layouts";
import { CoolButton } from "@/components";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "@/app/i18n/client";
import { authApi } from "@/services/auth";
import { signOut } from "next-auth/react";
import { cleanUpUserStore } from "@/store/user";
import queryResult from "@/services/queryResult";

const LoggedInProfileCard = ({ session }) => {
  const user = useSelector((state) => state.user);
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const [logoutSession, logoutResp] = authApi.useLogoutSessionMutation();

  const handleOnLoggout = async () => {
    const rep = await logoutSession();
    if (queryResult.isSuccess(rep)) {
      dispatch(cleanUpUserStore());
      signOut({ redirect: false });
    }
  };

  return (
    <ProtectedArea session={session}>
      <div
        style={{
          borderWidth: 1,
          borderColor: "#aaa",
          borderRadius: 15,
          padding: 15,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <p>
            {t("welcome")}, {user?.informations?.name}{" "}
            {user?.informations?.surname}
          </p>
          <b>{user.informations?.email}</b>
        </div>
        <div>
          <CoolButton
            label={t("logout")}
            type="Small"
            onClick={() => handleOnLoggout()}
          />
        </div>
      </div>
    </ProtectedArea>
  );
};

export default LoggedInProfileCard;
