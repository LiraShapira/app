import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import LSEventItem from './LSEventItem';
import { mockEvents } from '../../Mocks/mockDB';
import { LSEvent } from '../../types/LSEvents';
import Card from '../utils/Card';

export default function EventsList() {
  const [events, setEvents] = useState<LSEvent[]>([]);

  useEffect(() => {
    setEvents(mockEvents);
  }, []);

  return events.map((event) => (
    <Card key={event.id}>
      <LSEventItem event={event} />
    </Card>
  ));
}
