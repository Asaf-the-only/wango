const NewYorkCityPriceCalculator = require("./priceCalculators/NewYorkCityPriceCalculator")
const WashingtonPriceCalculator = require("./priceCalculators/WashingtonPriceCalculator")
const LosAngelesPriceCalculator = require("./priceCalculators/LosAngelesPriceCalculator")

class PriceCalculatorFactory {
  static getPriceCalculator(cityName) {
    switch (cityName.toLowerCase()) {
      case "new york city":
        return new NewYorkCityPriceCalculator()
      case "washington":
        return new WashingtonPriceCalculator()
      case "LosAngeles":
        return new LosAngelesPriceCalculator()
      default:
        throw new Error(`City: ${cityName} not supported`)
    }
  }
}

module.exports = PriceCalculatorFactory
