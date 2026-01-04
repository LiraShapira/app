import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Modal, ScrollView } from 'react-native';
import { useColorScheme } from 'react-native';
import { IconLibrary } from '../../types/Icons';
import { Attendee, LSEvent, Seller } from '../../types/LSEvents';
import { CustomIcon } from '../utils/CustomIcon';
import Colors from '../../constants/Colors';
import i18n from '../../translationService';
import CustomButton from '../utils/CustomButton';

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
  const [modalVisible, setModalVisible] = useState(false);
  const sellers = event.attendees.filter(isSeller);
  const items = sellers.reduce((acc: string[], currentSeller: Seller) => {
    return [...acc, ...currentSeller.productsForSale];
  }, []);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'seller':
        return i18n.t('ls_event_item_seller');
      case 'attendee':
        return i18n.t('ls_event_item_attendee');
      case 'volunteer':
        return i18n.t('ls_event_item_volunteer');
      default:
        return role;
    }
  };

  return (
    <View style={styles.container}>
      <CustomIcon
        iconLibraryName={IconLibrary.Ionicons}
        iconName='person-circle'
        size={45}
        color='grey'
      />
      <View>
        <View style={styles.attendeesRow}>
          <Text style={[styles.text]}>
            {event.attendees.length}
            {i18n.t('ls_event_item_people_details_attendees')}
          </Text>
          <Pressable onPress={openModal} style={styles.plusButton}>
            <Text style={styles.plusButtonText}>{i18n.t('event_see_list')}</Text>
          </Pressable>
        </View>
        {sellers.length > 0 && (
          <Text style={[styles.text]}>
            {sellers.length} {i18n.t('ls_event_item_people_details_vendors')}
            {items.join(', ').slice(0, 26)}
          </Text>
        )}
      </View>

      <Modal
        transparent
        visible={modalVisible}
        animationType='slide'
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {i18n.t('ls_event_item_people_details_attendees')} ({event.attendees.length})
              </Text>
            </View>
            <View style={styles.divider} />
            <ScrollView style={styles.attendeesList}>
              {event.attendees.map((attendee, index) => (
                <View key={index} style={styles.attendeeItem}>
                  <View style={styles.attendeeHeader}>
                    <CustomIcon
                      iconLibraryName={IconLibrary.Ionicons}
                      iconName='person'
                      size={24}
                      color='white'
                    />
                    <Text style={styles.attendeeName}>
                      {attendee.user.firstName} {attendee.user.lastName}
                    </Text>
                  </View>
                  <Text style={styles.attendeeRole}>
                    {getRoleLabel(attendee.role)}
                  </Text>
                  {isSeller(attendee) && attendee.productsForSale.length > 0 && (
                    <View style={styles.productsContainer}>
                      <Text style={styles.productsLabel}>
                        Products:
                      </Text>
                      <Text style={styles.productsText}>
                        {attendee.productsForSale.join(', ')}
                      </Text>
                    </View>
                  )}
                </View>
              ))}
            </ScrollView>
            <CustomButton text='Close' onPress={closeModal} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    maxWidth: '80%',
  },
  attendeesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  plusButton: {
    width: 68,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusButtonText: {
    color: 'black',
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 20,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
    backgroundColor: 'black',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: 'white',
  },
  closeButton: {
    padding: 5,
  },
  closeButtonText: {
    fontSize: 24,
    fontWeight: '600',
    color: 'white',
  },
  divider: {
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  attendeesList: {
    marginVertical: 10,
  },
  attendeeItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  attendeeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  attendeeName: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  attendeeRole: {
    fontSize: 14,
    marginLeft: 32,
    fontStyle: 'italic',
    color: 'white',
  },
  productsContainer: {
    marginLeft: 32,
    marginTop: 4,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  productsLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginRight: 4,
    color: 'white',
  },
  productsText: {
    fontSize: 14,
    flex: 1,
    color: 'white',
  },
});

export default LSEventItemPeopleDetails;
