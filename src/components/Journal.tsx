import Image from "next/image";
import Reveal, { RevealItem } from "./anim/Reveal";
import { journal } from "@/lib/products";

const [feature, ...rest] = journal;

export default function Journal() {
  return (
    <section id="journal" className="bg-cream-100 px-5 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-[1600px]">
        <Reveal>
          <div className="mb-14 flex flex-wrap items-end justify-between gap-5">
            <div>
              <div className="section-index mb-5 text-olive-400">
                <span className="eyebrow text-olive-300">07</span>
                <span className="rule" />
                <span className="eyebrow">Stories</span>
              </div>
              <h2 className="display text-[clamp(2rem,5.5vw,4rem)] text-olive-700">
                From our journal
              </h2>
            </div>
            <a href="#journal" className="eyebrow link-underline text-olive-600">
              See all articles
            </a>
          </div>
        </Reveal>

        {/* One story carries the section; the rest sit beside it as a reading list. */}
        <div className="grid grid-cols-1 gap-x-10 gap-y-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <a href="#journal" className="group/post block">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-cream-200">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/post:scale-[1.045]"
                />
                <span className="eyebrow absolute left-4 top-4 bg-cream-50/92 px-3 py-1.5 text-[9px] text-olive-800 backdrop-blur-sm">
                  {feature.tag}
                </span>
              </div>

              <div className="mt-6 flex items-center gap-3 font-sans text-[11px] tracking-[0.13em] text-olive-400">
                <span>{feature.date}</span>
                <span className="block h-px w-5 bg-olive-700/25" />
                <span>{feature.readTime} read</span>
              </div>

              <h3 className="display mt-3 max-w-[20ch] text-[clamp(1.6rem,3vw,2.5rem)] leading-[1.02] text-olive-800">
                {feature.title}
              </h3>
              <p className="mt-4 max-w-[52ch] font-sans text-[14px] leading-[1.9] text-olive-500">
                {feature.excerpt}
              </p>
              <span className="eyebrow link-underline mt-6 inline-block text-[10px] text-olive-600">
                Read the story
              </span>
            </a>
          </Reveal>

          <Reveal stagger={0.14} className="flex flex-col justify-center gap-10 lg:col-span-5">
            {rest.map((post, i) => (
              <RevealItem key={post.title}>
                <a href="#journal" className="group/post flex gap-6 border-t hairline pt-8">
                  <div className="relative aspect-square w-[104px] shrink-0 overflow-hidden bg-cream-200 sm:w-[136px]">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="140px"
                      className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/post:scale-[1.07]"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <span className="eyebrow text-[9px] text-olive-300">
                        0{i + 2}
                      </span>
                      <span className="eyebrow text-[9px] text-olive-400">{post.tag}</span>
                    </div>
                    <h3 className="display mt-2.5 text-[clamp(1.15rem,1.9vw,1.5rem)] leading-[1.08] text-olive-700">
                      {post.title}
                    </h3>
                    <p className="mt-2.5 font-sans text-[11px] tracking-[0.12em] text-olive-400">
                      {post.date} — {post.readTime}
                    </p>
                  </div>
                </a>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
