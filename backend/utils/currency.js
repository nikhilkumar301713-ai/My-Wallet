

const cache = new Map(); // base -> { rates, timestamp }
const CACHE_TTL = 60 * 60 * 1000; // 1 hour

export const getExchangeRates = async (base = "USD") => {
  const cached = cache.get(base);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.rates;
  }

  const apiKey = process.env.EXCHANGE_RATE_API_KEY;
  const response = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${base}`);
  const data = await response.json();

  if (data.result !== "success") {
   
    if (cached) return cached.rates;
    throw new Error("Failed to fetch exchange rates: " + JSON.stringify(data));
  }

  const rates = {};
  for (const [currencyCode, rate] of Object.entries(data.conversion_rates)) {
    rates[currencyCode] = 1 / rate;
  }
  rates[base] = 1;

  cache.set(base, { rates, timestamp: Date.now() });
  return rates;
};

export const CURRENCY_SYMBOLS = {
  USD: "$",
  EUR: "€",
  INR: "₹",
  GBP: "£",
  JPY: "¥",
  AUD: "A$",
  CAD: "C$",
};

export const getCurrencySymbol = (code) => CURRENCY_SYMBOLS[code] || code;