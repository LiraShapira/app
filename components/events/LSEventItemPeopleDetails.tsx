import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useColorScheme } from 'react-native';
import { IconLibrary } from '../../types/Icons';
import { Attendee, LSEvent, Seller } from '../../types/LSEvents';
import { CustomIcon } from '../utils/CustomIcon';
import Colors from '../../constants/Colors';
import i18n from '../../translationService';

interface LSEventItemPeopleDetailsProps {
  event: LSEvent;
}

function isSeller(attendee: Attendee): attendee is Seller {
  return attendee.role === 'seller';
}

const LSEventItemPeopleDetails: React.FC<LSEventItemPeopleDetailsProps> = ({
  event,
}) => {
  const colorScheme = useColorScheme() ?? 'light';
  const sellers = event.attendees.filter(isSeller);
  const items = sellers.reduce((acc: string[], currentSeller: Seller) => {
    return [...acc, ...currentSeller.productsForSale];
  }, []);

  return (
    <View style={styles.container}>
      <CustomIcon
        iconLibraryName={IconLibrary.Ionicons}
        iconName='person-circle'
        size={50}
        color='grey'
      />
      <View>
        <Text style={[styles.text, { color: Colors[colorScheme].text }]}>
          {event.attendees.length}
          {i18n.t('ls_event_item_people_details_attendees')}
        </Text>
        {sellers.length > 0 && (
          <Text style={[styles.text, { color: Colors[colorScheme].text }]}>
            {sellers.length} {i18n.t('ls_event_item_people_details_vendors')}
            {items.join(', ').slice(0, 26)}...
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    // Add any text styling here if needed
  },
});

export default LSEventItemPeopleDetails;
