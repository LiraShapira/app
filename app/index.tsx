import { View } from 'react-native';
import LoadingPage from '../components/utils/LoadingPage';
import { useAppSelector } from '../hooks';
import { selectIsAppLoading } from '../store/appStateSlice';
import { selectAuthFormLoading } from '../store/authFormSlice';
import { selectDepositFormLoading } from '../store/depositFormSlice';
import { selectSendFormLoading } from '../store/sendFormSlice';
import { selectUserLoading } from '../store/userSlice';

export default () => {
  const isUserLoading = useAppSelector(selectUserLoading);
  const isAuthLoading = useAppSelector(selectAuthFormLoading);
  const isDepositFormLoading = useAppSelector(selectDepositFormLoading);
  const isSendFormLoading = useAppSelector(selectSendFormLoading);
  const isAppLoading = useAppSelector(selectIsAppLoading);

  return (
    <View>
      <LoadingPage
        loading={
          isUserLoading ||
          isAuthLoading ||
          isAppLoading ||
          isDepositFormLoading ||
          isSendFormLoading
        }
      />
    </View>
  );
};
