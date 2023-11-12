import { useEffect, useState } from 'react';
import EventForm from '../EventForm/eventForm'
import EventList from '../EventList/eventList'
import styles from './homepage.module.scss'
import axios from 'axios';
import Toast from '../Toast/Toast';
import { showToast } from 'app/utils/showToast';

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
  const [loading, setLoading] = useState<boolean>(true)
  const [toastInfo, setToastInfo] = useState({message: '', color: 'red'})
  useEffect(() => {
    const fetchData = async () => {
      try {
        if(forceFetch) {
          const response = await axios.get<EventsData[]>('http://scheduler-env.eba-di2rddya.eu-north-1.elasticbeanstalk.com/api/v1/event');
          const data: EventsData[] = response.data; 
          setEventsData(data);
        }
        setLoading(false)
      } catch (error) {
        showToast('Error occured when data fetching, please try again later.', 'red', setToastInfo)
      } finally {
        setForceFetch(false)
      }
    };
    fetchData();
  }, [forceFetch]);

  return (
    <div className={styles.container}>
      <div className={styles.subContainer}>
        {loading && <Toast color='blue' message='Loading'/>}
        <EventForm setForceFetch={setForceFetch} toastInfo={toastInfo} setToastInfo={setToastInfo}/>
        <EventList eventsData={eventsData}/>
      </div>
    </div>
  )
}
