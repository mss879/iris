/**
 * Single source of truth for the facts the site repeats: contact details,
 * hours, shipping, returns and payments. Every page reads from here so a
 * policy changes in one place and never disagrees with itself.
 *
 * Operational values below are working defaults pending client sign-off.
 */

export const site = {
  name: "IrisandMe",
  tagline: "Considered Design. Natural Beauty. Modern Femininity.",
  description:
    "IrisandMe designs considered womenswear in linen, cotton and natural fibres — pieces made with care and intended to be worn well beyond a single season.",
  url: "https://www.irisandme.com",
  country: "Australia",
  currency: "AUD",
  handle: "@irisandme",
  social: {
    instagram: "https://www.instagram.com/irisandme",
    facebook: "https://www.facebook.com/irisandme",
  },
  email: {
    care: "care@irisandme.com",
    press: "press@irisandme.com",
    stockists: "stockists@irisandme.com",
    privacy: "privacy@irisandme.com",
  },
  hours: "Monday to Friday, 9am – 5pm (Australian Eastern Time)",
  responseTime: "within one business day",
} as const;

export type Region = {
  region: string;
  /** Standard delivery estimate once an order has been dispatched. */
  standard: string;
  standardCost: string;
  express?: string;
  expressCost?: string;
  /** Order value (AUD) at which standard delivery becomes complimentary. */
  freeOver?: number;
  carrier: string;
  duties: string;
};

export const shipping = {
  processing: "1–2 business days",
  processingNote:
    "Orders placed before 12pm (Australian Eastern Time) on a business day are usually prepared the same day. Orders placed on weekends or public holidays begin processing on the next business day.",
  regions: [
    {
      region: "Australia",
      standard: "2–6 business days",
      standardCost: "$10",
      express: "1–3 business days",
      expressCost: "$18",
      freeOver: 250,
      carrier: "Australia Post",
      duties: "Prices include GST. No duties apply.",
    },
    {
      region: "New Zealand",
      standard: "5–10 business days",
      standardCost: "$20",
      freeOver: 300,
      carrier: "DHL Express",
      duties: "Orders under NZ$1,000 are generally free of duty; GST may be collected at checkout.",
    },
    {
      region: "United States",
      standard: "6–10 business days",
      standardCost: "$35",
      freeOver: 400,
      carrier: "DHL Express",
      duties: "Duties and taxes may apply and are payable on delivery.",
    },
    {
      region: "United Kingdom",
      standard: "6–10 business days",
      standardCost: "$35",
      freeOver: 400,
      carrier: "DHL Express",
      duties: "Import VAT and duties may apply and are payable on delivery.",
    },
    {
      region: "Europe",
      standard: "7–12 business days",
      standardCost: "$35",
      freeOver: 400,
      carrier: "DHL Express",
      duties: "Import VAT and duties may apply and are payable on delivery.",
    },
    {
      region: "Asia",
      standard: "5–10 business days",
      standardCost: "$30",
      freeOver: 400,
      carrier: "DHL Express",
      duties: "Duties and taxes vary by country and are payable on delivery.",
    },
    {
      region: "Rest of World",
      standard: "8–15 business days",
      standardCost: "$45",
      carrier: "DHL Express",
      duties: "Duties and taxes vary by country and are payable on delivery.",
    },
  ] satisfies Region[],
} as const;

/** The domestic threshold, quoted in the announcement bar and the bag. */
export const FREE_SHIPPING_AU = 250;

export const returns = {
  windowDays: 30,
  faultyReportDays: 7,
  refundDays: "5–10 business days",
  processingDays: "3–5 business days",
  domesticLabel:
    "Returns within Australia travel on a prepaid label. Exchanges are complimentary; for refunds, $10 is deducted to cover the label.",
  internationalPostage:
    "International returns are sent at your own cost using a tracked service. Original shipping charges, duties and taxes cannot be refunded.",
} as const;

export const giftCards = {
  amounts: [50, 100, 150, 250, 500],
  min: 50,
  max: 1000,
  validityYears: 3,
} as const;

export const payments = [
  "Visa",
  "Mastercard",
  "American Express",
  "PayPal",
  "Apple Pay",
  "Google Pay",
  "Afterpay (Australia)",
] as const;

export function formatPrice(value: number) {
  return `$${value.toLocaleString("en-AU", {
    minimumFractionDigits: value % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  })}`;
}
