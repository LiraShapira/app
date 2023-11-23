import 'react-native-gesture-handler';
import { Redirect } from 'expo-router';
import { Logs } from 'expo'

Logs.enableExpoCliLogging()

const Index = () => {
  return <Redirect href={'/Home'} />;
};
export default Index;
