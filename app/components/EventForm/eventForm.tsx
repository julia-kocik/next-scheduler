import React, { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from 'react';
import axios from 'axios';
import styles from './eventForm.module.scss';

interface FormFields {
  name: string;
  surname: string;
  email: string;
  date: Date;
}

interface EventFormInterface {
  setForceFetch: Dispatch<SetStateAction<boolean>>;
}

export default function EventForm({ setForceFetch }: EventFormInterface) {
  const [formFields, setFormFields] = useState<FormFields>({
    name: '',
    surname: '',
    email: '',
    date: new Date(),
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const fieldsArray = Object.entries(formFields);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
  
    setFormFields((prevFields) => ({
      ...prevFields,
      [name]: name === 'date' ? formatDateForInput(value) : value,
    }));
  };
  
  const formatDateForInput = (value: string): string => {
    const selectedDate = new Date(value);
    const year = selectedDate.getFullYear();
    const month = (selectedDate.getMonth() + 1).toString().padStart(2, '0');
    const day = selectedDate.getDate().toString().padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) {
      return;
    }
    try {
      setIsSubmitting(true)
      await axios.post('http://scheduler-env.eba-di2rddya.eu-north-1.elasticbeanstalk.com/api/v1/event', {
        ...formFields
      })
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsSubmitting(false)
      setForceFetch(true)
    }
    setFormFields({
      name: '',
      surname: '',
      email: '',
      date: new Date(),
    })
  };

  return (
    <form className={styles.container} onSubmit={onSubmit}>
      {fieldsArray.map(el => {
        const [key, value] = el;
        return (
          <div>
            <label htmlFor={key}>{key[0].toUpperCase() + key.slice(1)}: </label>
            <input type={key !== 'date' ? 'text' : 'date'} value={value} id={key} name={key} onChange={onChange} />
          </div>
      )})}
      <button type="submit">Submit</button>
    </form>
  );
}
