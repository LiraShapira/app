import { Text, StyleSheet, Modal, View, useColorScheme } from 'react-native';
import CustomButton, { ButtonProps } from './CustomButton';
import {
  selectIsModalVisible,
  selectModalText,
} from '../../store/appStateSlice';
import { useAppSelector } from '../../hooks';
import Colors from '../../constants/Colors';

export interface CustomModalProps {
  buttons: ButtonProps[];
  type?: 'info' | 'error';
  customElement?: JSX.Element;
}

export const CustomModal = ({
  type = 'info',
  buttons,
  customElement,
}: CustomModalProps) => {
  const isModalVisible = useAppSelector(selectIsModalVisible);
  const ModalText = useAppSelector(selectModalText);
  const colorScheme = useColorScheme();

  return (
    <View style={styles.centeredView}>
      <Modal animationType='slide' transparent={true} visible={isModalVisible}>
        <View
          style={{
            backgroundColor: Colors[colorScheme ?? 'light'].background,
            borderColor: type === 'info' ? 'blue' : 'red',
            borderWidth: isModalVisible ? 2 : 0,
            borderRadius: 20,
            margin: 20,
            top: '30%',
          }}
        >
          <View style={styles.modalView}>
            <Text style={{ color: Colors[colorScheme ?? 'light'].text }}>
              {ModalText}
            </Text>
            {customElement}
            {buttons.map((props) => {
              return (
                <View key={props.text} style={{ marginTop: 5 }}>
                  <CustomButton {...props} />
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
