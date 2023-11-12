import React, { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from 'react';
import axios from 'axios';
import styles from './eventForm.module.scss';
import Toast from '../Toast/Toast';
import { formatDateForInput } from 'app/utils/dataFormatter';
import { showToast } from 'app/utils/showToast';
import { emailRegex } from 'app/utils/emailRegex';

interface FormFields {
  name: string;
  surname: string;
  email: string;
  date: Date | string;
}

interface EventFormInterface {
  setForceFetch: Dispatch<SetStateAction<boolean>>;
  toastInfo: {message: string, color: string}
  setToastInfo: Dispatch<SetStateAction<{message: string, color: string}>>
}

export default function EventForm({ setForceFetch, toastInfo, setToastInfo }: EventFormInterface) {
  const [formFields, setFormFields] = useState<FormFields>({
    name: '',
    surname: '',
    email: '',
    date: '',
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { message, color } = toastInfo;
  const fieldsArray = Object.entries(formFields);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
  
    setFormFields((prevFields) => ({
      ...prevFields,
      [name]: name === 'date' ? formatDateForInput(value) : value,
    }));
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSubmitting) {
      return;
    }
    
    const emptyFields = fieldsArray.filter(([_key, value]) => !value).map(([key]) => key)
    if (emptyFields.length > 0) {
      const emptyFieldsMessage = `Please fill in the following fields: ${emptyFields.join(', ')}.`;
      showToast(emptyFieldsMessage, 'red', setToastInfo)
      return;
    }
    if(!emailRegex.test(formFields.email)) {
      showToast('Please provide valid email', 'red', setToastInfo)
      return;
    }
    try {
      setIsSubmitting(true)
      await axios.post('http://scheduler-env.eba-di2rddya.eu-north-1.elasticbeanstalk.com/api/v1/event', {
        ...formFields
      })
      showToast('Event successfully created!', 'green', setToastInfo)
    } catch (error: unknown) {
      showToast('Error occured when data submitting, please try again later.', 'red', setToastInfo)
    } finally {
      setIsSubmitting(false)
      setForceFetch(true)
    }
    setFormFields({
      name: '',
      surname: '',
      email: '',
      date: '',
    })
  };

  return (
    <div className={styles.container}>
      {message && <Toast message={message} color={color}/>}
      <form className={styles.container} onSubmit={onSubmit}>
        {fieldsArray.map((el, index) => {
          const [key, value] = el;
          return (
            <div key={index}>
              <label htmlFor={key}>{key[0].toUpperCase() + key.slice(1)}: </label>
              <input type={key !== 'date' ? 'text' : 'date'} value={value} id={key} name={key} onChange={onChange} />
            </div>
        )})}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
