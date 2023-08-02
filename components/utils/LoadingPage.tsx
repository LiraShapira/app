import { StyleSheet, ActivityIndicator, View } from 'react-native';

export default function LoadingPage() {
  return (
    <View style={styles.loadingPage}>
      <ActivityIndicator color='black' size='large' />
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
