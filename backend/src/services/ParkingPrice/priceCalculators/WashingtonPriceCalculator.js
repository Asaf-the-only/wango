class WashingtonPriceCalculator {
  calculate(startDate, endDate) {
    const millisecondsInAnHour = 1000 * 60 * 60
    let totalPrice = 0

    let currentDate = new Date(startDate)

    while (currentDate < endDate) {
      const currentHour = currentDate.getHours()

      if (currentHour >= 8 && currentHour <= 20) {
        totalPrice += 2 // Day rate: $2 per hour
      } else {
        totalPrice += 5 // Night rate: $5 per hour
      }

      currentDate = new Date(currentDate.getTime() + millisecondsInAnHour)
    }

    return totalPrice
  }
}

module.exports = WashingtonPriceCalculator
