import type { Metadata } from "next";
import Link from "next/link";
import ServiceShell from "@/components/ui/ServiceShell";
import DataTable from "@/components/ui/DataTable";
import FeatureGrid from "@/components/ui/FeatureGrid";
import Figure from "@/components/ui/Figure";
import Prose from "@/components/ui/Prose";
import {
  DetailList,
  HelpPrompt,
  JumpNav,
  ServiceSection,
  ServiceSections,
  SubHeading,
  sectionIndex,
  type JumpLink,
} from "@/components/services/ServiceBlocks";

export const metadata: Metadata = {
  title: "Garment Care",
  description:
    "How to care for linen, cotton, printed and delicate pieces — washing, drying, ironing, steaming and storage — so your IrisandMe clothing lasts for years.",
};

const toc: JumpLink[] = [
  { id: "care-essentials", label: "Care essentials" },
  { id: "linen", label: "Linen" },
  { id: "cotton", label: "Cotton" },
  { id: "printed-garments", label: "Printed garments" },
  { id: "delicate-pieces", label: "Delicate pieces" },
  { id: "ironing-and-steaming", label: "Ironing & steaming" },
  { id: "drying", label: "Drying" },
  { id: "storage", label: "Storage" },
  { id: "mending-and-refreshing", label: "Mending & refreshing" },
];
const n = (id: string) => sectionIndex(toc, id);

export default function GarmentCarePage() {
  return (
    <ServiceShell
      current="/garment-care"
      title="Garment Care"
      intro={
        <p>
          Natural fibres are made to last, and the way they are washed, dried and stored decides
          for how long. A little care keeps each piece soft, true to its colour and in your
          wardrobe for years rather than seasons.
        </p>
      }
    >
      <ServiceSections>
        <JumpNav items={toc} />

        <ServiceSection
          id="care-essentials"
          index={n("care-essentials")}
          eyebrow="Why care matters"
          title="Care that makes clothes last"
          intro="How a garment is cared for shapes its life as much as how it was made. Every gentle wash, every piece dried in the shade and every loose button caught early means fewer faded colours, less stretching and a piece that stays with you."
        >
          <FeatureGrid
            columns={2}
            items={[
              {
                title: "Wash less often",
                body: "Natural fibres rarely need washing after every wear. Air a piece overnight, spot clean small marks, and save the wash for when it’s truly needed.",
              },
              {
                title: "Wash cool and gentle",
                body: "A cool, gentle cycle and a mild detergent protect fibres and colour — and use less energy, too.",
              },
              {
                title: "Dry naturally",
                body: "Skip the tumble dryer. Line dry in the shade, and dry knitwear and silk flat.",
              },
              {
                title: "Store and mend with care",
                body: "Keep pieces clean, with room to breathe, and fix a loose button or seam before it grows.",
              },
            ]}
          />

          <DataTable
            className="mt-20"
            caption="Care at a glance"
            head={["Fabric", "Wash", "Dry", "Iron or steam", "Store"]}
            rows={[
              [
                "Linen",
                "Cool, gentle machine wash or hand wash",
                "Line dry in the shade",
                "Steam, or warm iron while slightly damp",
                "Hang, with room to breathe",
              ],
              [
                "Cotton",
                "Cool, gentle machine wash with like colours",
                "Line dry in the shade",
                "Warm iron on the reverse",
                "Hang or fold",
              ],
              [
                "Printed pieces",
                "Cool, gentle wash, inside out",
                "Line dry in the shade",
                "Warm iron on the reverse",
                "Hang or fold, out of direct sun",
              ],
              [
                "Silk",
                "Hand wash cold with a silk detergent, or dry clean",
                "Dry flat in the shade",
                "Cool iron on the reverse",
                "On a padded hanger",
              ],
              [
                "Knitwear",
                "Hand wash cold with a wool detergent",
                "Dry flat, away from heat and sun",
                "Don’t iron — steam lightly if needed",
                "Fold — never hang",
              ],
            ]}
            minWidth={820}
            note="Always check the care label inside your garment first, as it is written for that piece. You’ll also find care instructions on every product page."
          />

          <Prose className="mt-10">
            <p>
              To learn more about the fibres we work with, and why we choose them, visit{" "}
              <Link href="/our-fabrics">Our Fabrics</Link>.
            </p>
          </Prose>
        </ServiceSection>

        <ServiceSection
          id="linen"
          index={n("linen")}
          eyebrow="Washed linen & linen twill"
          title="Linen"
          intro="Linen is spun from the flax plant. It is strong and breathable, and it grows softer with every wash and wear — the more it is lived in, the better it feels."
        >
          <DetailList
            items={[
              {
                term: "Wash",
                detail:
                  "Machine wash cool (30°C or below) on a gentle cycle, or hand wash. Wash with similar colours and leave room in the drum so the linen can move freely.",
              },
              {
                term: "Detergent",
                detail:
                  "A mild liquid detergent. Skip bleach, which weakens the fibres, and fabric softener, which coats them — linen softens on its own.",
              },
              {
                term: "Dry",
                detail:
                  "Shake out, smooth the seams and line dry in the shade. Avoid the tumble dryer, which can shrink linen and set creases.",
              },
              {
                term: "Iron or steam",
                detail: "Steam, or iron on a warm setting while the linen is still slightly damp.",
              },
              {
                term: "Good to know",
                detail:
                  "Soft creases are part of linen’s character, and small slubs in the weave are natural to flax. Heavier linen twill is cared for in the same way.",
              },
            ]}
          />
        </ServiceSection>

        <ServiceSection
          id="cotton"
          index={n("cotton")}
          eyebrow="Voile, lawn, poplin & jersey"
          title="Cotton"
          intro="Our cotton ranges from fine voile and lawn to crisp poplin and soft jersey. It is breathable and easy to live with, and keeps its shape and colour best when washed cool."
        >
          <DetailList
            items={[
              {
                term: "Wash",
                detail:
                  "Machine wash cool (30°C or below) on a gentle cycle with similar colours. A mesh laundry bag protects fine voile and lawn.",
              },
              {
                term: "Detergent",
                detail:
                  "A mild detergent, without bleach. Detergents with optical brighteners can change the tone of cream and natural colours over time.",
              },
              {
                term: "Dry",
                detail:
                  "Line dry in the shade. Dry jersey flat, or folded over the line rather than pegged at the shoulders, so it keeps its shape.",
              },
              {
                term: "Iron or steam",
                detail:
                  "Warm iron on the reverse. Fine voile and lawn also respond well to a gentle steam.",
              },
              {
                term: "Good to know",
                detail:
                  "Cotton can shrink in high heat, so avoid hot washes and the tumble dryer.",
              },
            ]}
          />
        </ServiceSection>

        <ServiceSection
          id="printed-garments"
          index={n("printed-garments")}
          eyebrow="Our prints"
          title="Printed garments"
          intro="Our prints are made to be worn for years. A little extra care — washing inside out and drying away from the sun — keeps their colour clear and their lines crisp."
        >
          <DetailList
            items={[
              {
                term: "Wash",
                detail:
                  "Turn the piece inside out and wash cool on a gentle cycle, with similar colours.",
              },
              {
                term: "Detergent",
                detail:
                  "A mild detergent, without bleach. Avoid rubbing stain remover into a print; if a mark needs treating, test on an inside seam first.",
              },
              {
                term: "Dry",
                detail:
                  "Line dry in the shade, still inside out. Direct sun fades printed colour over time.",
              },
              {
                term: "Iron or steam",
                detail: "Warm iron on the reverse, to protect the print.",
              },
              {
                term: "Good to know",
                detail:
                  "Hand block-printed pieces carry small variations in colour and line — the mark of the maker’s hand rather than a flaw.",
              },
            ]}
          />
        </ServiceSection>

        <ServiceSection
          id="delicate-pieces"
          index={n("delicate-pieces")}
          eyebrow="Silk & knitwear"
          title="Delicate pieces"
          intro="Silk and fine knitwear ask for the gentlest care of all: cold water, a light touch and time to dry flat."
        >
          <div className="flex flex-col gap-14">
            <div>
              <SubHeading>Silk</SubHeading>
              <DetailList
                className="mt-6"
                items={[
                  {
                    term: "Wash",
                    detail:
                      "Hand wash cold with a gentle silk detergent, or dry clean. Don’t leave silk to soak, and never wring it — press the water out in a clean towel instead.",
                  },
                  { term: "Dry", detail: "Dry flat in the shade, away from direct heat." },
                  {
                    term: "Iron or steam",
                    detail:
                      "Cool iron on the reverse with a pressing cloth, or a light steam. Avoid spraying water onto silk, which can leave marks.",
                  },
                  {
                    term: "Good to know",
                    detail:
                      "Let perfume and deodorant dry fully before you dress, as both can mark silk.",
                  },
                ]}
              />
            </div>
            <div>
              <SubHeading>Knitwear</SubHeading>
              <DetailList
                className="mt-6"
                items={[
                  {
                    term: "Wash",
                    detail:
                      "Hand wash cold with a wool detergent, and only when needed — knitwear freshens well with airing between wears.",
                  },
                  {
                    term: "Dry",
                    detail:
                      "Squeeze out the water gently, roll the piece in a towel, then dry it flat away from direct heat and sunlight, easing it back into shape.",
                  },
                  {
                    term: "Iron or steam",
                    detail:
                      "Don’t iron knitwear. If needed, hold a steamer a little away from the surface.",
                  },
                  { term: "Store", detail: "Fold — never hang — so the shoulders don’t stretch." },
                  {
                    term: "Good to know",
                    detail:
                      "A little pilling is natural in soft fibres such as alpaca. Lift it gently with a fabric comb.",
                  },
                ]}
              />
            </div>
          </div>
        </ServiceSection>

        <ServiceSection
          id="ironing-and-steaming"
          index={n("ironing-and-steaming")}
          eyebrow="A smooth finish"
          title="Ironing & steaming"
          intro="Steaming relaxes creases without pressing the fibres flat — the gentlest way to refresh linen, silk and fine cotton. An iron gives a crisper finish when you want one."
        >
          <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-12 md:gap-12">
            <Figure
              className="md:col-span-5"
              src="/img/craft-finishing.jpg"
              alt="A seamstress steaming a cream linen dress on a dress form"
              ratio="4/3"
              sizes="(max-width: 768px) 100vw, 30vw"
            />
            <Prose className="md:col-span-7">
              <ul>
                <li>Steam hanging pieces from the top down, keeping the steamer moving.</li>
                <li>
                  No steamer? Hang the piece in the bathroom while you shower and let the steam do
                  the work.
                </li>
                <li>Iron darker colours and prints on the reverse to avoid shine and protect colour.</li>
                <li>
                  Let a piece cool on its hanger before you wear it, so fresh creases don’t set.
                </li>
                <li>Check the care label first — it is specific to each piece.</li>
              </ul>
            </Prose>
          </div>

          <SubHeading className="mt-16">Settings by fabric</SubHeading>
          <DetailList
            className="mt-6"
            items={[
              { term: "Linen", detail: "Steam, or a warm iron while slightly damp." },
              { term: "Cotton", detail: "A warm iron on the reverse." },
              { term: "Printed pieces", detail: "A warm iron on the reverse, to protect the print." },
              {
                term: "Silk",
                detail: "A cool iron on the reverse with a pressing cloth, or a light steam.",
              },
              {
                term: "Knitwear",
                detail: "No iron. A light steam held a little away from the knit, if needed.",
              },
            ]}
          />
        </ServiceSection>

        <ServiceSection
          id="drying"
          index={n("drying")}
          eyebrow="Air & shade"
          title="Drying"
          intro="Heat is the quickest way to shorten a garment’s life. Drying naturally keeps fibres strong, colours true and each piece in the shape it was made."
        >
          <DetailList
            items={[
              {
                term: "Skip the dryer",
                detail:
                  "Tumble drying can shrink natural fibres, weaken them over time and set creases.",
              },
              {
                term: "Choose shade",
                detail:
                  "Direct sunlight fades colour — particularly deep tones and prints — and weakens silk.",
              },
              {
                term: "Reshape while damp",
                detail:
                  "Shake the piece out and smooth the seams, collar and cuffs. Hang shirts and dresses on a wide hanger to dry with fewer creases.",
              },
              {
                term: "Dry delicates flat",
                detail:
                  "Lay knitwear and silk flat on a clean towel, away from heaters and direct sun.",
              },
              {
                term: "Never wring",
                detail: "Squeeze gently, or roll the piece in a towel to lift out excess water.",
              },
            ]}
          />
        </ServiceSection>

        <ServiceSection
          id="storage"
          index={n("storage")}
          eyebrow="Between wears"
          title="Storage"
          intro="How a piece rests between wears matters as much as how it is washed. Store pieces clean, dry and with room to breathe."
        >
          <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-12 md:gap-12">
            <Prose className="md:col-span-7">
              <ul>
                <li>
                  Store pieces clean and completely dry. Marks set over time, and moths are drawn
                  to fibres that have been worn.
                </li>
                <li>
                  Hang shirts and dresses on wooden or padded hangers, and fold knitwear so it
                  keeps its shape.
                </li>
                <li>
                  Give your wardrobe some room. Crowded rails crease linen and stop air moving
                  around your clothes.
                </li>
                <li>
                  For longer storage, choose breathable cotton or linen garment bags rather than
                  plastic, which traps moisture.
                </li>
                <li>Cedar or dried lavender helps deter moths — especially around knitwear and silk.</li>
                <li>Keep pieces out of direct sunlight, which fades colour even indoors.</li>
                <li>
                  At the change of season, wash or air pieces before putting them away, and give
                  them a light steam when they come back out.
                </li>
              </ul>
            </Prose>
            <Figure
              className="md:col-span-5"
              src="/img/journal-3.jpg"
              alt="Folded cream and olive linen shirts stacked on a wooden bench"
              ratio="4/5"
              sizes="(max-width: 768px) 100vw, 30vw"
            />
          </div>
        </ServiceSection>

        <ServiceSection
          id="mending-and-refreshing"
          index={n("mending-and-refreshing")}
          eyebrow="Keeping pieces in use"
          title="Mending & refreshing"
          intro="Small, regular attention keeps a garment in use for longer — and a well-mended piece often becomes the one you reach for most."
        >
          <DetailList
            items={[
              {
                term: "Air between wears",
                detail:
                  "Hang a piece by an open window overnight. Natural fibres let go of odours easily, so they need washing less often.",
              },
              {
                term: "Spot clean",
                detail:
                  "Blot fresh marks with cool water and a little mild soap rather than rubbing them. Test on an inside seam first.",
              },
              {
                term: "Mend early",
                detail:
                  "Re-secure a loose button or small open seam as soon as you notice it, before it grows. A local tailor or alterations service can help with larger repairs.",
              },
              {
                term: "Refresh knitwear",
                detail:
                  "Lift pilling with a fabric comb, and ease the shape back while the piece is damp after washing.",
              },
              {
                term: "Something not right?",
                detail: (
                  <>
                    If a piece develops a fault soon after it arrives, please don’t repair it
                    yourself — <Link href="/returns-and-exchanges#faulty">let us know</Link> so we
                    can put it right.
                  </>
                ),
              },
            ]}
          />
        </ServiceSection>

        <HelpPrompt title="A question about caring for a piece?">
          <p>
            If a care label has you unsure, or you’d like advice on a particular piece, our Client
            Services team is happy to help.
          </p>
        </HelpPrompt>
      </ServiceSections>
    </ServiceShell>
  );
}
