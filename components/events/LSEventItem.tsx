import { Attendee, AttendeeRole, LSEvent } from '../../types/LSEvents';
import { useEffect, useState } from 'react';
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
import { useRouter } from 'expo-router';
import {
  deleteAttendee,
  sendNewAttendee,
  setEvents,
  setSelectedEvent,
} from '../../store/eventsSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectUser } from '../../store/userSlice';
import LSEventItemPeopleDetails from './LSEventItemPeopleDetails';
import { setAppLoading } from '../../store/appStateSlice';

const radio_props = [
  { label: i18n.t('ls_event_item_seller'), value: AttendeeRole.seller },
  { label: i18n.t('ls_event_item_attendee'), value: AttendeeRole.attendee },
  { label: i18n.t('ls_event_item_volunteer'), value: AttendeeRole.volunteer },
  { label: i18n.t('ls_event_item_not_attending'), value: 'not_attending' },
];

type AttendanceOptions = AttendeeRole | 'not_attending';

export default function LSEventItem({ event, listPosition }: { event: LSEvent, listPosition: number }) {
  const [modalVisible, setModalVisible] = useState(false);
  const user = useAppSelector(selectUser);
  const [attendeeRole, setAttendeeRole] = useState<AttendanceOptions>(
    AttendeeRole.seller
  );
  const dispatch = useAppDispatch();

  const router = useRouter();
  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    const isUserAttendee = event.attendees.find(
      (attendee) => attendee.userId === user.id
    );
    if (isUserAttendee) {
      setAttendeeRole(isUserAttendee.role);
    } else {
      setAttendeeRole('not_attending');
    }
  }, []);

  const onSelectRole = () => {
    dispatch(setAppLoading(true));
    if (attendeeRole === 'not_attending') {
      dispatch(deleteAttendee({ userId: user.id, eventId: event.id }))
        .unwrap()
        .then(({ data: updatedEvents }) => {
          dispatch(setEvents(updatedEvents));
        });
      setModalVisible(false);
    } else if (attendeeRole !== AttendeeRole.seller) {
      const userWithoutTransactions = {
        ...user,
        transactions: [],
      };
      const attendee: Attendee = {
        role: attendeeRole,
        user: userWithoutTransactions,
        userId: user.id,
      };
      dispatch(sendNewAttendee({ attendee, eventId: event.id }))
        .unwrap()
        .then(({ data: updatedEvents }) => {
          dispatch(setEvents(updatedEvents));
        })
        .catch((e) => {
          console.log(e.message);
        });
    } else if (attendeeRole === AttendeeRole.seller) {
      dispatch(setSelectedEvent(event));
      router.push('/SellerOptions');
    }
    setModalVisible(false);
    dispatch(setAppLoading(false));
  };

  const colorScheme = useColorScheme() ?? 'light';

  const startDate = new Date(event.startDate);
  const endDate = new Date(event.endDate);
  const startDateFormatted = formatDate(startDate);
  const startTimeFormatted = formatTime(startDate);
  const endTimeFormatted = formatTime(endDate);
  const dateDisplayText = `${startDateFormatted} ${startTimeFormatted}-${endTimeFormatted}`;
  const day = daysLongForm[startDate.getDay()];

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

  const returnImageByIndex = () => {
    const images = [
      require('../../assets/images/1.jpg'),
      require('../../assets/images/2.jpg'),
      require('../../assets/images/3.jpg'),
    ];
    return images[listPosition % images.length];
  }


  return (
    <View>
      <Modal
        transparent
        visible={modalVisible}
        animationType='slide'
        onRequestClose={closeModal}
      >
        <View
          style={{
            padding: 15,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '40%',
            marginTop: 'auto',
            backgroundColor: Colors[colorScheme].shading,
          }}
        >
          <View>
            <Pressable onPress={closeModal}>
              <Text>X</Text>
            </Pressable>
            <Text style={styles.modalTitle}>
              {i18n.t('ls_event_item_joining_as')}
            </Text>
            <View
              style={{
                margin: 12,
                borderBottomColor: 'grey',
                borderBottomWidth: 1,
              }}
            />
          </View>
          <RadioForm
            initial={radio_props.findIndex((e) => e.value === attendeeRole)}
            radio_props={radio_props}
            onPress={setAttendeeRole}
          />
          <Pressable onPress={closeModal}></Pressable>
          <CustomButton text='ok' onPress={onSelectRole}></CustomButton>
        </View>
      </Modal>
      <Pressable>
        <Image
          style={{ height: 173, borderRadius: '29px 29px 0 0', width: '100%' }}
          source={returnImageByIndex()}
        />
        <View style={styles.eventInfo}>
          <View style={{ flexDirection: 'row' }}>
            <Text>{i18n.t(`day_${day}`)}, </Text>
            <Text>{dateDisplayText}</Text>
          </View>
          <Text
            style={{
              fontSize: 24,
              fontWeight: '400',
            }}
          >
            {event.title}
          </Text>
          <Text
            style={{
              fontSize: 15,
            }}
          >
            {event.location.name}
          </Text>
          <LSEventItemPeopleDetails event={event} />
          <View style={styles.buttonContainer}>
            <CustomButton
              textColor={Colors[colorScheme].text}
              text={i18n.t('ls_event_item_rsvp')}
              onPress={openModal}
            />
            <CustomButton
              transparent
              text={i18n.t('ls_event_item_share')}
              onPress={onShare}
            />
          </View>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  eventInfo: {
    justifyContent: 'space-between',
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
