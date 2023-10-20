import { Redirect, useNavigation, useRouter } from 'expo-router';
import { onLoad, selectIsConnected, selectUserLoading } from '../store/userSlice';
import { useAppDispatch, useAppSelector } from '../hooks';
import { useCallback, useEffect, useState } from 'react';

const Index = () => {
  return <Redirect href={'/Home'} />;
};
export default Index;
