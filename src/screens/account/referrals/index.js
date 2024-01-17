import {ReferralsIcon} from '@/components/Icons/ProfileInfoIcons';
import AccountLayout from '@/layouts/account';
import './index.scss';
import { referralApi } from '@/services/referral';

const Referrals = () => {
  const [getMyReferrals, userInformationResponse] = referralApi.useGetMyReferrals();

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
