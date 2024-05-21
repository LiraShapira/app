import { View, Text, useColorScheme, TextInput, Platform } from 'react-native';
import Colors from '../constants/Colors';
import i18n from '../translationService';
import CustomButton from '../components/utils/CustomButton';
import { useRouter } from 'expo-router';
import GradientContainer from '../components/utils/GradientContainer';
import { useEffect, useState } from 'react';
import { getItem, setItem } from '../utils/asyncStorage';
import { StorageKeys } from '../types/AsyncStorage';
import CustomTag from '../components/utils/CustomTag';
import { selectSelectedEvent, sendNewAttendee } from '../store/eventsSlice';
import { useAppDispatch, useAppSelector } from '../hooks';
import { Attendee, AttendeeRole } from '../types/LSEvents';
import { selectUser } from '../store/userSlice';

function isProductSelected(
  selectedProducts: string[],
  product: string
): boolean {
  return selectedProducts.includes(product);
}

const SellerOptions = () => {
  const [inputtedProduct, setInputtedProduct] = useState<string>('');
  const [productsForSale, setProductsForSale] = useState<string[]>([]);
  const [selectedProductedForSale, setSelectedProductsForSale] = useState<
    string[]
  >([]);
  const colorScheme = useColorScheme() ?? 'light';
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const selectedEvent = useAppSelector(selectSelectedEvent);

  const onPressSend = () => {
    if (productsForSale.includes(inputtedProduct)) return;
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
    setSelectedProductsForSale([...selectedProductedForSale, inputtedProduct]);
    setInputtedProduct('');
  };

  const onSelectItem = (item: string) => {
    const isAlreadySelected = isProductSelected(selectedProductedForSale, item);
    if (isAlreadySelected) {
      const newSelectedItems = selectedProductedForSale.filter(
        (i) => i !== item
      );
      setSelectedProductsForSale(newSelectedItems);
    } else {
      setSelectedProductsForSale((prev) => [...prev, item]);
    }
  };

  const onPressFinish = () => {
    const attendee: Attendee = {
      role: AttendeeRole.seller,
      productsForSale,
      user,
    };
    dispatch(sendNewAttendee({ attendee, eventId: selectedEvent.id }));
    router.push('/Events');
  };

  useEffect(() => {
    if (Platform.OS === 'web') {
      const items = localStorage.getItem('productsForSale');
      if (items) {
        setProductsForSale(JSON.parse(items));
      }
    } else {
      getItem(StorageKeys.phoneNumber).then((items) => {
        if (items) {
          setProductsForSale(JSON.parse(items));
        }
      });
    }
  }, []);

  return (
    <GradientContainer>
      <View
        style={{
          padding: 8,
          gap: 8,
          alignItems: 'flex-start',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'space-between',
        }}
      >
        <View>
          <View style={{ display: 'block' }}>
            <Text
              style={{
                fontSize: 24,
                fontWeight: '700',
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
          <View
            style={{
              flexDirection: 'row',
              margin: 'auto',
              marginTop: 15,
            }}
          >
            {productsForSale.map((item) => (
              <CustomTag
                key={item}
                active={isProductSelected(selectedProductedForSale, item)}
                text={item}
                onPress={() => onSelectItem(item)}
              />
            ))}
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            gap: 4,
            padding: 8,
            alignSelf: 'center',
          }}
        >
          <CustomButton
            onPress={onPressSend}
            text={i18n.t('seller_options_add_item')}
          />
          <CustomButton
            disabled={!selectedProductedForSale.length}
            onPress={onPressFinish}
            text={i18n.t('seller_options_finish')}
          />
        </View>
      </View>
    </GradientContainer>
  );
};

export default SellerOptions;
