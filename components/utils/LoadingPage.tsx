import {
  Modal,
  View,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

interface LoadingPageProps {
  loading: boolean;
}

const LoadingPage = ({ loading }: LoadingPageProps) => {

  return (
    <View style={styles.centeredView}>
      <Modal animationType="none" transparent={true} visible={loading}>
        <View
          style={{
            position: 'absolute',
            top: '30%',
            right: '40%'
          }}
        >
          <View style={styles.modalView}>
            <ActivityIndicator size='large' style={{ padding: 35 }} color="#00ff00" />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default LoadingPage;

const styles = StyleSheet.create({
  centeredView: {
    position: 'absolute',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    borderStyle: 'solid',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
