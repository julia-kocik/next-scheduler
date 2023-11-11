import { useEffect, useState } from 'react';
import EventForm from '../EventForm/eventForm'
import EventList from '../EventList/eventList'
import styles from './homepage.module.scss'
import axios from 'axios';

export interface EventsData {
  id: string;
  name: string;
  surname: string;
  email: string;
  date: Date;
}

export default function Homepage() {
  const [eventsData, setEventsData] = useState<EventsData[]>([]);
  const [forceFetch, setForceFetch] = useState<boolean>(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if(forceFetch) {
          const response = await axios.get<EventsData[]>('http://scheduler-env.eba-di2rddya.eu-north-1.elasticbeanstalk.com/api/v1/event');
          const data: EventsData[] = response.data; 
          setEventsData(data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setForceFetch(false)
      }
    };
    fetchData();
  }, [forceFetch]);

  return (
    <div className={styles.container}>
      <div className={styles.subContainer}>
        <EventForm setForceFetch={setForceFetch}/>
        <EventList eventsData={eventsData}/>
      </div>
    </div>
  )
}
