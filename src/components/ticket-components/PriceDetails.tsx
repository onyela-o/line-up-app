import React from 'react'
import { UKPoundConverter } from '../../utils'

interface PriceDetailsProps {
  value: number
  bookingFee: number
}

const PriceDetails: React.FC<PriceDetailsProps> = ({ value, bookingFee }) => {

  return (
    <>
      <div>{UKPoundConverter.format(value)}</div>
      <div>{`(+ ${UKPoundConverter.format(bookingFee)} fee)`}</div>
      <br />
    </>
  )
}

export default PriceDetails
