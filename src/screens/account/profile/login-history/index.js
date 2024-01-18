import {Card, LoadingGif, Spacer, Text} from '@/components';
import {userApi} from '@/services/user';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material';
import {useEffect} from 'react';

const AccountLoginHistory = () => {
  const [getLoginHistoryOfTheUser, loginHistoryResponse] = userApi.useGetLoginHistoryOfTheUserMutation();
  useEffect(() => {
    getLoginHistoryOfTheUser();
  }, []);
  useEffect(() => {
    console.log(loginHistoryResponse);
  }, [loginHistoryResponse]);
  return (
    <Card>
      <Spacer height={{lg: '40px', base: '50px', md: '30px'}} />
      <Card display="flex" alignItems="center" gap="1rem">
        <Text>Login History</Text>
        {loginHistoryResponse.isLoading && <LoadingGif isPuff />}
      </Card>

      {!loginHistoryResponse.isLoading && (
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
                {loginHistoryResponse.data?.Data.map((item, index) => {
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
