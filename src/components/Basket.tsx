import React from 'react'
import { UKPoundConverter } from '../utils'

interface BasketProps {
  numberOfBasketedTickets: number
  totalTicketCost: number
}

const Basket: React.FC<BasketProps> = ({
  numberOfBasketedTickets,
  totalTicketCost,
}) => {
  const totalCostPounds = UKPoundConverter.format(totalTicketCost)

  return (
    <>
      {numberOfBasketedTickets === 0 ? (
        <>
          <h2>{`🛒${numberOfBasketedTickets} tickets in your basket`}</h2>
          <br/>
        </>
      ) : (
        <>
          <h2>{`🛒${numberOfBasketedTickets} ${
            numberOfBasketedTickets === 1 ? 'ticket' : 'tickets'
          } in your basket`}</h2>
          <h3>{`${totalCostPounds}`}</h3>
        </>
      )}
    </>
  )
}

export default Basket
