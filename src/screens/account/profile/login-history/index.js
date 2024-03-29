import {useTranslation} from '@/app/i18n/client';
import {Card, LoadingGif, Spacer, Text} from '@/components';
import {AccountLayoutTitle} from '@/layouts';
import {userApi} from '@/services/user';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material';
import {useEffect} from 'react';

const AccountLoginHistory = () => {
  const {data, error, isLoading} = userApi.useGetLoginHistoryOfTheUserQuery();
  const {t} = useTranslation();

  useEffect(() => {
    console.log('Data: ', data);
  }, []);

  return (
    <Card animated>
      <Spacer height={{lg: '40px', base: '50px', md: '30px'}} />
      <Card align-items="center" gap="1rem" display="flex">
        <Text font-size="2rem">{t('loginHistory')}</Text> {isLoading && <LoadingGif isPuff />}{' '}
      </Card>
      {!isLoading && (
        <Card className="table-wrapper">
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Divice</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>IP Address</TableCell>
                  <TableCell>Time</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.Data.map((item, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell>{item.d}</TableCell>
                      <TableCell>{item.l}</TableCell>
                      <TableCell>{item.i}</TableCell>
                      <TableCell>{item.t}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      )}
    </Card>
  );
};

export default AccountLoginHistory;
