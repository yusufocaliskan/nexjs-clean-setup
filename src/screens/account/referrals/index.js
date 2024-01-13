import { ReferralsIcon } from "@/components/Icons/ProfileInfoIcons";
import AccountLayout from "@/layouts/account";

const Referrals = () => {
  return (
    <AccountLayout title={"Referrals"} icon={<ReferralsIcon />}>
      <div>referrals</div>
    </AccountLayout>
  );
};

export default Referrals;
