/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react'
import ClientComponent from './page'
import '@testing-library/jest-dom'


it('App Router: Works with Client Components', () => {
  render(<ClientComponent />)
  expect(screen.getByText('Hello')).toBeInTheDocument()
})
