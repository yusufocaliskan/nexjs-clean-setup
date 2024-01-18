'use client';
import {APIKeysIcon} from '@/components/Icons/ProfileInfoIcons';
import AccountLayout from '@/layouts/account';
import React, {useState, useEffect} from 'react';
import './index.scss';
import {Card, CoolButton, Form, MailBox, Text, TextBox} from '@/components';
import CrossIcon from '@/components/Icons/CrossIcon';
import {apiPageApi} from '@/services/account/apiPage';
import {useSelector} from 'react-redux';
import {useFormik} from 'formik';
import {useTranslation} from '@/app/i18n/client';
import {AccountLayoutTitle} from '@/layouts';
import ApiKeysList from './api-key-list';

const ApiKeys = () => {
  const user = useSelector((state) => state.user);
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

  const {t} = useTranslation();
  const apiMockData = [{id: 1}, {id: 2}, {id: 3}];
  const generateApiKeyForm = useFormik({
    initialValues: {
      Password: '',
      Email: '',
      reCaptcha: '',
    },
    //validationSchema: loginFormValidations,
    validateOnMount: true,
    onSubmit: () => handleOnSubmitGenerateForm(),
  });

  const handleOnSubmitGenerateForm = () => {};
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
      <AccountLayoutTitle
        title="Get An API Key"
        margin-bottom="3rem"
        desc={
          <Card display="flex" align-items="center" gap="1rem">
            <MailBox />
            {user.informations.email}
          </Card>
        }
      />
      {!apiCreated && (
        <Card className="api-container">
          <Card background="var(--neutrals7)" padding="1.25rem" border-radius="1.25rem">
            <Form
              onSubmit={generateApiKeyForm.handleSubmit}
              formInstance={generateApiKeyForm}
              submitButtonText={t('generateApiKeyFormButtonText')}
              dontDisplaySubmitbutton
              dontDisplayCaptcha
            >
              <Card className="api-inputs-div-div">
                <Card
                  display="flex"
                  flex-direction={{base: 'column', lg: 'row', md: 'column'}}
                  gap="2rem"
                  align-items="center"
                >
                  <Card width={{base: '100%', md: '80%', lg: '80%'}}>
                    <p className="api-inputs-div-div-text">Enter API Key Name</p>
                    <TextBox placeholder="Enter API Key Name" />
                  </Card>
                  <Card
                    width={{base: '100%', md: '80%', lg: '20%'}}
                    margin-top={{base: '1rem', md: '1rem', lg: '2.25rem'}}
                  >
                    <CoolButton type="Main" fullSize label="Create API Key" />
                  </Card>
                </Card>
              </Card>
            </Form>
          </Card>
          <Card align-items="center" gap="1rem" display="flex">
            <Text font-size="2rem">{t('listOfApiKeys')}</Text>
          </Card>
          <ApiKeysList listOfData={apiMockData} />
          {/* <ApiKeyItemRenderer /> */}
          {/* <ApiKeyItemRenderer /> */}
          {/* <ApiKeyItemRenderer /> */}
        </Card>
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
