import React, { Dispatch, SetStateAction } from 'react';
import styles from './eventList.module.scss';
import EventListItem from '../EventListItem/eventListItem';
import { EventsData } from '../Homepage/homepage';

interface EventListProps {
  eventsData: EventsData[];
  setToastInfo: Dispatch<SetStateAction<{message: string, color: string}>>
  setForceFetchAfterDelete: Dispatch<SetStateAction<boolean>>;
  setForceFetchAfterUpdate: Dispatch<SetStateAction<boolean>>;
}

export default function EventList({ eventsData, setToastInfo, setForceFetchAfterDelete, setForceFetchAfterUpdate }: EventListProps) {
  return (
    <div className={styles.container}>
      {eventsData.length === 0 ? (
          <p className={styles.noEventsMsg}>No events saved yet</p>
        ) :
        (eventsData.map(el => (
          <EventListItem key={el.id} {...el} setToastInfo={setToastInfo} setForceFetchAfterUpdate={setForceFetchAfterUpdate} setForceFetchAfterDelete={setForceFetchAfterDelete} />
        )
      ))}
    </div>
  );
}
