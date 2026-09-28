import Figure from "@/components/ui/Figure";
import Prose from "@/components/ui/Prose";
import PullQuote from "@/components/ui/PullQuote";
import { headingId, type ArticleBlock } from "@/lib/journal";
import ArticleProducts from "./ArticleProducts";
import RichText from "./RichText";

type TextBlock = Extract<ArticleBlock, { type: "lede" | "p" | "h2" | "h3" | "list" }>;
type FeatureBlock = Exclude<ArticleBlock, TextBlock>;
type Run = { kind: "text"; blocks: TextBlock[] } | { kind: "feature"; block: FeatureBlock };

const TEXT_TYPES = new Set<ArticleBlock["type"]>(["lede", "p", "h2", "h3", "list"]);
const isText = (block: ArticleBlock): block is TextBlock => TEXT_TYPES.has(block.type);

/**
 * The reading measure shared by every run of text and the article's footer:
 * about 75 characters a line at the article's 17px.
 */
export const MEASURE = "mx-auto w-full max-w-[640px]";

/**
 * Consecutive paragraphs, headings and lists are gathered into one run of
 * prose on the reading measure; photographs, pull quotes and products sit
 * between the runs at their own, wider widths.
 */
function toRuns(body: ArticleBlock[]): Run[] {
  const runs: Run[] = [];
  for (const block of body) {
    if (isText(block)) {
      const last = runs[runs.length - 1];
      if (last?.kind === "text") last.blocks.push(block);
      else runs.push({ kind: "text", blocks: [block] });
    } else {
      runs.push({ kind: "feature", block });
    }
  }
  return runs;
}

const aspect = (ratio: string) => {
  const [w, h] = ratio.split("/").map(Number);
  return w && h ? w / h : 1;
};

function Text({ block }: { block: TextBlock }) {
  switch (block.type) {
    case "lede":
      return (
        <p className="serif text-[clamp(1.4rem,2.4vw,1.8rem)] leading-[1.5] text-olive-700">
          <RichText text={block.text} />
        </p>
      );
    case "p":
      return (
        <p>
          <RichText text={block.text} />
        </p>
      );
    case "h2":
      return <h2 id={headingId(block.text)}>{block.text}</h2>;
    case "h3":
      return <h3 id={headingId(block.text)}>{block.text}</h3>;
    case "list": {
      const List = block.ordered ? "ol" : "ul";
      return (
        <List>
          {block.items.map((item, i) => (
            <li key={i}>
              <RichText text={item} />
            </li>
          ))}
        </List>
      );
    }
  }
}

function Feature({ block }: { block: FeatureBlock }) {
  switch (block.type) {
    case "quote":
      return (
        <div className="mx-auto my-16 max-w-[1100px] md:my-24">
          <span aria-hidden="true" className="mx-auto mb-10 block h-10 w-px bg-olive-700/25" />
          <PullQuote cite={block.cite}>{block.text}</PullQuote>
          <span aria-hidden="true" className="mx-auto mt-10 block h-10 w-px bg-olive-700/25" />
        </div>
      );

    case "image": {
      const ratio = block.ratio ?? (block.size === "wide" ? "3/2" : "4/5");
      const portrait = aspect(ratio) < 1;
      const width =
        block.size === "wide" ? "max-w-[1100px]" : portrait ? "max-w-[520px]" : "max-w-[720px]";
      const sizes =
        block.size === "wide"
          ? "(max-width: 1100px) 100vw, 1100px"
          : portrait
            ? "(max-width: 640px) 100vw, 520px"
            : "(max-width: 768px) 100vw, 720px";
      return (
        <div className={`mx-auto my-14 md:my-20 ${width}`}>
          <Figure src={block.src} alt={block.alt} ratio={ratio} caption={block.caption} sizes={sizes} />
        </div>
      );
    }

    case "pair": {
      const ratio = block.ratio ?? "3/4";
      return (
        <div className="mx-auto my-14 grid max-w-[1100px] grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-6 md:my-20 md:gap-8">
          {block.images.map((image, i) => (
            <Figure
              key={image.src}
              src={image.src}
              alt={image.alt}
              ratio={ratio}
              caption={image.caption}
              sizes="(max-width: 640px) 100vw, 550px"
              className={i === 1 ? "sm:mt-16" : ""}
            />
          ))}
        </div>
      );
    }

    case "products":
      return <ArticleProducts slugs={block.slugs} title={block.title} />;
  }
}

export default function ArticleBody({ body }: { body: ArticleBlock[] }) {
  return (
    <>
      {toRuns(body).map((run, i) =>
        run.kind === "text" ? (
          <div key={i} className={MEASURE}>
            <Prose className="text-[16px] md:text-[17px]">
              {run.blocks.map((block, j) => (
                <Text key={j} block={block} />
              ))}
            </Prose>
          </div>
        ) : (
          <Feature key={i} block={run.block} />
        )
      )}
    </>
  );
}
