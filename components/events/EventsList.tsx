import React, { useEffect } from 'react';
import { ScrollView, Text, StyleSheet, View } from 'react-native';
import LSEventItem from './LSEventItem';
import Card from '../utils/Card';
import i18n from '../../translationService';
import { loadEvents, selectEvents, setEvents } from '../../store/eventsSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setAppLoading } from '../../store/appStateSlice';

export default function EventsList() {
  const dispatch = useAppDispatch();
  const events = useAppSelector(selectEvents);

  useEffect(() => {
    dispatch(setAppLoading(true));
    dispatch(loadEvents())
      .unwrap()
      .then(({ data: events }) => {
        dispatch(setEvents(events));
        dispatch(setAppLoading(false));
      });
  }, []);

  return (
    <View style={styles.flexContainer}>
      {events.length > 0 &&
        events.map((event, n) => (
          <Card key={event.id}>
            <LSEventItem listPosition={n} event={event} />
          </Card>
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  flexContainer: {},

  noEventsText: {
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'center',
    marginVertical: '10%',
    width: '100%',
  },
});
