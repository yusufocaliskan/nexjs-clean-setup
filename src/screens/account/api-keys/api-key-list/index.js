'use client';
import {APIKeysIcon} from '@/components/Icons/ProfileInfoIcons';
import React, {useState, useEffect} from 'react';
import '../index.scss';
import {
  Card,
  ChevronDownIcon,
  ChevronUpIcon,
  CoolButton,
  Span,
  Text,
  TextCopiableBox,
  VerticalDivider,
} from '@/components';
import {useTranslation} from '@/app/i18n/client';
import {Checkbox, Radio} from '@mui/material';

const ApiKeysList = ({listOfData}) => {
  const [isOpen, setIsOpen] = useState();
  const {t} = useTranslation();

  const ApiKeyItemRenderer = ({item, isOpen, setIsOpen, index}) => {
    const isVisible = isOpen?.id == item?.id;
    return (
      <Card margin-bottom="2rem" background="var(--neutrals7)" padding="1.25rem" border-radius="1.25rem">
        <Card display="flex" justify-content="space-between" align-items="center">
          <Card gap="1rem" font-size="1.25rem" font-weight="thin" display="flex" align-items="center">
            <Text width="fit-content" font-size="1.25rem" font-weight="thin">
              #{index + 1}
            </Text>
            <APIKeysIcon />
            <Span font-size="1.25rem" font-weight="thin">
              Name of the api key
            </Span>
          </Card>
          {isVisible && (
            <Card animate display="flex" gap="1rem" justify-content="flex-end" align-items="center">
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
          <Card>
            <VerticalDivider />
            <Card display="flex" flex-direction="column" gap="1.5rem">
              <Card>
                <Span font-weight="bold">{t('apiKey')}</Span>
                <Card>
                  <TextCopiableBox value="OI8YEFO948474jsjwks4SDYEFO94" />
                </Card>
              </Card>
              <Card>
                <Span font-weight="bold">{t('secretKey')}</Span>
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
                <Span font-weight="bold">{t('apiResctrictions')}</Span>
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
                  </Card>
                </Card>
              </Card>
              <VerticalDivider />
              <Card>
                <Text font-weight="bold">{t('apiAccessResctrictions')}</Text>
                <Card margin-top="1rem" display="flex" align-items="center" justify-content="center" gap="0.3rem">
                  <Radio />
                  <Card>
                    <Card color="var(--gray)">Unrestricted (Less secure) </Card>
                    <Text color="red">This API key allows access from any IP address. This is not recommended.</Text>
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
          </Card>
        )}
      </Card>
    );
  };

  return (
    <Card animated>
      {listOfData.map((item, index) => {
        return <ApiKeyItemRenderer key={index} index={index} item={item} isOpen={isOpen} setIsOpen={setIsOpen} />;
      })}
    </Card>
  );
};

export default ApiKeysList;
