'use client';
import {ProfileIcon} from '@/components/Icons/ProfileInfoIcons';
import Switch from '@/components/form/Switch';
import AccountLayout from '@/layouts/account';
import './index.scss';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import CountrySelector from '@/components/CountrySelector';
import {Card, CoolButton, Quote, Text} from '@/components';
import {useSelector} from 'react-redux';
import AccountLoginHistory from './login-history';

const Profile = () => {
  const {name, surname, email, levelNo, phoneNumber, ...userInformations} = useSelector(
    (state) => state.user.informations
  );
  const userFullName = `${name} ${surname}`;
  console.log(userInformations);
  return (
    <AccountLayout title={'Profile'} icon={<ProfileIcon />}>
      <div className="profile-top">
        <div className="profile-info">
          <Card display="flex" flexDirection="row" justifyContent="space-between">
            <Card>
              <Text>{userFullName}</Text>
              <Quote>{email}</Quote>{' '}
            </Card>
            <Card
              className="profile-level"
              alignSelf="flex-end"
              width={{base: '60%', lg: '20%', md: '30%'}}
              display="flex"
            >
              <span className="level-text">{`Level ${levelNo} verified`}</span>
            </Card>
          </Card>
          {/* <div className="profile-country"> */}
          {/*   <CountrySelector /> */}
          {/* </div> */}
        </div>
      </div>

      <div className="profile-middle">
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
      </div>
      {/* <div className="profile-bottom"> */}
      {/*   <CoolButton type="Main&Small" label="Save settings" /> */}
      {/* </div> */}
    </AccountLayout>
  );
};

export default Profile;
