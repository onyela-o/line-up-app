import React, { useEffect, useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'

import TicketDetails from './ticket-components/TicketDetails'
import PriceDetails from './ticket-components/PriceDetails'
import Basket from './Basket'

import { calculateTotalCost } from '../utils'
import { BASE_URL, TOKEN } from '../constants'

type Adjuster = {
  rate: number
  description: string
  price: number
}

interface Variant {
  adjusters: Adjuster[]
  description: string
  discount: number
  id: string
  name: string
  price: {
    id: string
    value: number
  }
}

const Container = styled.div`
  display: flex;
`

const StyledDiv = styled.div`
  float: left;
  width: 33%;
  padding: 5px;
  height: 60px;
  flex: 1;
`

const StyledButton = styled.button`
  text-align: center;
  text-decoration: none;
  border-radius: 50%;
  background-color: #431c53;
  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;
`

export const TicketContainer = () => {
  // To store the data when it comes in from the API
  const [ticketData, setTicketData] = useState<any[]>([])

  // To keep track of the number of tickets in the basket and the quantity and price of these tickets
  // Whenever a user clicks to add or remove any tickets to their basket these will be updated using handleBasketQuantityChange
  const [numberOfBasketedTickets, setNumberOfBasketedTickets] =
    useState<number>(0)
  const [detailsOfBasketedTickets, setDetailsOfBasketedTickets] = useState<{
    [combinedId: string]: { total: number; price: number }
  }>({})

  const handleBasketQuantityChange = (
    variantId: string,
    priceBandId: string,
    value: number,
    bookingFee: number,
    change: string
  ) => {
    const combinedId = `${variantId}${priceBandId}`
    const combinedCost = value + bookingFee
    const newTotal =
      change === 'increase'
        ? (detailsOfBasketedTickets[combinedId]?.total || 0) + 1
        : Math.max((detailsOfBasketedTickets[combinedId]?.total || 0) - 1, 0)

    setDetailsOfBasketedTickets((prevCounts) => ({
      ...prevCounts,
      [combinedId]: {
        total: newTotal,
        price: combinedCost,
      },
    }))

    if (change === 'increase') {
      setNumberOfBasketedTickets(numberOfBasketedTickets + 1)
    } else {
      if (detailsOfBasketedTickets[`${variantId}${priceBandId}`]?.total > 0) {
        setNumberOfBasketedTickets(numberOfBasketedTickets - 1)
      }
    }
  }

  const totalTicketCost = calculateTotalCost(detailsOfBasketedTickets)

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${TOKEN}`,
    }

    axios
      .get(`${BASE_URL}/performance/?event_id=151&expand=pricing`, {
        headers,
      })
      .then((response) => {
        setTicketData(response.data.data[0].pricing)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  return (
    <>
      <Basket
        numberOfBasketedTickets={numberOfBasketedTickets}
        totalTicketCost={totalTicketCost}
      />
      {/* Iterate through each ticket band and each variant so that each variant has a line in the table with ticket details, price details and a way to increase/decrease the number of tickets in the basket */}
      {ticketData &&
        ticketData.map((band) => {
          const {
            name,
            description,
            variants,
            id: priceBandId,
          } = band.priceBand

          return variants.map((variant: Variant) => {
            const {
              adjusters,
              description: variantDescription,
              id: variantId,
              name: variantName,
              price: { value },
            } = variant

            const bookingFee = adjusters[0].rate

            return (
              <>
                <Container>
                  <StyledDiv>
                    <TicketDetails
                      key={`ticket-details-${variantId}`}
                      name={name}
                      variantName={variantName}
                      description={description}
                      variantDescription={variantDescription}
                    />
                  </StyledDiv>
                  <StyledDiv>
                    <PriceDetails
                      key={`price-details-${variantId}`}
                      value={value}
                      bookingFee={bookingFee}
                    />
                  </StyledDiv>
                  <StyledDiv>
                    <Container>
                      <StyledDiv>
                        <StyledButton
                          key={`decrease-${variantId}`}
                          onClick={() =>
                            handleBasketQuantityChange(
                              variantId,
                              priceBandId,
                              value,
                              bookingFee,
                              'decrease'
                            )
                          }
                        >
                          -
                        </StyledButton>
                      </StyledDiv>
                      <StyledDiv key={`total-count-${variantId}`}>
                        {detailsOfBasketedTickets[`${variantId}${priceBandId}`]
                          ?.total || 0}
                      </StyledDiv>
                      <StyledDiv>
                        <StyledButton
                          key={`increase-${variantId}`}
                          onClick={() =>
                            handleBasketQuantityChange(
                              variantId,
                              priceBandId,
                              value,
                              bookingFee,
                              'increase'
                            )
                          }
                        >
                          +
                        </StyledButton>
                      </StyledDiv>
                    </Container>
                  </StyledDiv>
                </Container>
                <hr />
              </>
            )
          })
        })}
    </>
  )
}
