import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import StepTwo from '../../app/step-two';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

interface Props {
  pressStep: (index: number) => void;
  activeStep: number;
  disableButtonClick: boolean;
}

const Steps = [
  {
    label: 'Step 1',
    id: 1,
  },
  {
    label: 'Step 2',
    id: 2,
  },
  {
    label: 'Step 3',
    id: 3,
  },
];

const StepsIndicator = ({
  pressStep,
  activeStep = 1,
  disableButtonClick = false,
}: Props) => {
  const navigation = useNavigation();
  const exitToSend = () => {
    navigation.navigate('Home');
  };
  return (
    <View style={styles.container}>
      <View style={styles.headers}>
        <View style={styles.leftItem}>
          <MaterialIcons onPress={exitToSend} name='close' size={25} />
        </View>

        <View style={styles.centerItem}>
          <Text style={styles.requestText}>Request Lira</Text>
        </View>
        <View style={styles.info}>
          <MaterialIcons name='info-outline' size={25} />
        </View>
      </View>
      {Steps.map(({ label, id }) => (
        <TouchableOpacity
          key={id}
          onPress={() => (disableButtonClick ? false : pressStep(id))}
          style={{
            paddingTop: 115,
            margin: 3,
            flexDirection: 'row',
          }}
        >
          <Text
            style={{
              ...styles.stepIndicator,
              ...(activeStep === id ? { backgroundColor: 'lightgreen' } : {}),
            }}
          >
            {label}
          </Text>

          {id === 3 ? (
            false
          ) : (
            <FontAwesome name='arrow-right' size={20} color='black' />
          )}
          <View
            style={{
              flexDirection: 'row',
              position: 'absolute',
              margin: 15,
              top: 85,
            }}
          >
            {activeStep === id ? (
              <FontAwesome name='check-circle' size={20} color='green' />
            ) : (
              false
            )}
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    shadowColor: 'grey',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  stepIndicator: {
    height: 20,
    fontSize: 12,
    cursor: 'pointer',
    paddingHorizontal: 10,
    marginHorizontal: 3,
    borderRadius: 10,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
  },
  headers: {
    flexDirection: 'row',
    position: 'absolute',
    width: '100%',
  },
  info: {
    flex: 1,
    alignItems: 'center',
  },
  centerItem: {
    flex: 4,
    alignItems: 'center',
  },
  leftItem: {
    flex: 1,
    alignItems: 'center',
  },
  requestText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
});
export default StepsIndicator;
