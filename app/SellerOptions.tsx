import {
  View,
  Text,
  useColorScheme,
  TextInput,
  Platform,
  StyleSheet,
  Modal,
  Pressable,
} from 'react-native';
import Colors from '../constants/Colors';
import i18n from '../translationService';
import CustomButton from '../components/utils/CustomButton';
import { useRouter } from 'expo-router';
import GradientContainer from '../components/utils/GradientContainer';
import { useEffect, useState } from 'react';
import { getItem, removeItem, setItem } from '../utils/asyncStorage';
import { StorageKeys } from '../types/AsyncStorage';
import CustomTag from '../components/utils/CustomTag';
import {
  selectSelectedEvent,
  sendNewAttendee,
  setEvents,
  setSelectedEvent,
} from '../store/eventsSlice';
import { useAppDispatch, useAppSelector } from '../hooks';
import { Attendee, AttendeeRole, Seller } from '../types/LSEvents';
import { selectUser } from '../store/userSlice';
import { setAppLoading } from '../store/appStateSlice';
import { mockEvent1 } from '../Mocks/mockDB';

function isProductSelected(
  selectedProducts: string[],
  product: string
): boolean {
  return selectedProducts.includes(product);
}

function isSeller(attendee: Attendee): attendee is Seller {
  return attendee.role === 'seller';
}

const SellerOptions = () => {
  const [inputtedProduct, setInputtedProduct] = useState<string>('');
  const [productsForSale, setProductsForSale] = useState<string[]>([]);
  const [selectedProductsForSale, setSelectedProductsForSale] = useState<
    string[]
  >([]);
  const colorScheme = useColorScheme() ?? 'light';
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const selectedEvent = useAppSelector(selectSelectedEvent);
  const [showWriteUI, setShowWriteUI] = useState(true);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const onPressAddItem = () => {
    if (productsForSale.includes(inputtedProduct)) {
      setInputtedProduct('');
      return;
    }
    const newItemsForSale = JSON.stringify([
      ...productsForSale,
      inputtedProduct,
    ]);
    if (Platform.OS === 'web') {
      localStorage.setItem(StorageKeys.productsForSale, newItemsForSale);
    } else {
      setItem(StorageKeys.productsForSale, newItemsForSale);
    }
    setProductsForSale([...productsForSale, inputtedProduct]);
    setSelectedProductsForSale([...selectedProductsForSale, inputtedProduct]);
    setInputtedProduct('');
  };

  const onSelectItem = (item: string) => {
    const isAlreadySelected = isProductSelected(selectedProductsForSale, item);
    if (isAlreadySelected) {
      const newSelectedItems = selectedProductsForSale.filter(
        (i) => i !== item
      );
      setSelectedProductsForSale(newSelectedItems);
    } else {
      setSelectedProductsForSale((prev) => [...prev, item]);
    }
  };

  const onPressFinish = () => {
    dispatch(setAppLoading(true));
    const attendee: Attendee = {
      role: AttendeeRole.seller,
      productsForSale: selectedProductsForSale,
      user,
      userId: user.id,
    };
    dispatch(sendNewAttendee({ attendee, eventId: selectedEvent.id }))
      .unwrap()
      .then(({ data: updatedEvents }) => {
        dispatch(setEvents(updatedEvents));
      })
      .catch((e) => {
        console.log(e.message);
      });
    router.push('/Events');
    dispatch(setSelectedEvent(mockEvent1));
    dispatch(setAppLoading(false));
  };

  const onDeleteItem = (item: string) => {
    const filteredProducts = productsForSale.filter((p) => p !== item);
    const filteredSelectedProducts = selectedProductsForSale.filter(
      (p) => p !== item
    );

    if (filteredProducts.length === 0) {
      if (Platform.OS === 'web') {
        localStorage.removeItem(StorageKeys.productsForSale);
      } else {
        removeItem(StorageKeys.productsForSale);
      }
    }

    if (Platform.OS === 'web') {
      localStorage.setItem(
        StorageKeys.productsForSale,
        JSON.stringify(filteredProducts)
      );
    } else {
      setItem(StorageKeys.productsForSale, JSON.stringify(filteredProducts));
    }
    setProductsForSale(filteredProducts);
    setSelectedProductsForSale(filteredSelectedProducts);
  };

  // run on initial load
  useEffect(() => {
    if (Platform.OS === 'web') {
      const items = localStorage.getItem('productsForSale');
      if (items) {
        setProductsForSale(JSON.parse(items));
        setShowWriteUI(false);
      }
    } else {
      getItem(StorageKeys.productsForSale).then((items) => {
        if (items) {
          setShowWriteUI(false);
          setProductsForSale(JSON.parse(items));
        }
      });
    }
    const sellers = selectedEvent.attendees.filter(isSeller);
    console.log({ sellers });
    const isUserSeller: Seller | undefined = sellers.find(
      (s) => s.userId === user.id
    );
    if (isUserSeller) {
      setSelectedProductsForSale(isUserSeller.productsForSale);
    }
  }, []);

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <GradientContainer>
      <Modal
        transparent
        visible={modalVisible}
        animationType='slide'
        onRequestClose={closeModal}
      >
        <View
          style={{
            padding: 15,
            height: '25%',
            marginTop: 'auto',
            backgroundColor: Colors[colorScheme].shading,
          }}
        >
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}
          >
            <Pressable onPress={closeModal}>
              <Text style={{ fontSize: 18 }}>X</Text>
            </Pressable>
            <Text style={{ fontFamily: 'Assistant', fontSize: 18 }}>
              What are you selling
            </Text>
            <CustomButton
              transparent
              disabled={!inputtedProduct}
              text={'send'}
              onPress={onPressAddItem}
            />
          </View>
          <TextInput
            placeholder='honey'
            placeholderTextColor='grey'
            style={{
              borderBottomColor: 'grey',
              borderBottomWidth: 1,
              margin: 12,
              padding: 12,
              fontSize: 18,
            }}
            value={inputtedProduct}
            onChangeText={setInputtedProduct}
          />
        </View>
      </Modal>
      <View style={styles.container}>
        <View style={{ width: '100%', padding: 12 }}>
          {showWriteUI && (
            <View style={{ gap: 24 }}>
              <Text
                style={{
                  ...styles.headerText,
                  color: Colors[colorScheme ?? 'light'].text,
                }}
              >
                What you selling?
              </Text>
              <TextInput
                onChangeText={setInputtedProduct}
                autoFocus
                value={inputtedProduct}
                maxLength={15}
                style={{
                  fontSize: 14,
                  textAlign: 'center',
                  color: Colors[colorScheme ?? 'light'].text,
                  borderBottomWidth: 1,
                  width: '100%',
                }}
              />
            </View>
          )}
          <View>
            {!showWriteUI && (
              <Text
                style={{
                  ...styles.headerText,
                  color: Colors[colorScheme ?? 'light'].text,
                }}
              >
                Select what you will be selling
              </Text>
            )}
            <View style={styles.productTagList}>
              {productsForSale.map((item) => (
                <CustomTag
                  showDeleteButton
                  onDelete={onDeleteItem}
                  key={item}
                  active={isProductSelected(selectedProductsForSale, item)}
                  text={item}
                  onPress={() => onSelectItem(item)}
                />
              ))}
            </View>
            {!showWriteUI && (
              <View
                style={{
                  padding: 12,
                }}
              >
                <CustomButton
                  text={'New Item'}
                  onPress={() => setModalVisible(true)}
                />
              </View>
            )}
          </View>
        </View>

        <View style={styles.bottomButtons}>
          {showWriteUI && (
            <CustomButton
              onPress={onPressAddItem}
              text={i18n.t('seller_options_add_item')}
            />
          )}
          <CustomButton
            disabled={!selectedProductsForSale.length}
            onPress={onPressFinish}
            text={i18n.t('seller_options_finish')}
          />
        </View>
      </View>
    </GradientContainer>
  );
};

const styles = StyleSheet.create({
  bottomButtons: {
    flexDirection: 'row',
    gap: 4,
    padding: 8,
    alignSelf: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: '700',
  },
  productTagList: {
    flexDirection: 'row',
    margin: 'auto',
    marginTop: 15,
    flexWrap: 'wrap',
  },
  container: {
    padding: 8,
    gap: 8,
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'space-between',
  },
});

export default SellerOptions;
