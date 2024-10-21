class NewYorkCityPriceCalculator {
  calculate(startDate, endDate) {
    const millisecondsInAnHour = 1000 * 60 * 60
    const durationMilliseconds = endDate - startDate
    const durationHours = durationMilliseconds / millisecondsInAnHour

    return durationHours * 5
  }
}

module.exports = NewYorkCityPriceCalculator
