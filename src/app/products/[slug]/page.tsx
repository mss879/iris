import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Accordion from "@/components/ui/Accordion";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Section, { SectionHeading } from "@/components/ui/Section";
import ProductGrid from "@/components/ProductGrid";
import {
  categoryLabel,
  getCollection,
  getPrint,
  getProduct,
  products,
  type Product,
} from "@/lib/products";
import { fits, model, conversions } from "@/lib/sizing";
import { FREE_SHIPPING_AU, formatPrice, returns, shipping, site } from "@/lib/site";
import ProductPurchase from "./_components/ProductPurchase";

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  return {
    title: `${p.name} — ${p.colour}`,
    description: p.description,
    openGraph: { title: `${p.name} | ${site.name}`, description: p.description, images: [p.image] },
  };
}

/** A close-up of the cloth or print, so every piece shows its material. */
function detailShot(p: Product) {
  if (p.print) return { src: getPrint(p.print)!.image, alt: `${getPrint(p.print)!.name} print, close up` };
  if (p.composition.includes("linen")) return { src: "/img/craft-linen.jpg", alt: "The weave of washed linen, close up" };
  if (p.composition.includes("cotton")) return { src: "/img/fabric-cotton.jpg", alt: "Soft cotton, close up" };
  return { src: "/img/fabric-natural.jpg", alt: "Natural fibres, close up" };
}

function related(p: Product) {
  const same = products.filter(
    (o) => o.slug !== p.slug && o.collections.some((c) => p.collections.includes(c))
  );
  const rest = products.filter((o) => o.slug !== p.slug && !same.includes(o) && o.category === p.category);
  return [...same, ...rest].slice(0, 4);
}

export default async function ProductPage({ params }: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const collection = getCollection(product.collections[0]);
  const print = product.print ? getPrint(product.print) : undefined;
  const fit = fits[product.fit];
  const detail = detailShot(product);
  const gallery = [
    { src: product.image, alt: `${product.name} in ${product.colour}, worn in the studio` },
    ...(product.hover ? [{ src: product.hover, alt: `${product.name}, worn` }] : []),
    detail,
  ];
  const au = shipping.regions[0];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: gallery.map((g) => `${site.url}${g.src}`),
    color: product.colour,
    material: product.composition,
    brand: { "@type": "Brand", name: site.name },
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: site.currency,
      availability: product.preorder
        ? "https://schema.org/PreOrder"
        : product.sizes.every((s) => product.soldOut?.includes(s))
          ? "https://schema.org/OutOfStock"
          : "https://schema.org/InStock",
      url: `${site.url}/products/${product.slug}`,
    },
  };

  const info = [
    {
      id: "details",
      title: "Details",
      content: (
        <ul>
          {product.details.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
      ),
    },
    {
      id: "size-fit",
      title: "Size & fit",
      content: (
        <>
          <p>
            <strong>{fit.label} fit.</strong> {fit.description}
          </p>
          <p>
            Our model is {model.height} and wears a size {model.size} (AU {conversions[model.size].au}).
          </p>
          <p>
            <Link href="/size-and-fit">View the full Size &amp; Fit guide</Link>
          </p>
        </>
      ),
    },
    {
      id: "fabric-care",
      title: "Fabric & care",
      content: (
        <>
          <p>
            <strong>{product.composition}.</strong> {product.fabric}.
          </p>
          <p>{product.care}</p>
          <p>
            <Link href="/garment-care">Garment care guide</Link> ·{" "}
            <Link href="/our-fabrics">Our fabrics</Link>
          </p>
        </>
      ),
    },
    ...(print
      ? [
          {
            id: "print",
            title: `About the print — ${print.name}`,
            content: (
              <>
                <p>{print.summary}</p>
                <p>
                  <Link href="/our-prints">The stories behind our prints</Link>
                </p>
              </>
            ),
          },
        ]
      : []),
    {
      id: "delivery",
      title: "Shipping & returns",
      content: (
        <>
          <p>
            {product.preorder
              ? `${product.preorder}. Pre-order pieces are charged at purchase and sent separately from anything in stock.`
              : `Prepared for dispatch within ${shipping.processing}.`}{" "}
            Standard delivery within Australia takes {au.standard}, complimentary on orders over{" "}
            {formatPrice(FREE_SHIPPING_AU)}. We deliver worldwide.
          </p>
          <p>
            Returns are accepted within {returns.windowDays} days of delivery for unworn pieces with tags
            attached.
          </p>
          <p>
            <Link href="/shipping-and-delivery">Shipping &amp; delivery</Link> ·{" "}
            <Link href="/returns-and-exchanges">Returns &amp; exchanges</Link>
          </p>
        </>
      ),
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <section className="bg-cream-100 px-5 pb-20 pt-[calc(var(--header-h)+2rem)] md:px-10 md:pb-28">
        <div className="mx-auto max-w-[1600px]">
          <Breadcrumbs
            className="mb-8"
            items={[
              { label: "Home", href: "/" },
              { label: "Shop", href: "/shop" },
              { label: categoryLabel(product.category), href: `/shop/${product.category}` },
              { label: product.name },
            ]}
          />

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
            {/* Gallery: studio frame first, then worn, then the cloth itself. */}
            <div className="lg:col-span-7">
              {/* Swipe between frames on a phone; a grid from tablet up. */}
              <ul
                tabIndex={0}
                aria-label={`${product.name} photographs`}
                className="-mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0"
              >
                {gallery.map((g, i) => (
                  <li
                    key={g.src}
                    className={`relative w-[84%] shrink-0 snap-center overflow-hidden bg-cream-200 sm:w-auto ${
                      i === 0 ? "aspect-[3/4] sm:col-span-2 lg:aspect-[4/5]" : "aspect-[3/4]"
                    }`}
                  >
                    <Image
                      src={g.src}
                      alt={g.alt}
                      fill
                      priority={i === 0}
                      sizes={i === 0 ? "(max-width: 1024px) 100vw, 58vw" : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 29vw"}
                      className="object-cover"
                      style={i === 0 ? { objectPosition: "center 20%" } : undefined}
                    />
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-5">
              <div className="flex flex-col gap-8 lg:sticky lg:top-[calc(var(--header-h)+2rem)] lg:pl-6">
                <div>
                  <div className="mb-5 flex flex-wrap items-center gap-3">
                    {product.badge ? (
                      <span className="eyebrow bg-olive-800 px-2.5 py-1.5 text-[9px] text-cream-50">
                        {product.badge}
                      </span>
                    ) : null}
                    {collection ? (
                      <Link
                        href={`/collections/${collection.slug}`}
                        className="eyebrow link-underline text-[10px] text-olive-600"
                      >
                        {collection.name}
                      </Link>
                    ) : null}
                  </div>
                  <h1 className="display text-[clamp(2.2rem,4.4vw,3.6rem)] leading-[0.95] text-olive-800">
                    {product.name}
                  </h1>
                  <p className="mt-4 font-sans text-[17px] text-olive-800">{formatPrice(product.price)}</p>
                  <p className="mt-1 font-sans text-[12px] text-olive-500">
                    {site.currency} · GST included for Australian orders
                  </p>
                </div>

                <dl className="grid grid-cols-2 gap-y-2 border-y hairline py-5 font-sans text-[13px]">
                  <dt className="text-olive-500">Colour</dt>
                  <dd className="text-olive-800">{product.colour}</dd>
                  <dt className="text-olive-500">Fabric</dt>
                  <dd className="text-olive-800">{product.composition}</dd>
                  <dt className="text-olive-500">Fit</dt>
                  <dd className="text-olive-800">{fit.label}</dd>
                  {product.preorder ? (
                    <>
                      <dt className="text-olive-500">Pre-order</dt>
                      <dd className="text-olive-800">{product.preorder}</dd>
                    </>
                  ) : null}
                </dl>

                <p className="font-sans text-[15px] leading-[1.9] text-olive-600">{product.description}</p>

                <ProductPurchase product={product} />

                <p className="font-sans text-[12.5px] leading-relaxed text-olive-600">
                  Complimentary shipping within Australia on orders over {formatPrice(FREE_SHIPPING_AU)} ·{" "}
                  {returns.windowDays}-day returns
                </p>

                <Accordion items={info} defaultOpen={["details"]} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Section tone="sand" labelledBy="related-title">
        <SectionHeading
          id="related-title"
          eyebrow={collection ? collection.name : "IrisandMe"}
          title="You may also like"
          size="small"
          className="mb-14"
        />
        <ProductGrid products={related(product)} />
      </Section>
    </>
  );
}
