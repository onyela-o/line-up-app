import React from 'react'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'

import App from './App'

test('renders table and can add and minus tickets from basket', async () => {
  render(<App />)

  await waitFor(() => {
    expect(screen.getByText('0 tickets in basket')).toBeInTheDocument()
  })

  const addButton = screen.getByText('+')
  const minusButton = screen.getByText('-')
  const basketCount = screen.getByTestId('basket-count')
  const totalCost = screen.getByTestId('total-cost')

  fireEvent.click(addButton)
  await waitFor(() => {
    expect(basketCount.textContent).toBe('1 ticket in your basket')
  })
  await waitFor(() => {
    expect(totalCost.textContent).toBe('£92.00')
  })

  fireEvent.click(addButton)
  await waitFor(() => {
    expect(basketCount.textContent).toBe('2 tickets in your basket')
  })
  await waitFor(() => {
    expect(totalCost.textContent).toBe('£184.00')
  })

  fireEvent.click(minusButton)
  await waitFor(() => {
    expect(basketCount.textContent).toBe('1 ticket in your basket')
  })
  await waitFor(() => {
    expect(totalCost.textContent).toBe('£92.00')
  })
})
