import React from 'react'

interface TicketDetailsProps {
  name: string
  variantName: string
  description: string
  variantDescription: string
}

const TicketDetails: React.FC<TicketDetailsProps> = ({
  name,
  variantName,
  description,
  variantDescription,
}) => {

  return (
    <>
      <h4 style={{ margin: 0 }}>{`${name} - ${variantName}`}</h4>
      <div>{description}</div>
      <div>{variantDescription}</div>
    </>
  )
}

export default TicketDetails
