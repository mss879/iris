/**
 * The Journal: editorial stories about cloth, craft and dressing well.
 *
 * Each article is written as an ordered list of typed blocks so the template
 * can set it richly — a lede, prose, pull quotes, photographs and the pieces
 * it mentions — without anyone writing markup.
 *
 * Inline text in `lede`, `p` and `list` blocks understands two marks:
 *   **words**            set in the heavier weight
 *   [label](/a-path)     a link, usually to a product, collection or page
 *
 * To publish a new story, add an entry to `entries` below. Reading time and
 * the display date are worked out automatically, and the newest story leads
 * the Journal page.
 */

export type JournalTopic = "Fabric" | "Styling" | "Seasonal";

export type ArticleImage = {
  src: string;
  alt: string;
  caption?: string;
};

export type ArticleBlock =
  /** Opening paragraph, set larger in the serif. */
  | { type: "lede"; text: string }
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  /** A pull quote, set large between paragraphs. */
  | { type: "quote"; text: string; cite?: string }
  /**
   * A single photograph. `wide` breaks out of the text column; `column`
   * keeps to it. `ratio` is a CSS aspect ratio such as "3/2" or "3/4".
   */
  | ({ type: "image"; size?: "wide" | "column"; ratio?: string } & ArticleImage)
  /** Two photographs side by side, gently offset. */
  | { type: "pair"; images: [ArticleImage, ArticleImage]; ratio?: string }
  /** The IrisandMe pieces the story mentions, by product slug. */
  | { type: "products"; slugs: string[]; title?: string };

export type Article = {
  slug: string;
  title: string;
  tag: JournalTopic;
  /** ISO date of publication, e.g. "2026-09-22". */
  date: string;
  /** Human-readable date, e.g. "22 September 2026". */
  displayDate: string;
  /** e.g. "6 min read". */
  readTime: string;
  wordCount: number;
  excerpt: string;
  /** Landscape photograph used for the hero, cards and social sharing. */
  image: string;
  imageAlt: string;
  /** CSS object-position for the hero crop, e.g. "60% center". */
  position?: string;
  body: ArticleBlock[];
};

type Entry = Omit<Article, "displayDate" | "readTime" | "wordCount">;

export const journalTopics: { name: JournalTopic; id: string; description: string }[] = [
  {
    name: "Fabric",
    id: "topic-fabric",
    description: "Fibre, weave and finish — where our cloth comes from, and how to care for it.",
  },
  {
    name: "Styling",
    id: "topic-styling",
    description: "Practical ways to wear natural fabrics, from proportion and palette to layering.",
  },
  {
    name: "Seasonal",
    id: "topic-seasonal",
    description: "Our view of each season: the shapes, colours and prints worth keeping.",
  },
];

export const topicId = (tag: JournalTopic) =>
  journalTopics.find((t) => t.name === tag)?.id ?? "topics";

/* -------------------------------------------------------------------------- */
/*  Stories                                                                   */
/* -------------------------------------------------------------------------- */

const entries: Entry[] = [
  /* ---------------------------------------------------------------------- */
  {
    slug: "the-art-of-linen",
    title: "The Art of Linen",
    tag: "Fabric",
    date: "2026-09-02",
    excerpt:
      "From a field of pale blue flowers to the shirt you reach for first. How flax becomes linen, why it keeps you cool, and how to choose and care for a cloth that only improves with time.",
    image: "/img/fabric-flax.jpg",
    imageAlt: "A field of flax in flower, pale blue blooms running towards a misty horizon",
    position: "center 60%",
    body: [
      {
        type: "lede",
        text: "Linen is among the oldest cloths we know, and still one of the most modern. It is cool when the air is warm, strong even when wet, and it softens every time it is worn. Most of what makes it special happens long before it reaches the cutting table.",
      },
      {
        type: "p",
        text: "It is also the fabric we return to most. What follows is a short guide to where linen comes from, why it feels the way it does, and how to choose and care for it so that it stays with you for years.",
      },
      { type: "h2", text: "From flax to fabric" },
      {
        type: "p",
        text: "Linen is spun from flax, a slender plant with narrow leaves and small, pale blue flowers. It grows best in cool, damp climates, and a field in bloom is a quiet marvel: a blue haze that moves with the wind. Each flower opens for a single day.",
      },
      {
        type: "p",
        text: "When the plants are ready, they are pulled from the ground rather than cut, so that the fibre keeps its full length. The stalks are then laid in the field to ret. Over several weeks, dew, rain and sunlight loosen the fibres from the woody core, and the stems turn from green-gold to silver-grey. It is patient work, guided by the weather and a practised eye rather than a timetable.",
      },
      {
        type: "p",
        text: "Once retted and dried, the flax is broken and scraped to free the fibre, a process known as scutching. It is then combed, or hackled, until the long fibres lie smooth and parallel. The longest are spun into fine, even yarns; the shorter ones into heavier, more rustic yarns. Finally the yarn is woven into cloth, then washed and finished. Every stage shapes how the fabric will feel against the skin.",
      },
      {
        type: "image",
        size: "wide",
        ratio: "16/9",
        src: "/img/journal-2.jpg",
        alt: "Lengths of pale linen hanging to dry on lines above old stone washing vats",
        caption: "Washed linen drying in the open air. Water, time and movement do much of the softening.",
      },
      { type: "h2", text: "Why linen keeps you cool" },
      {
        type: "p",
        text: "Linen’s reputation in the heat is well earned. The fibre draws moisture away from the skin and releases it quickly, so the cloth rarely feels damp or heavy. It also carries warmth away from the body, which is why linen feels cool to the touch even on a still afternoon.",
      },
      {
        type: "p",
        text: "Its structure helps too. Flax fibres are naturally firm, so a linen garment stands slightly away from the body rather than clinging to it, and air moves in the space between. Pair that with an open, breathable weave and you have a cloth that is comfortable through the longest summer — and just as easy to layer when the weather turns.",
      },
      { type: "quote", text: "Linen does not ask to be kept perfect. It asks to be worn." },
      { type: "h2", text: "Why it softens with time" },
      {
        type: "p",
        text: "New linen can feel crisp, even a little firm. That is not a flaw. With each wash and each wear, the fibres relax and the surface loosens, until the cloth becomes supple and fluid in the hand.",
      },
      {
        type: "p",
        text: "Many of our pieces are made in washed linen, which has been softened before it reaches you. It will keep softening quietly for as long as you own it. Few fabrics improve with use; linen is one of them.",
      },
      { type: "h2", text: "Weaves and weights" },
      {
        type: "p",
        text: "Not all linen behaves the same way. The weave and the weight of a cloth decide how it drapes, how much light it lets through and what it is best used for.",
      },
      {
        type: "list",
        items: [
          "**Plain weave.** The classic over-and-under construction. Crisp, breathable and honest — the linen of shirts, camisoles and summer dresses.",
          "**Twill.** Woven on a diagonal, so the cloth is denser and falls with more weight. It holds a clean line, which is why we chose a linen twill for the [Noor Wide Trousers](/products/noor-wide-trousers).",
          "**Herringbone.** A twill that reverses direction to form a quiet chevron. Textured and hard-wearing, it suits jackets and tailored trousers.",
          "**Gauze and voile.** Open, airy weaves that are soft and slightly sheer. Lovely for layering, and for the hottest days of the year.",
        ],
      },
      {
        type: "p",
        text: "Weight is usually described in grams per square metre. As a rough guide, light linens of up to about 150 grams suit shirts and blouses; mid-weights suit dresses and relaxed trousers; and heavier cloths of 200 grams or more give structure to tailoring and outerwear. None is better than another. Each has its own work to do.",
      },
      {
        type: "image",
        size: "column",
        ratio: "4/3",
        src: "/img/craft-linen.jpg",
        alt: "A close view of cream plain-weave linen, its slubbed yarns catching the light",
        caption: "Plain-weave linen, up close. The slubs — small, natural thickenings in the yarn — are part of its character.",
      },
      { type: "h2", text: "How linen ages" },
      {
        type: "p",
        text: "Linen is one of the few fabrics that looks better for being lived in. Colours mellow. Edges soften. The cloth takes on a gentle lustre where it moves most, and the creases it gathers begin to follow the shape of the person who wears it.",
      },
      {
        type: "p",
        text: "It is also remarkably durable. Long fibres make a strong yarn, and linen that is cared for will see many seasons of wear. It is no accident that so many heirloom tablecloths and sheets are linen: the cloth was made to be used, washed and used again.",
      },
      { type: "h2", text: "Choosing linen well" },
      {
        type: "p",
        text: "A few simple checks will tell you a great deal about a linen garment before you buy it.",
      },
      {
        type: "list",
        items: [
          "**Hold it to the light.** The weave should look even, without thin or open patches. Slubs are natural; weak spots are not.",
          "**Feel the hand.** Good linen feels substantial and cool, never papery. Washed linen should feel soft from the very first wear.",
          "**Look inside.** Linen can fray, so the finish of the seams matters. Enclosed seams, like the French seams on our [Iris Wrap Dress](/products/iris-wrap-dress), keep the inside neat and strong.",
          "**Consider the weight.** Choose lighter linens for heat and layering, and heavier ones for shape and cooler days.",
          "**Allow for ease.** Linen has very little stretch, so relaxed cuts move best. A little room at the shoulder and hip is part of its beauty.",
        ],
      },
      { type: "h2", text: "Caring for linen" },
      {
        type: "p",
        text: "Linen is easier to look after than its reputation suggests. It prefers a gentle hand and a little patience, and it rewards both.",
      },
      {
        type: "list",
        items: [
          "Wash cool, on a gentle cycle or by hand, with a mild detergent. Leave room in the machine so the cloth can move freely.",
          "Skip the bleach, which weakens the fibre, and the fabric softener, which linen does not need.",
          "Line dry in the shade. Give each piece a firm shake and smooth the seams while it is still damp.",
          "Steam, or iron while slightly damp — or simply let the creases be. They are part of the look.",
          "Store linen somewhere cool, dry and airy, folded or on a wide hanger. Avoid plastic covers, which trap moisture.",
        ],
      },
      {
        type: "p",
        text: "Our [Garment Care](/garment-care) guide covers linen alongside cotton, silk and knitwear, and every IrisandMe piece comes with its own care instructions.",
      },
      {
        type: "image",
        size: "wide",
        ratio: "16/9",
        src: "/img/journal-3.jpg",
        alt: "Folded cream linen shirts and a stack of deep olive knitwear resting on a timber shelf",
        caption: "Folded and resting between wears. Linen likes a cool, airy place to wait.",
      },
      {
        type: "products",
        title: "Linen, as we make it",
        slugs: ["maya-linen-shirt", "noor-wide-trousers", "lena-maxi-dress"],
      },
      {
        type: "p",
        text: "Linen asks for very little: cool water, fresh air and a place in your everyday. Given those, it will stay with you for years, growing softer and more personal with every season. You can read more about the fibres we work with in [Our Fabrics](/our-fabrics).",
      },
    ],
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: "how-to-style-linen",
    title: "How to Style Linen",
    tag: "Styling",
    date: "2026-09-12",
    excerpt:
      "Tonal dressing, easy proportions and a relaxed view of creases. A practical guide to wearing linen well, from the first warm morning to a long evening out.",
    image: "/img/j-seasonal.jpg",
    imageAlt:
      "A flat lay of cream and deep olive linen shirts, wide olive trousers, a straw bag, tan sandals and sunglasses",
    position: "center 45%",
    body: [
      {
        type: "lede",
        text: "Linen is one of the easiest fabrics to wear, and one of the most rewarding to wear well. It has texture, weight and a mind of its own. Styled with a little thought, it looks effortless in the truest sense: calm, considered and completely comfortable.",
      },
      {
        type: "p",
        text: "These are the principles we return to again and again — simple ways of dressing that work across the seasons, from the first warm morning to a long evening out.",
      },
      { type: "h2", text: "Dress in tones, not contrasts" },
      {
        type: "p",
        text: "The simplest way to make linen look refined is to keep the palette close. Cream on cream feels quiet and deliberate. Olive on olive is grounded and a little dramatic. Cream with olive is our house combination, and it works because the two colours share a warmth — both drawn from nature, both softened by the texture of the cloth.",
      },
      {
        type: "p",
        text: "Tonal dressing relies on texture to stay interesting. Pair a washed linen with a denser twill, a smooth cotton with a slubbed weave, or add a knit in a neighbouring shade. The eye reads depth rather than colour, and the whole outfit feels richer for it.",
      },
      {
        type: "p",
        text: "Keep accessories natural and few. A straw bag, leather sandals, a fine gold chain or a tortoiseshell clip all belong with linen. Anything too glossy or too rigid tends to fight its easy character.",
      },
      {
        type: "pair",
        ratio: "3/4",
        images: [
          {
            src: "/img/ugc-2.jpg",
            alt: "A woman seated on stone steps in a cream linen shirt and matching cream linen trousers",
            caption: "Cream on cream: the Maya Linen Shirt with the Noor Wide Trousers.",
          },
          {
            src: "/img/j-style-linen.jpg",
            alt: "A woman seated on sunlit stone steps in an oversized cream linen shirt and deep olive trousers, a straw bag beside her",
            caption: "Cream with deep olive, finished with straw and tan leather.",
          },
        ],
      },
      { type: "h2", text: "Balance the proportions" },
      {
        type: "p",
        text: "Linen has volume, and volume needs balance. The rule is simple: if one piece is generous, keep the other close. Wide, high-waisted trousers look their best with something fitted on top — a fine-strapped camisole, a tucked-in tee, a shirt knotted at the waist.",
      },
      {
        type: "p",
        text: "A favourite pairing in the studio is the [Sienna Linen Camisole](/products/sienna-linen-camisole) with the [Noor Wide Trousers](/products/noor-wide-trousers). The camisole defines the shoulders and waist; the trousers fall cleanly to the floor. Together they make one long, unbroken line that suits a market morning or dinner outdoors equally well.",
      },
      {
        type: "p",
        text: "The reverse works too. An oversized shirt over a bias-cut skirt, the front loosely tucked, gives shape without losing ease. Roll the sleeves to just below the elbow and leave the collar open. Small adjustments like these are what make linen look like yours.",
      },
      {
        type: "image",
        size: "column",
        ratio: "3/4",
        src: "/img/l-linen-cami.jpg",
        alt: "A woman standing in tall grasses in a deep olive linen camisole and wide cream linen trousers",
        caption: "Proportion at work: a fitted camisole above a wide, floor-length trouser.",
      },
      {
        type: "products",
        title: "The foundations",
        slugs: ["maya-linen-shirt", "noor-wide-trousers", "sienna-linen-camisole"],
      },
      { type: "h2", text: "Get the fit right" },
      {
        type: "p",
        text: "Linen has very little stretch, so fit is worth a moment’s thought. It relaxes a little with wear, softening and settling into your shape, which means the right size is the one that sits well at the shoulders and moves easily at the hip.",
      },
      {
        type: "list",
        items: [
          "**Choose for the shoulders.** A shirt that fits well there will fall beautifully everywhere else.",
          "**Mind the hem.** Wide trousers look longest when they just graze the top of the foot. With flat sandals, a finger’s width off the floor is ideal.",
          "**Roll with intent.** A neat double turn at the sleeve or cuff looks deliberate; sleeves pushed up in a hurry do not.",
          "**Leave some air.** A little space between cloth and skin is what keeps linen cool, and what gives it that easy fall.",
        ],
      },
      {
        type: "p",
        text: "If you are between sizes, our [Size & Fit](/size-and-fit) guide will help you choose.",
      },
      { type: "h2", text: "Layer through the seasons" },
      {
        type: "p",
        text: "Linen is often packed away with the summer clothes, but it is far more useful than that. Because it breathes, it layers beautifully, and because it is natural, it sits comfortably beside wool, cotton and silk.",
      },
      {
        type: "list",
        items: [
          "**Summer.** Wear it alone and loose. A camisole and skirt, or a single dress with sandals, is all the heat asks for.",
          "**Spring and autumn.** Treat linen as a light jacket. An open shirt over a camisole or tee can be added and removed as the day changes.",
          "**Winter.** Bring linen inside the layers. A linen shirt under a fine knit, or a sleeveless linen dress over a fitted jumper with boots, keeps the texture of summer without the chill.",
        ],
      },
      {
        type: "p",
        text: "The [Lena Maxi Dress](/products/lena-maxi-dress) shows how far one piece can go: loose and cool on its own in January, then layered over knitwear when the light turns.",
      },
      { type: "quote", text: "A crease is only a record of the day you had in it." },
      { type: "h2", text: "Let the creases stay" },
      {
        type: "p",
        text: "Linen creases. It is in the nature of the fibre, and no amount of ironing will change that for long. The most elegant approach is to accept it, and to choose pieces that crease well.",
      },
      {
        type: "p",
        text: "Washed linen creases softly rather than sharply, and relaxed shapes carry creases more gracefully than tailored ones. For a neater finish, hang pieces as soon as you take them off, give them a brief steam before wearing, or dry them on a hanger so gravity does some of the work. Then let the day take its course.",
      },
      {
        type: "p",
        text: "When travelling, roll linen rather than folding it, and hang it in a steamy bathroom when you arrive. By morning, most of the journey will have fallen out of it.",
      },
      { type: "h2", text: "From day to evening" },
      {
        type: "p",
        text: "Because linen is so often worn by day, it can feel unexpected after dark — which is exactly its charm. The secret is to change a few details rather than the whole outfit.",
      },
      {
        type: "list",
        items: [
          "**Change the shoes.** Swap flat sandals for a slim heel or a polished leather mule.",
          "**Change the neckline.** Trade a daytime tee for a camisole, or open a shirt one button further.",
          "**Add one strong piece.** Sculptural earrings, a silk scarf or a structured bag lifts linen at once.",
          "**Refine the shape.** Tie a wrap dress a little closer, or tuck a shirt in fully rather than halfway.",
        ],
      },
      {
        type: "p",
        text: "The [Iris Wrap Dress](/products/iris-wrap-dress) moves easily between the two: flat sandals and a straw bag for lunch, then a heel and fine jewellery for dinner. The [Clara Bias Skirt](/products/clara-bias-skirt) does the same — a tee by day, a camisole by night.",
      },
      {
        type: "pair",
        ratio: "3/4",
        images: [
          {
            src: "/img/ugc-3.jpg",
            alt: "A woman walking along a coastal dune path in a deep olive linen wrap dress",
            caption: "The Iris Wrap Dress, worn simply by day.",
          },
          {
            src: "/img/l-clara-skirt.jpg",
            alt: "A woman perched on a timber bench by a window in a cream camisole and a deep olive bias-cut skirt, holding a cup",
            caption: "The Clara Bias Skirt with a fine camisole — an easy base for day or night.",
          },
        ],
      },
      {
        type: "products",
        title: "Day into evening",
        slugs: ["iris-wrap-dress", "clara-bias-skirt", "lena-maxi-dress"],
      },
      { type: "h2", text: "A few pieces, worn many ways" },
      {
        type: "p",
        text: "Styling linen well is less about owning more and more about knowing what you have. A shirt, wide trousers, a camisole, a bias skirt and a wrap dress can be combined in many ways, across every season of the year. Keep them in the same quiet palette and they will always work together.",
      },
      {
        type: "p",
        text: "That is the thinking behind [The Linen Edit](/collections/the-linen-edit): a small, considered wardrobe in raw cream and deep olive, made to be reached for again and again.",
      },
    ],
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: "seasonal-trends",
    title: "Seasonal Trends",
    tag: "Seasonal",
    date: "2026-09-22",
    excerpt:
      "The shapes, colours, prints and fabrics we are reaching for as the days lengthen — and why a few lasting pieces will always outlive a trend.",
    image: "/img/col-cotton.jpg",
    imageAlt: "Two women in cream and deep olive cotton dresses walking down a sunlit whitewashed lane",
    position: "56% center",
    body: [
      {
        type: "lede",
        text: "Every season arrives with a new list of things to want. Ours is shorter. We look for the shapes, colours and cloths that feel right now and will still feel right years from now — the pieces worth buying once.",
      },
      {
        type: "p",
        text: "In Australia the days are lengthening and the light is turning gold. In the northern hemisphere, the same pieces are being layered for autumn. This is our view of the season, wherever you happen to be reading.",
      },
      { type: "h2", text: "Shapes: long, loose and easy" },
      {
        type: "p",
        text: "The silhouettes we keep coming back to are generous but never shapeless. Columns that fall straight from shoulder to ankle. Wide trousers with a high waist and a clean, floor-grazing line. Shirts cut with room through the body and a soft, dropped shoulder.",
      },
      {
        type: "p",
        text: "Against all that ease, one fitted element brings focus: a fine-strapped camisole, a tie drawn at the waist, a skirt cut on the bias so it follows the body as you move. It is a balance of volume and line that feels modern without trying to be. These are the shapes we would invest in:",
      },
      {
        type: "list",
        items: [
          "**The column dress.** Sleeveless and ankle-length, easy on its own or over knitwear.",
          "**The wide trouser.** High-waisted and full-length, in a linen with enough weight to hold its fall.",
          "**The relaxed shirt.** Worn open as a layer, fully tucked, or knotted at the waist.",
          "**The bias skirt.** The most flattering way we know to wear a midi length.",
          "**The set.** Two pieces designed together, and worn apart just as often.",
        ],
      },
      { type: "h2", text: "Colour: nature’s quieter shades" },
      {
        type: "p",
        text: "Our palette stays close to the natural world: raw cream, deep olive, soft sage and the warm oatmeal of undyed yarn. These are colours that sit well with skin, with sunlight and with one another. None of them dates, and each makes the others look better.",
      },
      {
        type: "p",
        text: "Olive and sage behave almost like neutrals. Wear them where you might once have reached for black or navy, and they will soften everything around them.",
      },
      {
        type: "p",
        text: "If you add one new colour this season, let it arrive through print rather than a single bright piece. A print carries colour gently, and it pairs with the plain pieces you already own.",
      },
      { type: "h2", text: "Prints: drawn by hand" },
      {
        type: "p",
        text: "Prints are where a wardrobe finds its personality, and this season ours are botanical. The Lotus draws flowers, buds and leaves in deep olive on cream, with the soft edges of a hand-printed mark. The Iris — the flower at the heart of our name — is slender and open, drawn in sage and a soft lavender-grey.",
      },
      {
        type: "pair",
        ratio: "4/3",
        images: [
          {
            src: "/img/print-lotus.jpg",
            alt: "Cream cotton printed with lotus flowers, buds and leaves in deep olive",
            caption: "The Lotus",
          },
          {
            src: "/img/print-iris.jpg",
            alt: "Cream fabric printed with slender irises in sage and soft lavender-grey",
            caption: "The Iris",
          },
        ],
      },
      {
        type: "p",
        text: "Both are designed to be worn head to toe or broken up. The [Lotus Shirt & Trouser Set](/products/lotus-shirt-and-trouser-set) makes a complete look on its own, yet the shirt is just as good worn open over a camisole, and the trousers sit easily with a plain cream tee. The [Iris Print Maxi Dress](/products/iris-print-maxi-dress) needs nothing more than sandals — and, as the evenings cool, a knit around the shoulders.",
      },
      {
        type: "p",
        text: "Alongside them, Botanical Studies and Heritage Inspiration continue the story: fine leaf drawings taken from our sketchbooks, and patterns that honour traditional textile craft. You can see all four in [Our Prints](/our-prints).",
      },
      {
        type: "pair",
        ratio: "3/4",
        images: [
          {
            src: "/img/l-lotus-set.jpg",
            alt: "A woman seated on a stone block between potted olive trees in a cream lotus-print shirt and matching wide trousers",
            caption: "The Lotus Shirt & Trouser Set, worn together.",
          },
          {
            src: "/img/l-iris-maxi.jpg",
            alt: "A woman walking through a summer meadow in a cream maxi dress printed with irises",
            caption: "The Iris Print Maxi Dress.",
          },
        ],
      },
      {
        type: "products",
        title: "The season in print",
        slugs: ["lotus-shirt-and-trouser-set", "iris-print-maxi-dress", "lotus-midi-dress"],
      },
      { type: "h2", text: "Fabric: the real investment" },
      {
        type: "p",
        text: "Trends are mostly about shape and colour. Longevity is about fabric. A beautiful cut in a poor cloth will not see out the year; a simple shape in good linen or cotton will last for many.",
      },
      {
        type: "p",
        text: "This season we are reaching for washed linen for its coolness and ease, cotton voile for prints that float, and sand-washed silk for evenings that call for something softer. For cooler nights, or a northern autumn, undyed alpaca adds warmth without weight.",
      },
      {
        type: "p",
        text: "The Resort Collection is built on the same idea: pieces that fold small, crease gracefully and pair with one another, so that a handful of them can carry a whole trip.",
      },
      { type: "h2", text: "Three ways to wear the season" },
      {
        type: "list",
        items: [
          "**Warm days.** The [Riva Linen Set](/products/riva-linen-set) or a column dress, flat sandals and a straw bag. Nothing more.",
          "**In-between days.** A relaxed shirt worn open over a camisole, with wide trousers and a light knit carried for later.",
          "**Evenings.** The [Vera Slip Dress](/products/vera-slip-dress) in sand-washed silk, with a linen shirt over the shoulders as the air cools.",
        ],
      },
      { type: "h2", text: "What we are leaving behind" },
      {
        type: "p",
        text: "Part of choosing well is knowing what to pass on. This season we are leaving behind anything designed to be photographed rather than worn: fussy details that date quickly, synthetic shine, shapes that only work standing still. We are also leaving behind the idea that a new season needs a new wardrobe.",
      },
      {
        type: "p",
        text: "What remains is simpler and, we think, more beautiful: natural cloth, generous cuts and prints with a story behind them.",
      },
      {
        type: "quote",
        text: "The best piece in any wardrobe is the one you are still wearing years from now.",
      },
      { type: "h2", text: "Fewer pieces, worn longer" },
      {
        type: "p",
        text: "It is easy to buy for a season. It is more rewarding to buy for a life. Before adding anything new, we ask three questions.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Will I wear this in more than one season?",
          "Does it work with at least three things I already own?",
          "Will I still love it when it is no longer new?",
        ],
      },
      {
        type: "p",
        text: "A piece that passes all three is rarely a trend. It is a foundation — the shirt that goes with everything, the trousers you reach for without thinking, the dress you pack for every trip. Each wear makes it better value, and each year makes it more yours.",
      },
      {
        type: "p",
        text: "That thinking runs through every IrisandMe collection. [The Linen Edit](/collections/the-linen-edit) builds the foundation. [We Love Cotton](/collections/we-love-cotton) brings everyday ease. [The Resort Collection](/collections/the-resort-collection) is made for travelling light, and [The Lotus Collection](/collections/the-lotus-collection) places our signature print on shapes you can wear for years. [Limited Editions](/collections/limited-editions) are made once, in small numbers, for those who want something rarer still.",
      },
      {
        type: "products",
        title: "Pieces to keep",
        slugs: ["riva-linen-set", "vera-slip-dress", "heritage-block-print-jacket"],
      },
      {
        type: "p",
        text: "Trends will come and go, as they should. The pieces worth keeping are the ones that let you feel like yourself in every season — and they are often the quietest things in the room.",
      },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*  Derived fields and helpers                                                */
/* -------------------------------------------------------------------------- */

const WORDS_PER_MINUTE = 200;

/** Strips the inline marks, leaving the words a reader actually sees. */
export const plainText = (text: string) =>
  text.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/\*\*/g, "");

function blockText(block: ArticleBlock): string {
  switch (block.type) {
    case "lede":
    case "p":
    case "h2":
    case "h3":
    case "quote":
      return block.text;
    case "list":
      return block.items.join(" ");
    default:
      return "";
  }
}

const countWords = (body: ArticleBlock[]) =>
  body
    .map((b) => plainText(blockText(b)))
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;

const dateFormat = new Intl.DateTimeFormat("en-AU", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

export const formatJournalDate = (iso: string) => dateFormat.format(new Date(`${iso}T00:00:00Z`));

/** Every story, newest first. */
export const articles: Article[] = entries
  .map((entry) => {
    const wordCount = countWords(entry.body);
    return {
      ...entry,
      wordCount,
      displayDate: formatJournalDate(entry.date),
      readTime: `${Math.max(1, Math.round(wordCount / WORDS_PER_MINUTE))} min read`,
    };
  })
  .sort((a, b) => b.date.localeCompare(a.date));

export const getArticle = (slug: string) => articles.find((a) => a.slug === slug);

export const articlesInTopic = (topic: JournalTopic) => articles.filter((a) => a.tag === topic);

/** A readable id for a heading, used for in-page links. */
export const headingId = (text: string) =>
  plainText(text)
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
