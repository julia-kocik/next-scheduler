import Button from '../Button/Button';
import styles from './eventListItem.module.scss'

interface EventListItemProps {
  id: string;
  name: string;
  surname: string;
  email: string;
  date: Date;
}

export default function EventListItem({id, name, surname, email, date}: EventListItemProps) {
  return (
    <div className={styles.container}>
      <div className={styles.dataContainer}>
        <p><strong>Name:</strong> {name}</p>
        <p><strong>Surname:</strong> {surname}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Date:</strong> {date.toString().split('T')[0]}</p>
      </div>
    <div className={styles.btnsContainer}>
      <Button title='Remove' color='red'/>
      <Button title='Update' color='blue'/>
    </div>
  </div>
  )
}
