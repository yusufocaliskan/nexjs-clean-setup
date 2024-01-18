'use client';

import {ProfileIcon} from '@/components/Icons/ProfileInfoIcons';
import AccountLayout from '@/layouts/account';
import './index.scss';
import {Card, MailBox, Quote, Spacer, Text} from '@/components';
import {useSelector} from 'react-redux';
import AccountLoginHistory from './login-history';
import {AccountLayoutTitle} from '@/layouts';

const Profile = () => {
  const {name, surname, email, levelNo, phoneNumber, ...userInformations} = useSelector(
    (state) => state.user.informations
  );
  const userFullName = `${name} ${surname}`;
  console.log(userInformations);
  return (
    <AccountLayout title={'Profile'} icon={<ProfileIcon />}>
      <AccountLayoutTitle
        title="Get An API Key"
        desc={
          <Card display="flex" align-items="center" gap="1rem">
            <MailBox />
            {email}
          </Card>
        }
      />
      <Spacer height="2rem" />
      <AccountLoginHistory />
      {/* <div className="profile-features"> */}
      {/*   <p className="features-text">Features</p> */}
      {/* </div> */}
      {/* <div className="profile-lvl1"> */}
      {/*   <p className="lvl-title">level 1</p> */}
      {/*   <div className="profile-divider" /> */}
      {/*   <div className="frame"> */}
      {/*     <p className="frame-text">Deposit assets</p> */}
      {/*     <Switch /> */}
      {/*   </div> */}
      {/*   <div className="frame"> */}
      {/*     <p className="frame-text">Withdraw assets</p> */}
      {/*     <p className="frame-withdraw-text">Enabled $1,000,000/day</p> */}
      {/*   </div> */}
      {/*   <div className="frame"> */}
      {/*     <p className="frame-text">Card purchases</p> */}
      {/*     <Switch /> */}
      {/*   </div> */}
      {/*   <div className="frame"> */}
      {/*     <p className="frame-text">Bank deposit</p> */}
      {/*     <Switch /> */}
      {/*   </div> */}
      {/* </div> */}
      {/* <div className="profile-lvl2"> */}
      {/*   <p className="lvl-title">level 2</p> */}
      {/*   <div className="profile-divider" /> */}
      {/*   <div className="frame"> */}
      {/*     <p className="frame-text">Fiat and Spot wallet</p> */}
      {/*     <Switch /> */}
      {/*   </div> */}
      {/*   <div className="frame"> */}
      {/*     <p className="frame-text">Margin wallet</p> */}
      {/*     <p className="frame-withdraw-text">Enabled 100x Leverage</p> */}
      {/*   </div> */}
      {/* </div> */}
      {/* <div className="profile-bottom"> */}
      {/*   <CoolButton type="Main&Small" label="Save settings" /> */}
      {/* </div> */}
    </AccountLayout>
  );
};

export default Profile;
