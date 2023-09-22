import { Text, StyleSheet, Modal, View, Pressable } from 'react-native';

export interface CustomModalButton {
  text: string;
  onPress: (e: any) => void;
}

export interface CustomModalProps {
  visible: boolean;
  message: string;
  buttons: CustomModalButton[];
  type: 'info' | 'error';
}

export const CustomModal = ({
  type = 'info',
  visible,
  message,
  buttons,
}: CustomModalProps) => {
  return (
    <View
      style={{
        ...styles.centeredView,
      }}
    >
      <Modal animationType='slide' transparent={true} visible={visible}>
        <View style={styles.centeredView}>
          <View
            style={{
              borderColor: type === 'info' ? 'blue' : 'red',
              borderWidth: visible ? 2 : 0,
              borderRadius: 20,
            }}
          >
            <View style={styles.modalView}>
              <Text>{message}</Text>
              {buttons.map(({ text, onPress }) => {
                return (
                  <Pressable key={text} onPress={onPress}>
                    <Text>{text}</Text>
                  </Pressable>
                );
              })}
            </View>
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
    marginTop: 22,
  },
  modalView: {
    margin: 20,
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
