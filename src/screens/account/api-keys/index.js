'use client';
import {APIKeysIcon} from '@/components/Icons/ProfileInfoIcons';
import AccountLayout from '@/layouts/account';
import React, {useState, useEffect} from 'react';
import './index.scss';
import {CoolButton, MailBox, TextBox} from '@/components';
import CrossIcon from '@/components/Icons/CrossIcon';
import {apiPageApi} from '@/services/account/apiPage';

const ApiKeys = () => {
  const [getAPIKeys, getAPIKeysResponse] = apiPageApi.useGetAPIKeysMutation();
  const [createAPIKey, createAPIKeyResponse] = apiPageApi.useCreateAPIKeyMutation();
  const [confirmAPIKey, confirmAPIKeyResponse] = apiPageApi.useConfirmAPIKeyMutation();
  const [deleteAPIKey, deleteAPIKeyResponse] = apiPageApi.useDeleteAPIKeyMutation();
  const [deleteAllAPI, deleteAllAPIResponse] = apiPageApi.useDeleteAllAPIMutation();
  const [updateAPIKey, updateAPIKeyResponse] = apiPageApi.useUpdateAPIKeyMutation();

  const [loading, setLoading] = useState(false);
  const [busyCreate, setBusyCreate] = useState(false);
  const [busyDelAll, setBusyDelAll] = useState(false);
  const [apiKeys, setApiKeys] = useState([]);
  const [apiName, setApiName] = useState('');
  const [apiNameErrorMessage, setApiNameErrorMessage] = useState('');
  const [apiCreated, setApiCreated] = useState(false);
  const [apiConfirmed, setApiConfirmed] = useState(false);

  const fetchGetApiKey = async () => {
    try {
      const response = await getAPIKeys();

      console.log('ref', response);
    } catch (error) {
    } finally {
    }
  };

  useEffect(() => {
    fetchGetApiKey();
  }, []);

  return (
    <AccountLayout title={'API Keys'} icon={<APIKeysIcon />}>
      {!apiCreated && (
        <div className="api-container">
          <div className="api-title">
            <div className="api-title-main">
              <p className="api-title-top">Enable API access on your account to generate keys.</p>
              <p className="api-title-bottom">Get an API Key</p>
            </div>
            <div className="api-title-mail">
              <p className="api-title-mail-text">
                <MailBox /> schinner@ui8.net
              </p>
            </div>
          </div>
          <div className="api-inputs">
            <p className="api-inputs-text">Enable API keys</p>
            <div className="api-inputs-div">
              <p className="api-inputs-div-text">Enter your password and 2FA code to Enable the API keys</p>
              <div className="api-inputs-div-div">
                <div className="api-inputs-div-div-input">
                  <p className="api-inputs-div-div-text">Enter API Key Name</p>
                  <TextBox placeholder="Enter API Key Name" />
                </div>
                <div className="api-input-btn">
                  <CoolButton type="Main" fullSize label="Create API Key" />
                </div>
              </div>
            </div>
          </div>
          <div className="api-keys">
            <p className="api-keys-title">Your API Keys</p>
            <div className="api-keys-div">
              <p className="api-keys-div-title">deneme title</p>
              <div className="api-key-div-field">
                <div className="api-key-div-field-div">
                  <p className="api-key-div-field-div-title">OI8YEFO948474jsjwks4SDYEFO94</p>
                  <p className="api-key-div-field-div-btn">COPY</p>
                </div>
                <p>
                  <CrossIcon />
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      {apiCreated && (
        <div className="api-container">
          <div className="api-icon">
            <div className="api-icon-content">
              <img src="/assets/images/shield.png" alt="shield" />
            </div>
            <div className="api-icon-text">
              <p className="api-icon-text-content">
                Please check your email to confirm this action. As a security measure, the confirmation link will expire
                in 15 minutes.
              </p>
            </div>
            <div className="api-icon-mail">
              <p className="api-icon-mail-content">
                <MailBox /> schinner@ui8.net
              </p>
            </div>
          </div>
          <div className="api-button">
            <div className="api-button-button">API Keys Sayfasına Dön</div>
          </div>
          <div className="api-keys">
            <p className="api-keys-title">Your API Keys</p>
            <div className="api-keys-div">
              <p className="api-keys-div-title">deneme title</p>
              <div className="api-key-div-field">
                <div className="api-key-div-field-div">
                  <p className="api-key-div-field-div-title">
                    5dbcb179df6c87b875a20dde894cc4c62b93a415fe454e54ff6b1c4018240141
                  </p>
                  <div className="api-key-div-field-div-btn-field">
                    <p className="api-key-div-field-div-btn">EDIT</p>
                    <p className="api-key-div-field-div-btn">COPY</p>
                  </div>
                </div>
                <p>
                  <CrossIcon />
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </AccountLayout>
  );
};

export default ApiKeys;
