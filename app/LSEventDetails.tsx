import { Text, View, Pressable } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import CustomButton from '../components/utils/CustomButton';
import { CustomIcon } from '../components/utils/CustomIcon';
import i18n from '../translationService';
import { IconLibrary } from '../types/Icons';
// import { Image } from 'expo-image';
import { useAppSelector } from '../hooks';
import { selectSelectedEvent } from '../store/eventsSlice';
import { formatDate, formatTime } from '../utils/functions';
import { useMemo } from 'react';
import { daysLongForm } from '../constants/Dates';
import { Attendee } from '../types/LSEvents';

const LSEventDetails = () => {
  const event = useAppSelector(selectSelectedEvent);
  const { dateDisplayText, items, sellers, day } = useMemo(() => {
    const sellers = event.attendees.filter((a) => a.role === 'seller');
    const items = sellers.reduce((acc: string[], currentSeller: Attendee) => {
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

  return (
    <View>
      <Pressable>
        {/* <Image
          style={{ height: 173, borderRadius: '29px 29px 0 0', width: '100%' }}
          source='../../assets/images/types-of-peppers-1-1200.jpg'
        /> */}
        <View>
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
            <CustomButton text='RSVP' onPress={() => console.log('send')} />
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
};

export default LSEventDetails;
