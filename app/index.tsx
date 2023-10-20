import { Redirect, useNavigation, useRouter } from 'expo-router';
import { onLoad, selectIsConnected, selectUserLoading } from '../store/userSlice';
import { useAppDispatch, useAppSelector } from '../hooks';
import { useCallback, useEffect, useState } from 'react';
import LoadingPage from '../components/utils/LoadingPage';


const useAuth = () => {
  const [hasFetched, setHasFetched] = useState<boolean>(false);
  const dispatch = useAppDispatch();


}

const Index = () => {


  return <LoadingPage />
  return <Redirect href={'/Home'} />;
};
export default Index;
