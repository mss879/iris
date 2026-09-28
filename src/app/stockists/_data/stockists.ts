/**
 * IrisandMe boutique partners.
 *
 * Empty until the first stockists are confirmed. Add an entry and the
 * Stockists page lists it automatically, grouped by region in the order of
 * `regionOrder`, then by city. For example:
 *
 *   {
 *     name: "Boutique name",
 *     city: "Melbourne",
 *     country: "Australia",
 *     region: "Australia",
 *     address: "Street address, Suburb VIC 3000",
 *     website: "https://example.com",
 *     phone: "+61 3 0000 0000",
 *   }
 */

export type StockistRegion =
  | "Australia"
  | "New Zealand"
  | "Asia"
  | "Europe"
  | "United Kingdom"
  | "North America"
  | "Middle East"
  | "Rest of World";

export type Stockist = {
  name: string;
  city: string;
  country: string;
  region: StockistRegion;
  /** Street address as it should appear, e.g. "12 Example Lane, Suburb NSW 2000". */
  address: string;
  /** Full URL, including https://. */
  website?: string;
  /** In international format, e.g. "+61 2 0000 0000". */
  phone?: string;
};

export const regionOrder: StockistRegion[] = [
  "Australia",
  "New Zealand",
  "Asia",
  "Europe",
  "United Kingdom",
  "North America",
  "Middle East",
  "Rest of World",
];

export const stockists: Stockist[] = [];
