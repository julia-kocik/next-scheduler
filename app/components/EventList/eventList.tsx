import React from 'react';
import styles from './eventList.module.scss';
import EventListItem from '../EventListItem/eventListItem';
import { EventsData } from '../Homepage/homepage';

interface EventListProps {
  eventsData: EventsData[];
}

export default function EventList({ eventsData }: EventListProps) {
  return (
    <div className={styles.container}>
      {eventsData.map(el => (
        <EventListItem key={el.id} {...el} />
      ))}
    </div>
  );
}
