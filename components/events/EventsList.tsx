import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import LSEventItem from './LSEventItem';
import { mockEvents } from '../../Mocks/mockDB';
import { LSEvent } from '../../types/LSEvents';
import Card from '../utils/Card';
import i18n from '../../translationService';
import { loadEvents } from '../../store/eventsSlice';
import { useAppDispatch } from '../../hooks';

export default function EventsList() {
  const [events, setEvents] = useState<LSEvent[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadEvents())
      .unwrap()
      .then(({ data: events }) => {
        setEvents(events);
      });
  }, []);

  return events.length ? (
    events.map((event) => (
      <Card key={event.id}>
        <LSEventItem event={event} />
      </Card>
    ))
  ) : (
    <Text
      style={{
        fontSize: 15,
        fontWeight: '700',
        marginHorizontal: '50%',
        marginVertical: '10%',
        width: '100%',
      }}
    >
      Hello
    </Text>
  );
}
