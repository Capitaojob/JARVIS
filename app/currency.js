const apiKey = '7953be6f56b6111a2a08b9ec'
let currencyData = {}

async function fetchCurrentCurrency(currency) {
    fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${currency}`)
        .then(response => response.json())
        .then(data => {
            currencyData = data
        })
}

const convertCurrency = async (value, from, to) => {
    await fetchCurrentCurrency(from)
    setTimeout(() => {
        value = parseInt(value)
        let toValue = currencyData['conversion_rates'][to.toUpperCase()]

        value *= toValue
        value = value.toFixed(2)

        console.log(value)

        text = "The converted value is " + value + " " + to
        jarvisSpeech(text, 0.8, 0.2, 1, 'en')
    }, 2000)
}