/**
 * @jest-environment jsdom
 */
import { fireEvent, render, screen } from '@testing-library/react'
import EventListItem from './eventListItem'
import '@testing-library/jest-dom'

const eventListItem = {
  id: '123',
  name: 'Julia',
  surname: 'Test',
  email: 'julia@test.com',
  date: new Date()
}

it('App Router: Works with Client Components (React State)', () => {
  render(<EventListItem {...eventListItem} />)
})
