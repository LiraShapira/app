import { Attendee, AttendeeRole, LSEvent, Seller } from '../../types/LSEvents';
import { CustomIcon } from '../utils/CustomIcon';
import { IconLibrary } from '../../types/Icons';
import { useMemo, useState } from 'react';
import { daysLongForm } from '../../constants/Dates';
import i18n from '../../translationService';
import { formatDate, formatTime } from '../../utils/functions';
import { Image } from 'expo-image';
import CustomButton from '../utils/CustomButton';
import Colors from '../../constants/Colors';
import {
  Pressable,
  Share,
  View,
  Text,
  Modal,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import RadioForm from 'react-native-simple-radio-button';

const radio_props = [
  { label: 'seller', value: AttendeeRole.seller },
  { label: 'attendee', value: AttendeeRole.attendee },
  { label: 'volunteer', value: AttendeeRole.volunteer },
];

function isSeller(attendee: Attendee): attendee is Seller {
  return attendee.role === 'seller';
}

export default function LSEventItem({ event }: { event: LSEvent }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [attendeeRole, setAttendeeRole] = useState('test');

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const colorScheme = useColorScheme() ?? 'light';
  const { dateDisplayText, items, sellers, day } = useMemo(() => {
    const sellers = event.attendees.filter(isSeller);
    const items = sellers.reduce((acc: string[], currentSeller: Seller) => {
      return [...acc, ...currentSeller.productsForSale];
    }, []);
    const startDate = new Date(event.startDate);
    const endDate = new Date(event.endDate);
    const startDateFormatted = formatDate(startDate);
    const startTimeFormatted = formatTime(startDate);

    // Format the end date
    const endTimeFormatted = formatTime(endDate);

    // Combine the formatted dates and times
    const dateDisplayText = `${startDateFormatted} ${startTimeFormatted}-${endTimeFormatted}`;

    return {
      dateDisplayText,
      items,
      sellers,
      day: daysLongForm[startDate.getDay()],
    };
  }, [event.id]);

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `check out this event from Lira Shapira: ${event.title}, ${dateDisplayText} `,
      });
      if (result?.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <View style={styles.LSEventItem}>
      <Modal
        transparent
        visible={modalVisible}
        animationType='slide'
        onRequestClose={closeModal}
      >
        <View
          style={{
            height: '50%',
            marginTop: 'auto',
            backgroundColor: Colors[colorScheme].shading,
          }}
        >
          <Text style={styles.modalTitle}>Joining as a...</Text>
          <RadioForm radio_props={radio_props} onPress={setAttendeeRole} />
          <Pressable onPress={closeModal}>
            <Text>Close Modal</Text>
          </Pressable>
        </View>
      </Modal>
      <Pressable>
        <Image
          style={{ height: 173, borderRadius: '29px 29px 0 0', width: '100%' }}
          source='../../assets/images/types-of-peppers-1-1200.jpg'
        />
        <View style={styles.eventInfo}>
          <View style={{ flexDirection: 'row' }}>
            <Text>{i18n.t(`day_${day}`)}, </Text>
            <Text style={{ color: Colors[colorScheme].text }}>
              {dateDisplayText}
            </Text>
          </View>
          <Text
            style={{
              color: Colors[colorScheme].text,
              fontSize: 24,
              fontWeight: 400,
            }}
          >
            {event.title}
          </Text>
          <Text style={{ color: Colors[colorScheme].text, fontSize: 15 }}>
            {event.location.name}
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <CustomIcon
              iconLibraryName={IconLibrary.Ionicons}
              iconName='person-circle'
              size={50}
              color={'grey'}
            />
            <View>
              <Text styles={{ color: Colors[colorScheme].text }}>
                {event.attendees.length} Attendees
              </Text>
              <Text style={{ color: Colors[colorScheme].text }}>
                {sellers.length} sellers is selling: {items.join(', ')}
              </Text>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <CustomButton text='RSVP' onPress={openModal} />
            <CustomButton
              textColor={Colors[colorScheme].text}
              transparent
              text='share '
              onPress={onShare}
            />
          </View>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  LSEventItem: {},
  eventInfo: {
    justifyContent: 'space-between',
    gap: 5,
    margin: 10,
  },
  buttonContainer: {
    marginVertical: 10,
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginHorizontal: 'auto',
  },
});
