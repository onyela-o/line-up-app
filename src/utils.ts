export const UKPoundConverter = new Intl.NumberFormat('en-GB', {
  style: 'currency',
  currency: 'GBP',
})

export const calculateTotalCost = (detailsOfBasketedTickets: {
  [combinedId: string]: { total: number; price: number }
}): number => {
  return Object.values(detailsOfBasketedTickets).reduce(
    (total, { total: variantTotal, price }) => {
      return total + variantTotal * price
    },
    0
  )
}
