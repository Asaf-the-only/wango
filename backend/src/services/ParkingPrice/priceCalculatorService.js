const PriceCalculatorFactory = require("./PriceCalculatorFactory")

const calculatePrice = (startDate, endDate, cityName) => {
  const calculator = PriceCalculatorFactory.getPriceCalculator(cityName)
  return calculator.calculate(startDate, endDate)
}

module.exports = calculatePrice
