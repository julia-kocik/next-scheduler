/**
 * @jest-environment jsdom
 */
import { fireEvent, render, screen } from '@testing-library/react'
import EventForm from './eventForm'
import '@testing-library/jest-dom'
import { Dispatch, SetStateAction } from 'react';

it('renders EventForm component', () => {
  const setForceFetch: Dispatch<SetStateAction<boolean>> = jest.fn();
  const setToastInfo: Dispatch<SetStateAction<object>> = jest.fn();
  render(<EventForm setToastInfo={setToastInfo} toastInfo={{message: '', color: ''}} setForceFetch={setForceFetch} />);
  // Add your assertions or further test logic here
});
