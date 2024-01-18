'use client';
import {ReferralsIcon} from '@/components/Icons/ProfileInfoIcons';
import AccountLayout from '@/layouts/account';
import './index.scss';
import {referralApi} from '@/services/referral';
import {useState, useEffect} from 'react';
import {accountApi} from '@/services/account';

const Referrals = () => {
  const [getMyReferrals, getMyReferralsResponse] = referralApi.useGetMyReferralsMutation();
  const [getReferralNickname, getReferralNicknameResponse] = accountApi.useGetReferralNicknameMutation();
  // const [createReferralNickname, createReferralNicknameResponse] = accountApi.useCreateReferralNicknameMutation();
  const [getMyReferralsCountWithKYC, getMyReferralsCountWithKYCResponse] =
    referralApi.useGetMyReferralsCountWithKYCMutation();
  const [getMyLatestCommissions, getMyLatestCommissionsResponse] = referralApi.useGetMyLatestCommissionsMutation();
  const [getTopCommissions, getTopCommissionsResponse] = referralApi.useGetTopCommissionsMutation();

  const [value, setValue] = useState(0);
  const [referralKYCValue, setReferralKYCValue] = useState(0);
  const [referralKYCMax, setReferralKYCMax] = useState(0);
  const [referrals, setReferrals] = useState([]);
  const [referralsIsBusy, setReferralsIsBusy] = useState(false);
  const [referralsCurrentPage, setReferralsCurrentPage] = useState(1);
  const [referralsPerPage, setReferralsPerPage] = useState(9);
  const [referralNick, setReferralNick] = useState(undefined);
  const [referralNickUrl, setReferralNickUrl] = useState(undefined);
  const [topCommissions, setTopCommissions] = useState([]);
  const [latestCommissions, setLatestCommissions] = useState([]);
  const [latestCommissionsIsBusy, setLatestCommissionsIsBusy] = useState(false);
  const [latestCommissionsCurrentPage, setLatestCommissionsCurrentPage] = useState(1);
  const [latestCommissionsPerPage, setLatestCommissionsPerPage] = useState(9);
  const [commissionValue, setCommissionValue] = useState(0);
  const [referralFeeAsBTC, setReferralFeeAsBTC] = useState(0);
  const [referralFeeAsTRY, setReferralFeeAsTRY] = useState(0);
  const [referralFeeAsUSD, setReferralFeeAsUSD] = useState(0);
  const [levels, setLevels] = useState([
    {value: 0, commission: 20, badgeCount: 1},
    {value: 10, commission: 25, badgeCount: 2},
    {value: 50, commission: 30, badgeCount: 3},
    {value: 100, commission: 35, badgeCount: 4},
    {value: 250, commission: 40, badgeCount: 5},
    {value: 500, commission: 45, badgeCount: 6},
    {value: 1000, commission: 50, badgeCount: 7},
    {value: 2000, commission: 60, badgeCount: 8},
  ]);
  const [customRate, setCustomRate] = useState(0);
  const [active, setActive] = useState(0);

  const fetchReferrals = async () => {
    try {
      setReferralsIsBusy(true);
      const response = await getMyReferrals();

      console.log('ref', response.data);
      setReferrals(response.data.Data || []);
    } catch (error) {
    } finally {
      setReferralsIsBusy(false);
    }
  };

  const fetchLatestCommissions = async () => {
    try {
      setLatestCommissionsIsBusy(true);
      const response = await getMyLatestCommissions();

      setLatestCommissions(response.data.Data.items || []);
      setReferralFeeAsBTC(response.data.Data.btc.toFixed(8));
      setReferralFeeAsTRY(response.data.Data.try.toFixed(2));
      setReferralFeeAsUSD(response.data.Data.usd.toFixed(2));
    } catch (error) {
    } finally {
      setLatestCommissionsIsBusy(false);
    }
  };

  const fetchReferralsCountWithKYC = async () => {
    try {
      const response = await getMyReferralsCountWithKYC();

      setReferralKYCValue(response.data.Data.value || 0);
      setReferralKYCMax(response.data.Data.max || 0);
    } catch (error) {}
  };

  const fetchTopCommissions = async () => {
    try {
      const response = await getTopCommissions();

      setTopCommissions(response.data.Data || []);
    } catch (error) {}
  };

  const fetchReferralNick = async () => {
    try {
      const response = await getReferralNickname();

      setReferralNick(response.data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchReferrals();
    fetchLatestCommissions();
    fetchReferralsCountWithKYC();
    fetchTopCommissions();
    fetchReferralNick();
  }, []);

  return (
    <AccountLayout title={'Referrals'} icon={<ReferralsIcon />}>
      <div className="ref-container">
        <div className="ref-rewards">
          <div className="ref-rewards-total">
            <p className="ref-rewards-total-rewards">Total rewards</p>
            <div className="ref-rewards-currencies">
              <p className="ref-rewards-amount">1,056.00</p>
              <p className="ref-rewards-currency">USDT</p>
            </div>
          </div>
          <p className="ref-rewards-text">You are earning 20% of the trading fees your referrals pay. Learn more</p>
        </div>
        <div className="ref-info">
          <div className="ref-info-box">
            <div className="ref-info-amount">icon</div>
            <div className="ref-info-text">QR</div>
          </div>
          <div className="ref-info-box">
            <div className="ref-info-amount-commission">%20</div>
            <div className="ref-info-text"></div>
          </div>
          <div className="ref-info-box">
            <div className="ref-info-amount-commission">0</div>
            <div className="ref-info-text">Number of Referrals</div>
          </div>
          <div className="ref-info-box">
            <div className="ref-info-amount">
              <p className="ref-info-amount-value">
                0.00000
                <span className="ref-info-amount-currency"> BTC</span>
              </p>
            </div>
            <div className="ref-info-text">Commission Value</div>
          </div>
        </div>
        <div className="ref-invite">
          <p className="ref-invite-commission-text">Invite friends to earn 20%</p>
          <div className="ref-invite-inputs">
            <div className="ref-invite-link">
              <p className="ref-invite-link-text">Referral link</p>
              <div className="ref-invite-link-div">
                <p className="ref-invite-link-div-text">https://ui8.net/bitcloud1509</p>
              </div>
            </div>
            <div className="ref-invite-code">
              <p className="ref-invite-code-text">Referral code</p>
              <div className="ref-invite-code-div">
                <p className="ref-invite-code-div-text">N84CRDKK</p>
                <div className="ref-invite-code-div-btn">
                  <p className="ref-invite-code-div-btn-text">Copied</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="ref-commissions">
          <div className="ref-commission-box-selected">
            <div className="ref-commission-top">
              <div className="ref-com-box-top">%20</div>
              <div className="ref-com-box-mid">0-9</div>
            </div>
            <div className="ref-com-box-bottom">
              You are currently earning 20 commissions from users who registered with your referral.
            </div>
          </div>
          <div className="ref-commission-box">
            <div className="ref-commission-top">
              <div className="ref-com-box-top">%25</div>
              <div className="ref-com-box-mid">10-49</div>
            </div>
            <div className="ref-com-box-bottom-none">-</div>
          </div>{' '}
          <div className="ref-commission-box">
            <div className="ref-commission-top">
              <div className="ref-com-box-top">%30</div>
              <div className="ref-com-box-mid">50-99</div>
            </div>
            <div className="ref-com-box-bottom-none">-</div>
          </div>{' '}
          <div className="ref-commission-box">
            <div className="ref-commission-top">
              <div className="ref-com-box-top">%35</div>
              <div className="ref-com-box-mid">100-249</div>
            </div>
            <div className="ref-com-box-bottom-none">-</div>
          </div>{' '}
          <div className="ref-commission-box">
            <div className="ref-commission-top">
              <div className="ref-com-box-top">%40</div>
              <div className="ref-com-box-mid">250-499</div>
            </div>
            <div className="ref-com-box-bottom-none">-</div>
          </div>{' '}
          <div className="ref-commission-box">
            <div className="ref-commission-top">
              <div className="ref-com-box-top">%45</div>
              <div className="ref-com-box-mid">500-999</div>
            </div>
            <div className="ref-com-box-bottom-none">-</div>
          </div>{' '}
          <div className="ref-commission-box">
            <div className="ref-commission-top">
              <div className="ref-com-box-top">%50</div>
              <div className="ref-com-box-mid">1000-1999</div>
            </div>
            <div className="ref-com-box-bottom-none">-</div>
          </div>{' '}
          <div className="ref-commission-box">
            <div className="ref-commission-top">
              <div className="ref-com-box-top">%60</div>
              <div className="ref-com-box-mid">2000+</div>
            </div>
            <div className="ref-com-box-bottom-none">-</div>
          </div>
        </div>
        <div className="ref-button">My wallet</div>
      </div>
    </AccountLayout>
  );
};

export default Referrals;
