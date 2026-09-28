import Link from "next/link";
import { getCollection, getProduct, type Product } from "@/lib/products";
import { formatPrice } from "@/lib/site";
import Reveal from "../anim/Reveal";
import Figure from "../ui/Figure";
import { SectionHeading } from "../ui/Section";

const FEATURED: { slug: string; image: string; story: string }[] = [
  {
    slug: "heritage-block-print-jacket",
    image: "/img/l-heritage-jacket.jpg",
    story:
      "Hand block printed with a pattern drawn from heritage textiles, and made in a small, numbered edition.",
  },
  {
    slug: "iris-wrap-dress",
    image: "/img/ugc-3.jpg",
    story: "A true wrap in washed linen that ties at the natural waist.",
  },
  {
    slug: "lena-maxi-dress",
    image: "/img/p-lena.jpg",
    story: "A cool column of linen from scoop neck to ankle.",
  },
];

function Piece({
  product,
  image,
  story,
  large = false,
}: {
  product: Product;
  image: string;
  story: string;
  large?: boolean;
}) {
  const collection = getCollection(product.collections[0]);
  const href = `/products/${product.slug}`;
  return (
    <article className="group/fp">
      <Link href={href} data-cursor="view" aria-label={`${product.name}, ${formatPrice(product.price)}`} className="block">
        <Figure
          src={image}
          alt={`${product.name} in ${product.colour}`}
          ratio={large ? "4/5" : "3/4"}
          sizes={large ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 1024px) 50vw, 22vw"}
        />
      </Link>
      <div className="mt-6 flex flex-col gap-2">
        <p className="eyebrow text-[10px] text-olive-500">
          {product.badge === "Limited Edition" ? "Limited Edition" : collection?.name}
        </p>
        <h3 className={`display leading-none text-olive-800 ${large ? "text-[clamp(1.8rem,3vw,2.6rem)]" : "text-[1.5rem]"}`}>
          <Link href={href} className="transition-colors duration-500 hover:text-olive-500">
            {product.name}
          </Link>
        </h3>
        <p className={`font-sans leading-[1.85] text-olive-600 ${large ? "max-w-[44ch] text-[14.5px]" : "text-[13.5px]"}`}>
          {story}
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-2">
          <span className="font-sans text-[13px] text-olive-700">{formatPrice(product.price)}</span>
          <Link href={href} className="eyebrow link-underline whitespace-nowrap text-[9.5px] text-olive-700">
            Discover the piece
          </Link>
        </div>
      </div>
    </article>
  );
}

/**
 * A few pieces shown the way a magazine would show them — large, with a line
 * of story each — rather than as another row of product tiles.
 */
export default function FeaturedPieces() {
  const [lead, ...rest] = FEATURED.map((f) => ({ ...f, product: getProduct(f.slug) })).filter(
    (f): f is typeof f & { product: Product } => Boolean(f.product)
  );
  if (!lead) return null;

  return (
    <section aria-labelledby="featured-title" className="bg-cream-200 px-6 py-24 md:px-14 md:py-36">
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6">
          <Piece product={lead.product} image={lead.image} story={lead.story} large />
        </div>

        <div className="flex flex-col justify-between gap-16 lg:col-span-5 lg:col-start-8">
          <SectionHeading
            id="featured-title"
            index="02"
            eyebrow="Chosen by the studio"
            title="Featured Pieces"
            intro="Pieces we return to again and again — each one a small study in fabric, cut and detail."
          />
          <Reveal stagger={0.12} className="grid grid-cols-2 gap-5 md:gap-7">
            {rest.map((f) => (
              <div key={f.slug}>
                <Piece product={f.product} image={f.image} story={f.story} />
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
