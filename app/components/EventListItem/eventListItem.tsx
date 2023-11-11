import styles from './eventListItem.module.scss'

interface EventListItemProps {
  name: string;
  surname: string;
  email: string;
  date: Date;
}

export default function EventListItem({name, surname, email, date}: EventListItemProps) {
  return (
    <div className={styles.container}>
      <div className={styles.dataContainer}>
        <p><strong>Name:</strong> {name}</p>
        <p><strong>Surname:</strong> {surname}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Date:</strong> {date.toString()}</p>
      </div>
    <div></div>
  </div>
  )
}
