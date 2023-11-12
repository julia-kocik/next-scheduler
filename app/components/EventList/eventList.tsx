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
      {eventsData.length === 0 ? (
          <p className={styles.noEventsMsg}>No events saved yet</p>
        ) :
        (eventsData.map(el => (
          <EventListItem key={el.id} {...el} />
        )
      ))}
    </div>
  );
}
