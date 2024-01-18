'use client';
import {APIKeysIcon} from '@/components/Icons/ProfileInfoIcons';
import AccountLayout from '@/layouts/account';
import React, {useState, useEffect} from 'react';
import './index.scss';
import {
  Card,
  ChevronDownIcon,
  ChevronUpIcon,
  CoolButton,
  Form,
  MailBox,
  Text,
  TextBox,
  TextCopiableBox,
  VerticalDivider,
} from '@/components';
import CrossIcon from '@/components/Icons/CrossIcon';
import {apiPageApi} from '@/services/account/apiPage';
import {MdCompareArrows} from 'react-icons/md';
import {useSelector} from 'react-redux';
import {useFormik} from 'formik';
import {useTranslation} from '@/app/i18n/client';
import {AdsClickOutlined} from '@mui/icons-material';
import {AccountLayoutTitle} from '@/layouts';
import {Checkbox, Radio} from '@mui/material';
import {motion} from 'framer-motion';

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

  const ApiKeyItemRenderer = ({item, isOpen, setIsOpen}) => {
    const isVisible = isOpen?.id == item?.id;
    return (
      <Card margin-bottom="2rem" background="var(--neutrals7)" padding="1.25rem" border-radius="1.25rem">
        <Card display="flex" justify-content="space-between" align-items="center">
          <Card gap="1rem" font-size="1.25rem" font-weight="thin" display="flex" align-items="center">
            <APIKeysIcon />
            <Card as="span" font-size="1.25rem" font-weight="thin">
              Name of the api key
            </Card>
          </Card>
          {isVisible && (
            <motion.div initial={{opacity: 0.5, y: -20}} animate={{opacity: 1, y: 0}}>
              <Card display="flex" gap="1rem" justify-content="flex-end" align-items="center">
                <CoolButton label="Delete" type="Small" />
                <CoolButton label="Edit" type="Main&Small" />

                <Card
                  onClick={() => setIsOpen({})}
                  cursor="pointer"
                  display="flex"
                  justify-content="flex-end"
                  align-items="center"
                  width="fit-content"
                >
                  <ChevronUpIcon />
                </Card>
              </Card>
            </motion.div>
          )}
          {!isVisible && (
            <Card
              onClick={() => setIsOpen(item)}
              cursor="pointer"
              display="flex"
              justify-content="flex-end"
              align-items="center"
            >
              <ChevronDownIcon />
            </Card>
          )}
        </Card>

        {isVisible && (
          <motion.div initial={{opacity: 0.5, y: 30}} animate={{opacity: 1, y: 0}}>
            <VerticalDivider />
            <Card display="flex" flex-direction="column" gap="1.5rem">
              <Card>
                <Card as="span" font-weight="bold">
                  {t('apiKey')}
                </Card>
                <Card>
                  <TextCopiableBox value="OI8YEFO948474jsjwks4SDYEFO94" />
                </Card>
              </Card>
              <Card>
                <Card as="span" font-weight="bold">
                  {t('secretKey')}
                </Card>
                <Card>
                  <TextCopiableBox
                    info="some information about the input"
                    isSecure
                    dontShowCopyButton
                    value="OI8YEFO948474jsjwks4SDYEFO94"
                  />
                </Card>
              </Card>

              <VerticalDivider />
              <Card>
                <Card as="span" font-weight="bold">
                  {t('apiResctrictions')}
                </Card>
                <Card gap="2rem" display="flex" align-items="center">
                  <Card
                    margin-top="1rem"
                    display="flex"
                    width="fit-content"
                    align-items="center"
                    justify-content="center"
                    gap="0.3rem"
                  >
                    <Checkbox />
                    <Card>
                      <Card color="var(--gray)">Readonly </Card>
                    </Card>
                  </Card>
                  <Card margin-top="1rem" display="flex" align-items="center" justify-content="center" gap="0.3rem">
                    <Checkbox />
                    <Card>
                      <Card color="var(--gray)">Active Trading</Card>
                    </Card>
                  </Card>{' '}
                </Card>
              </Card>
              <VerticalDivider />
              <Card>
                <Card as="span" font-weight="bold">
                  {t('apiAccessResctrictions')}
                </Card>
                <Card margin-top="1rem" display="flex" align-items="center" justify-content="center" gap="0.3rem">
                  <Radio />
                  <Card>
                    <Card color="var(--gray)">Unrestricted (Less secure) </Card>
                    <Card as="p" color="red">
                      This API key allows access from any IP address. This is not recommended.
                    </Card>{' '}
                  </Card>
                </Card>
                <Card margin-top="1rem" display="flex" align-items="center" justify-content="center" gap="0.3rem">
                  <Radio />
                  <Card>
                    <Card color="var(--gray)">
                      Restrict access to trusted IPs only{' '}
                      <Card as="span" color="green">
                        (Recommended)
                      </Card>
                    </Card>
                  </Card>
                </Card>
              </Card>
            </Card>
          </motion.div>
        )}
      </Card>
    );
  };

  const ListOfApiKeysRenderer = ({listOfData}) => {
    const [isOpen, setIsOpen] = useState();

    return (
      <Card>
        {listOfData.map((item, index) => {
          return <ApiKeyItemRenderer key={index} item={item} isOpen={isOpen} setIsOpen={setIsOpen} />;
        })}
      </Card>
    );
  };
  return (
    <AccountLayout title={'API Keys'} icon={<APIKeysIcon />}>
      {!apiCreated && (
        <Card className="api-container">
          <AccountLayoutTitle
            title="Get An API Key"
            desc={
              <Card display="flex" align-items="center" gap="1rem">
                <MailBox />
                {user.informations.email}
              </Card>
            }
          />

          <Card background="var(--neutrals7)" padding="1.25rem" border-radius="1.25rem">
            <Form
              onSubmit={generateApiKeyForm.handleSubmit}
              formInstance={generateApiKeyForm}
              submitButtonText={t('generateApiKeyFormButtonText')}
              dontDisplaySubmitbutton
              dontDisplayCaptcha
            >
              <Card className="api-inputs-div-div">
                <Card display="flex" gap="2rem" align-items="center">
                  <Card width="80%">
                    <p className="api-inputs-div-div-text">Enter API Key Name</p>
                    <TextBox placeholder="Enter API Key Name" />
                  </Card>
                  <Card width="20%" margin-top="2.3rem">
                    <CoolButton type="Main" fullSize label="Create API Key" />
                  </Card>
                </Card>
              </Card>
            </Form>
          </Card>
          <Card align-items="center" gap="1rem" display="flex">
            <Text font-size="2rem">{t('listOfApiKeys')}</Text>
          </Card>
          <ListOfApiKeysRenderer listOfData={apiMockData} />
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
