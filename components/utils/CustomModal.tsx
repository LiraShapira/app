import { Text, StyleSheet, Modal, View, Pressable } from 'react-native';
import CustomButton, { ButtonProps } from './CustomButton';

export interface CustomModalProps {
  visible: boolean;
  message: string;
  buttons: ButtonProps[];
  type?: 'info' | 'error';
}

export const CustomModal = ({
  type = 'info',
  visible,
  message,
  buttons,
}: CustomModalProps) => {
  return (
    <View style={styles.centeredView}>
      <Modal animationType='slide' transparent={true} visible={visible}>
        <View
          style={{
            borderColor: type === 'info' ? 'blue' : 'red',
            borderWidth: visible ? 2 : 0,
            borderRadius: 20,
            margin: 20,
            top: '30%',
          }}
        >
          <View style={styles.modalView}>
            <Text>{message}</Text>
            {buttons.map(({ text, onPress }) => {
              return (
                <View key={text} style={{ marginTop: 5 }}>
                  <CustomButton text={text} onPress={onPress} />
                </View>
              );
            })}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    borderStyle: 'solid',
    padding: 35,
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
