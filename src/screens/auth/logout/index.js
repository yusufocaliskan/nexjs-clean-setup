const {default: useAccount} = require('@/hooks/useAccount');
const {useEffect} = require('react');

const LogoutScreen = () => {
  const {logout} = useAccount();
  useEffect(() => {
    logout();
  }, []);
  return <></>;
};
export default LogoutScreen;
