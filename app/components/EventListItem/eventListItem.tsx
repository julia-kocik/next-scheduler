import axios from 'axios';
import Button from '../Button/Button';
import styles from './eventListItem.module.scss'
import { showToast } from 'app/utils/showToast';
import { Dispatch, SetStateAction, useState } from 'react';

interface EventListItemProps {
  id: string;
  name: string;
  surname: string;
  email: string;
  date: Date;
  setToastInfo: Dispatch<SetStateAction<{message: string, color: string}>>
  setForceFetchAfterDelete: Dispatch<SetStateAction<boolean>>;
}

export default function EventListItem({id, name, surname, email, date, setToastInfo, setForceFetchAfterDelete }: EventListItemProps) {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const onDeleteHandler = async (): Promise<void> => {
    if (isDeleting) {
      return;
    }
  
    try {
      setIsDeleting(true);
      await axios.delete(`http://scheduler-env.eba-di2rddya.eu-north-1.elasticbeanstalk.com/api/v1/event/${id}`);
      showToast('Event successfully deleted!', 'green', setToastInfo);
      setForceFetchAfterDelete(true)
    } catch (error: unknown) {
      showToast('Error occurred when data deleting, please try again later.', 'red', setToastInfo);
    } finally {
      setIsDeleting(false);
    }
  };
  const onUpdateHandler = () => {

  }
  return (
    <div className={styles.container}>
      <div className={styles.dataContainer}>
        <p><strong>Name:</strong> {name}</p>
        <p><strong>Surname:</strong> {surname}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Date:</strong> {date.toString().split('T')[0]}</p>
      </div>
    <div className={styles.btnsContainer}>
      <Button onClickHandler={onDeleteHandler} title='Remove' color='red'/>
      <Button onClickHandler={onUpdateHandler} title='Update' color='blue'/>
    </div>
  </div>
  )
}
