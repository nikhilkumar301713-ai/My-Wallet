const CURRENCY_SYMBOLS = {
  USD: "$",
  EUR: "€",
  INR: "₹",
  GBP: "£",
  JPY: "¥",
  AUD: "A$",
  CAD: "C$",
};

export const getCurrencySymbol = (code) => CURRENCY_SYMBOLS[code] || code || "$";