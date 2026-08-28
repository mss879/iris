import VelocityMarquee from "./anim/VelocityMarquee";

export default function MarqueeBand() {
  return (
    <section className="border-y border-olive-700/15 bg-cream-200 py-7">
      <VelocityMarquee
        text="Slow fashion  ·  Natural fibres  ·  Small runs  ·  Made to be treasured  ·  Iris and Me  ·  "
        baseVelocity={2}
        className="display text-[clamp(1.6rem,4vw,3rem)] text-olive-600"
      />
    </section>
  );
}
