import {
  FREE_SHIPPING_AU,
  formatPrice,
  giftCards,
  payments,
  returns,
  shipping,
  site,
} from "@/lib/site";
import { SIZES, conversions, fits, model, type FitKey } from "@/lib/sizing";
import {
  domestic,
  fibres,
  international,
  internationalCarriers,
  listJoin,
  lowerFirst,
  namedDestinations,
  preorderExample,
  withArticle,
} from "@/components/services/facts";

/**
 * The FAQ, written once. Each answer is a list of paragraphs made of plain
 * text and links, so the same source renders the visible answers and the
 * plain-text FAQPage structured data — the two can never drift apart. Every
 * operational value is read from the shared modules.
 */

export type Segment = string | { href: string; label: string };
export type Paragraph = Segment[];
export type Question = { id: string; question: string; answer: Paragraph[] };
export type Topic = { id: string; label: string; questions: Question[] };

const link = (href: string, label: string) => ({ href, label });
const mail = (address: string) => ({ href: `mailto:${address}`, label: address });
const care = mail(site.email.care);

const FIRST = SIZES[0];
const LAST = SIZES[SIZES.length - 1];
const sizeRange = (key: "au" | "uk" | "us" | "eu") =>
  `${conversions[FIRST][key]}–${conversions[LAST][key]}`;

const FIT_ORDER: FitKey[] = ["fitted", "regular", "relaxed", "oversized"];
const restOfWorld = international.some((r) => r.region === "Rest of World");

export const topics: Topic[] = [
  {
    id: "sizing",
    label: "Sizing",
    questions: [
      {
        id: "sizing-find-my-size",
        question: "How do I find my size?",
        answer: [
          [
            "Start with the size chart on our ",
            link("/size-and-fit", "Size & Fit"),
            " page, which converts IrisandMe sizes into AU, UK, US and EU sizing. Then compare your body measurements with the chart, and check the fit of the piece you’re considering.",
          ],
        ],
      },
      {
        id: "sizing-range",
        question: "What sizes do you make?",
        answer: [
          [
            `Our pieces are made in sizes ${FIRST} to ${LAST} — equivalent to AU ${sizeRange("au")}, UK ${sizeRange("uk")}, US ${sizeRange("us")} and EU ${sizeRange("eu")}.`,
          ],
          [
            "Some pieces are made in a smaller range of sizes. The sizes available are always shown on the product page.",
          ],
        ],
      },
      {
        id: "sizing-between-sizes",
        question: "I’m between sizes. Which should I choose?",
        answer: [
          [
            `It depends on the fit of the piece. For ${fits.fitted.label.toLowerCase()} pieces, choose the larger size; our `,
            link("/size-and-fit#fit", "fit descriptions"),
            " explain which way to go for every fit.",
          ],
          [
            "If you’re still unsure, ",
            link("/contact", "write to us"),
            " with your measurements and the piece you’re considering, and we’ll recommend a size.",
          ],
        ],
      },
      {
        id: "sizing-measuring",
        question: "How do I take my measurements?",
        answer: [
          [
            "You’ll need a soft tape measure. Measure around the fullest part of your bust, your natural waist and the fullest part of your hips, keeping the tape level and snug but not tight. There’s a step-by-step guide on our ",
            link("/size-and-fit#how-to-measure", "Size & Fit"),
            " page.",
          ],
        ],
      },
    ],
  },
  {
    id: "fit",
    label: "Fit",
    questions: [
      {
        id: "fit-descriptions",
        question: "What do your fit descriptions mean?",
        answer: [
          ["Every IrisandMe piece is cut to one of four fits, named on its product page."],
          ...FIT_ORDER.map((key) => [`${fits[key].label}: ${fits[key].description}`]),
        ],
      },
      {
        id: "fit-model-size",
        question: "What size is the model wearing?",
        answer: [
          [
            `The model in our studio photography is ${model.height} tall and wears size ${model.size}. Each product page notes the size she’s wearing in its photographs.`,
          ],
        ],
      },
      {
        id: "fit-lengths",
        question: "How will lengths suit my height?",
        answer: [
          [
            `Our pieces are photographed on a model who is ${model.height} tall. If you’re shorter, dresses, skirts and trousers will fall a little longer on you. For key pieces, you’ll find exact lengths in our `,
            link("/size-and-fit#garment-measurements", "garment measurements"),
            ".",
          ],
        ],
      },
    ],
  },
  {
    id: "fabric",
    label: "Fabric",
    questions: [
      {
        id: "fabric-fibres",
        question: "What fabrics do you use?",
        answer: [
          [
            `We work with natural fibres: ${listJoin(fibres)}. Each product page lists the fabric and its composition, and you can read more about each fibre on `,
            link("/our-fabrics", "Our Fabrics"),
            ".",
          ],
        ],
      },
      {
        id: "fabric-linen-creases",
        question: "Does linen crease?",
        answer: [
          [
            "Yes — linen creases naturally, and those soft creases are part of its character. It also softens with every wash and wear. For a smoother finish, steam it, or iron on a warm setting while it’s still slightly damp. Our ",
            link("/garment-care#linen", "linen care guide"),
            " has more.",
          ],
        ],
      },
      {
        id: "fabric-irregularities",
        question: "Why does my piece have small irregularities?",
        answer: [
          [
            "Natural fibres and handcraft carry their own character. Linen has small slubs where the flax thread thickens, and hand block-printed pieces vary slightly in colour and line. These are part of how the fabric is made, rather than faults.",
          ],
        ],
      },
    ],
  },
  {
    id: "care",
    label: "Care",
    questions: [
      {
        id: "care-washing",
        question: "How should I wash my pieces?",
        answer: [
          [
            "Always follow the care label and the care instructions on the product page. In general, wash cool on a gentle cycle with a mild detergent, turn printed pieces inside out, and hand wash silk and knitwear in cold water. Our ",
            link("/garment-care", "Garment Care"),
            " guide covers each fabric in detail.",
          ],
        ],
      },
      {
        id: "care-tumble-drying",
        question: "Can I tumble dry?",
        answer: [
          [
            "We recommend avoiding the tumble dryer, as heat can shrink natural fibres and set creases. Line dry in the shade instead, and dry knitwear and silk flat.",
          ],
        ],
      },
      {
        id: "care-knitwear",
        question: "How should I store knitwear?",
        answer: [
          [
            "Fold it rather than hanging it, which can stretch the shoulders out of shape. Store it clean and away from direct sunlight, with cedar or lavender to help deter moths.",
          ],
        ],
      },
    ],
  },
  {
    id: "orders",
    label: "Orders",
    questions: [
      {
        id: "orders-processing",
        question: "How long does it take to prepare my order?",
        answer: [[`We prepare orders within ${shipping.processing}. ${shipping.processingNote}`]],
      },
      {
        id: "orders-changes",
        question: "Can I change or cancel my order?",
        answer: [
          [
            "Please contact us as soon as possible at ",
            care,
            ` with your order number. Because orders are prepared within ${shipping.processing}, we can’t guarantee a change once your order is being prepared, but we’ll always do our best. Once an order has been dispatched, you’re welcome to return it under our `,
            link("/returns-and-exchanges", "returns policy"),
            ".",
          ],
        ],
      },
      {
        id: "orders-tracking",
        question: "How do I track my order?",
        answer: [
          [
            "We’ll email you a tracking link as soon as your order is dispatched. You can also check its progress on ",
            link("/track-order", "Track My Order"),
            " with your order number and email address.",
          ],
        ],
      },
    ],
  },
  {
    id: "payments",
    label: "Payments",
    questions: [
      {
        id: "payments-methods",
        question: "Which payment methods do you accept?",
        answer: [[`We accept ${listJoin(payments)}.`]],
      },
      {
        id: "payments-currency",
        question: "Which currency are your prices in?",
        answer: [
          [
            `All prices are in Australian dollars (${site.currency}). If you’re paying from outside Australia, your bank or card provider will convert the amount at its own exchange rate.`,
          ],
        ],
      },
      {
        id: "payments-gift-cards",
        question: "Can I pay with a gift card?",
        answer: [
          [
            "Yes. Gift cards can be redeemed online at checkout, and any remaining balance stays on the card for your next order.",
          ],
        ],
      },
    ],
  },
  {
    id: "shipping",
    label: "Shipping",
    questions: [
      {
        id: "shipping-cost",
        question: `How much does shipping cost within ${domestic.region}?`,
        answer: [
          [
            `Standard shipping within ${domestic.region} is ${domestic.standardCost}, and complimentary on orders over ${formatPrice(FREE_SHIPPING_AU)}.${
              domestic.expressCost ? ` Express shipping is ${domestic.expressCost}.` : ""
            }`,
          ],
        ],
      },
      {
        id: "shipping-delivery-time",
        question: `How long does delivery take within ${domestic.region}?`,
        answer: [
          [
            `Allow ${shipping.processing} for us to prepare your order. Standard delivery then takes ${domestic.standard}${
              domestic.express ? `, and express delivery ${domestic.express}` : ""
            }.`,
          ],
        ],
      },
      {
        id: "shipping-carriers",
        question: "Which carriers do you use?",
        answer: [
          [
            `Orders within ${domestic.region} travel with ${domestic.carrier}, and international orders with ${listJoin(internationalCarriers)}. Every order is sent with tracking. Rates and delivery times for every region are on our `,
            link("/shipping-and-delivery", "Shipping & Delivery"),
            " page.",
          ],
        ],
      },
    ],
  },
  {
    id: "international-delivery",
    label: "International delivery",
    questions: [
      {
        id: "international-destinations",
        question: "Do you ship internationally?",
        answer: [
          [
            `Yes. As well as ${domestic.region}, we deliver to ${listJoin(
              namedDestinations.map((r) => withArticle(r.region))
            )}${restOfWorld ? ", and to the rest of the world" : ""}.`,
          ],
        ],
      },
      {
        id: "international-times-and-costs",
        question: "How long does international delivery take, and what does it cost?",
        answer: [
          ...international.map((r) => [
            `${r.region}: ${r.standard}, ${r.standardCost}${
              r.freeOver ? `, or complimentary on orders over ${formatPrice(r.freeOver)}` : ""
            }.`,
          ]),
          [
            `Delivery estimates are in business days from dispatch, and all charges are in Australian dollars. Allow ${shipping.processing} for us to prepare your order first. See `,
            link("/shipping-and-delivery", "Shipping & Delivery"),
            " for more.",
          ],
        ],
      },
      {
        id: "international-tracking",
        question: "Is international delivery tracked?",
        answer: [
          [
            `Yes. International orders travel with ${listJoin(internationalCarriers)}, and we’ll email your tracking link as soon as your order is dispatched.`,
          ],
        ],
      },
    ],
  },
  {
    id: "duties-and-taxes",
    label: "Duties & taxes",
    questions: [
      {
        id: "duties-will-i-pay",
        question: "Will I have to pay import duties or taxes?",
        answer: [
          [
            `Orders delivered outside ${domestic.region} may attract import duties and taxes, such as VAT or GST. Unless the note for your region says otherwise, these are set by your country’s customs authority, aren’t included in our prices or shipping charges, and are payable by the recipient when the parcel arrives.`,
          ],
          ...international.map((r) => [`${r.region}: ${r.duties}`]),
        ],
      },
      {
        id: "duties-gst",
        question: "Do your prices include GST?",
        answer: [
          [`Yes, for orders delivered within ${domestic.region}: ${lowerFirst(domestic.duties)}`],
        ],
      },
      {
        id: "duties-gift-declaration",
        question: "Can you mark my order as a gift or declare a lower value?",
        answer: [
          [
            "No. Every international parcel travels with a commercial invoice and is declared at its full value, as customs regulations require. We’re unable to mark orders as gifts or declare a lower value.",
          ],
        ],
      },
      {
        id: "duties-refused-parcels",
        question: "What happens if I don’t pay the duties?",
        answer: [
          [
            "If duties and taxes go unpaid or a delivery is refused, the carrier may hold the parcel or return it to us. Please contact us before refusing a delivery so we can talk through your options. Our ",
            link("/shipping-policy", "Shipping Policy"),
            " explains how refused parcels are handled.",
          ],
        ],
      },
    ],
  },
  {
    id: "returns",
    label: "Returns",
    questions: [
      {
        id: "returns-policy",
        question: "What is your returns policy?",
        answer: [
          [
            `You can return unworn pieces with their tags attached within ${returns.windowDays} days of delivery, for a refund or a size exchange. Sale pieces are final sale for change of mind. If anything is faulty, you’re always entitled to a repair, replacement or refund. Our `,
            link("/returns-and-exchanges", "Returns & Exchanges"),
            " page has the details.",
          ],
        ],
      },
      {
        id: "returns-how-to-start",
        question: "How do I start a return?",
        answer: [
          [
            "Email ",
            care,
            " with your order number, the pieces you’re returning and the reason, or start a return from ",
            link("/account", "your account"),
            `. We’ll reply ${site.responseTime} with your return instructions.`,
          ],
        ],
      },
      {
        id: "returns-postage",
        question: "Who pays for return postage?",
        answer: [
          [returns.domesticLabel],
          [returns.internationalPostage],
          ["If an item is faulty, we cover the return postage wherever you are."],
        ],
      },
      {
        id: "returns-refund-timing",
        question: "How long do refunds take?",
        answer: [
          [
            `Once your return arrives, we process it within ${returns.processingDays}. Refunds go back to your original payment method and can take ${returns.refundDays} to appear, depending on your bank or payment provider.`,
          ],
        ],
      },
    ],
  },
  {
    id: "exchanges",
    label: "Exchanges",
    questions: [
      {
        id: "exchanges-size",
        question: "Can I exchange for a different size?",
        answer: [
          [
            `Yes. Size exchanges are available within ${returns.windowDays} days of delivery, subject to availability. Tell us the size you’d like when you start your return; if it’s unavailable, we’ll refund you instead.`,
          ],
        ],
      },
      {
        id: "exchanges-different-piece",
        question: "Can I exchange for a different piece?",
        answer: [
          [
            "Exchanges are for a different size of the same piece. If you’d prefer something else, return the original for a refund and place a new order.",
          ],
        ],
      },
      {
        id: "exchanges-faulty",
        question: "What if my order arrives damaged or faulty?",
        answer: [
          [
            "Email ",
            care,
            ` within ${returns.faultyReportDays} days of delivery with your order number and photos of the problem. We’ll cover the return postage and offer a repair, replacement or refund.`,
          ],
          [
            "Under the Australian Consumer Law, you’re always entitled to a remedy for a faulty item, including pieces bought on sale. Telling us quickly simply helps us put things right sooner.",
          ],
        ],
      },
    ],
  },
  {
    id: "pre-orders",
    label: "Pre-orders",
    questions: [
      {
        id: "pre-orders-how",
        question: "How do pre-orders work?",
        answer: [
          [
            `Some pieces are available to pre-order ahead of their arrival. They’re marked as pre-order pieces, and the product page shows an estimated dispatch time${
              preorderExample ? ` — for example, “${preorderExample}”` : ""
            }.`,
          ],
        ],
      },
      {
        id: "pre-orders-payment",
        question: "When am I charged for a pre-order?",
        answer: [["Pre-order pieces are charged when you place your order."]],
      },
      {
        id: "pre-orders-mixed-orders",
        question: "What if I order pre-order and in-stock pieces together?",
        answer: [
          [
            "We send your in-stock pieces as soon as they’re ready, and your pre-order piece separately when it arrives. There’s no extra shipping charge for the second delivery.",
          ],
        ],
      },
      {
        id: "pre-orders-returns",
        question: "Can I return a pre-order piece?",
        answer: [
          [
            `Yes, on the same terms as any other piece. The ${returns.windowDays}-day return period starts from the day it’s delivered.`,
          ],
        ],
      },
    ],
  },
  {
    id: "product-availability",
    label: "Product availability",
    questions: [
      {
        id: "availability-sold-out",
        question: "The size I want is sold out. Will it come back?",
        answer: [
          [
            "Many of our pieces are made in small runs, so sold-out sizes aren’t always remade. Write to us at ",
            care,
            " and we’ll let you know whether more are expected.",
          ],
        ],
      },
      {
        id: "availability-limited-editions",
        question: "What do Limited Edition and Final Pieces mean?",
        answer: [
          [
            "Limited Edition pieces are made in small, numbered runs, often using artisan techniques such as hand block printing. Once an edition is gone, it isn’t remade. Final Pieces means only a few of a piece remain.",
          ],
        ],
      },
      {
        id: "availability-in-person",
        question: "Where can I see IrisandMe in person?",
        answer: [
          [
            "Visit our ",
            link("/stockists", "Stockists"),
            " page for the latest on where to find IrisandMe.",
          ],
        ],
      },
    ],
  },
  {
    id: "gift-cards",
    label: "Gift cards",
    questions: [
      {
        id: "gift-cards-how",
        question: "How do gift cards work?",
        answer: [
          [
            `Our gift cards are digital, in amounts from ${formatPrice(giftCards.min)} to ${formatPrice(giftCards.max)}. We email the gift card to your recipient on the date you choose. `,
            link("/gift-cards", "Choose a gift card"),
            ".",
          ],
        ],
      },
      {
        id: "gift-cards-validity",
        question: "How long is a gift card valid?",
        answer: [
          [`Gift cards are valid for ${giftCards.validityYears} years from the date of purchase.`],
        ],
      },
      {
        id: "gift-cards-redeeming",
        question: "How do I use a gift card?",
        answer: [
          [
            "Enter your gift card code at checkout on our website. Gift cards are redeemable online, and any remaining balance stays on the card for your next order. Gift cards can’t be exchanged for cash.",
          ],
        ],
      },
    ],
  },
];

/** An answer as plain text, for the FAQPage structured data. */
export function toPlainText(answer: Paragraph[]) {
  return answer
    .map((paragraph) =>
      paragraph.map((segment) => (typeof segment === "string" ? segment : segment.label)).join("")
    )
    .join(" ");
}
