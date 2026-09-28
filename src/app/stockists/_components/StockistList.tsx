import Reveal from "@/components/anim/Reveal";
import { regionOrder, type Stockist } from "../_data/stockists";

const slug = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, "-");

/** "https://www.example.com/shop" → "example.com", for display only. */
function displayHost(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

/** Stockists grouped by region, in the order set by `regionOrder`. */
export default function StockistList({ stockists }: { stockists: Stockist[] }) {
  const groups = regionOrder
    .map((region) => ({
      region,
      items: stockists
        .filter((s) => s.region === region)
        .sort((a, b) => a.city.localeCompare(b.city) || a.name.localeCompare(b.name)),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <div className="flex flex-col gap-20 md:gap-24">
      {groups.map((group) => {
        const headingId = `region-${slug(group.region)}`;
        return (
          <section key={group.region} aria-labelledby={headingId}>
            <div className="flex items-baseline justify-between gap-6 border-b hairline pb-5">
              <h3
                id={headingId}
                className="display text-[clamp(1.8rem,3vw,2.6rem)] leading-none text-olive-800"
              >
                {group.region}
              </h3>
              <span className="eyebrow shrink-0 text-[10px] text-olive-500">
                {group.items.length} {group.items.length === 1 ? "stockist" : "stockists"}
              </span>
            </div>

            <ul className="mt-10 grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {group.items.map((stockist) => (
                <li key={`${stockist.name}-${stockist.city}`}>
                  <Reveal className="flex h-full flex-col border-t hairline pt-6">
                    <p className="eyebrow text-[10px] text-olive-500">
                      {stockist.city}, {stockist.country}
                    </p>
                    <h4 className="serif mt-3 text-[1.65rem] leading-snug text-olive-800">{stockist.name}</h4>
                    <address className="mt-3 font-sans text-[14px] not-italic leading-[1.8] text-olive-600">
                      {stockist.address}
                    </address>
                    {stockist.website || stockist.phone ? (
                      <div className="mt-5 flex flex-wrap gap-x-7 gap-y-2">
                        {stockist.website ? (
                          <a
                            href={stockist.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="eyebrow link-underline text-[10px] text-olive-800"
                          >
                            {displayHost(stockist.website)}
                            <span className="sr-only"> — {stockist.name} website (opens in a new tab)</span>
                          </a>
                        ) : null}
                        {stockist.phone ? (
                          <a
                            href={`tel:${stockist.phone.replace(/[^+\d]/g, "")}`}
                            className="eyebrow link-underline text-[10px] text-olive-800"
                          >
                            {stockist.phone}
                          </a>
                        ) : null}
                      </div>
                    ) : null}
                  </Reveal>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
