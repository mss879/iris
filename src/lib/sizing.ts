/**
 * Sizing shared by the Size & Fit page and every product page, so a size
 * quoted on a product always matches the chart.
 */

export const SIZES = ["XS", "S", "M", "L", "XL"] as const;
export type Size = (typeof SIZES)[number];

/** International equivalents for each IrisandMe size. */
export const conversions: Record<Size, { au: number; uk: number; us: number; eu: number }> = {
  XS: { au: 6, uk: 6, us: 2, eu: 34 },
  S: { au: 8, uk: 8, us: 4, eu: 36 },
  M: { au: 10, uk: 10, us: 6, eu: 38 },
  L: { au: 12, uk: 12, us: 8, eu: 40 },
  XL: { au: 14, uk: 14, us: 10, eu: 42 },
};

/** Body measurements in centimetres. */
export const body: Record<Size, { bust: number; waist: number; hip: number }> = {
  XS: { bust: 80, waist: 62, hip: 87 },
  S: { bust: 84, waist: 66, hip: 91 },
  M: { bust: 89, waist: 71, hip: 96 },
  L: { bust: 94, waist: 76, hip: 101 },
  XL: { bust: 99, waist: 81, hip: 106 },
};

export const toInches = (cm: number) => Math.round((cm / 2.54) * 10) / 10;

export type FitKey = "fitted" | "regular" | "relaxed" | "oversized";

export const fits: Record<FitKey, { label: string; description: string }> = {
  fitted: {
    label: "Fitted",
    description:
      "Follows the line of the body closely through the bust and waist. If you are between sizes, choose the larger.",
  },
  regular: {
    label: "Regular",
    description:
      "A true-to-size fit with a little ease for movement. Take your usual IrisandMe size.",
  },
  relaxed: {
    label: "Relaxed",
    description:
      "Cut with generous ease so the fabric falls away from the body. Take your usual size, or size down for a closer line.",
  },
  oversized: {
    label: "Oversized",
    description:
      "Intentionally roomy through the body and sleeve. Most women size down for a softer, less voluminous shape.",
  },
};

/** The model who wears the collection in our studio photography. */
export const model = {
  heightCm: 176,
  height: "176cm (5'9\")",
  bust: 81,
  waist: 62,
  hip: 89,
  size: "S" as Size,
};

export type GarmentMeasure = {
  label: string;
  /** Centimetres per size, in SIZES order. */
  values: Partial<Record<Size, number>>;
};

/**
 * Flat garment measurements (cm) for pieces where proportion matters most.
 * Keyed by product slug.
 */
export const garments: Record<string, GarmentMeasure[]> = {
  "iris-wrap-dress": [
    { label: "Bust (wrapped)", values: { XS: 88, S: 92, M: 97, L: 102, XL: 107 } },
    { label: "Waist (tied)", values: { XS: 70, S: 74, M: 79, L: 84, XL: 89 } },
    { label: "Length (shoulder to hem)", values: { XS: 114, S: 116, M: 118, L: 120, XL: 122 } },
  ],
  "lena-maxi-dress": [
    { label: "Bust", values: { XS: 92, S: 96, M: 101, L: 106, XL: 111 } },
    { label: "Hip", values: { XS: 112, S: 116, M: 121, L: 126, XL: 131 } },
    { label: "Length (shoulder to hem)", values: { XS: 138, S: 140, M: 142, L: 144, XL: 146 } },
  ],
  "maya-linen-shirt": [
    { label: "Chest", values: { XS: 106, S: 110, M: 115, L: 120, XL: 125 } },
    { label: "Sleeve (from shoulder)", values: { XS: 56, S: 57, M: 58, L: 59, XL: 60 } },
    { label: "Length (back)", values: { XS: 70, S: 72, M: 74, L: 76, XL: 78 } },
  ],
  "noor-wide-trousers": [
    { label: "Waist", values: { XS: 64, S: 68, M: 73, L: 78, XL: 83 } },
    { label: "Hip", values: { XS: 102, S: 106, M: 111, L: 116, XL: 121 } },
    { label: "Inside leg", values: { XS: 78, S: 79, M: 80, L: 81, XL: 82 } },
  ],
};
