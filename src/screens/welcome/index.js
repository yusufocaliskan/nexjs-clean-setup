import { useTranslation } from "@/app/i18n/client";
import { setSelectedMarket } from "@/store/market";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Welcome = ({ lng }) => {
  const { t } = useTranslation(lng);
  const dispatch = useDispatch();
  const market = useSelector((state) => state.market);

  useEffect(() => {
    dispatch(setSelectedMarket(2));
  }, [dispatch]);

  return (
    <>
      {t("welcome_slogan")} <br /> Selected Market :{market.selectedMarket}
    </>
  );
};

export default Welcome;
