import { StyleSheet, ActivityIndicator, View } from 'react-native';

interface LoadingPageProps {
  children: React.ReactNode;
  loading: boolean;
}

export default function LoadingPage({ children, loading }: LoadingPageProps) {
  return (
    <View style={styles.loadingPage}>
      {loading ? <ActivityIndicator color="black" size="large" /> : children}
    </View>
  );
}

const styles = StyleSheet.create({
  loadingPage: {
    flex: 1,
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
});
