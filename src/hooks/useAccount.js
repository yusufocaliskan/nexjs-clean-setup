import {useDispatch} from 'react-redux';
import {cleanUpUserStore} from '@/store/user';
const useAccount = () => {
  const dispatch = useDispatch();

  const logout = async () => {
    dispatch(cleanUpUserStore());
  };
  return {logout};
};

export default useAccount;
