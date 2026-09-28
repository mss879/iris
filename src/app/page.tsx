import Curtain from "@/components/Curtain";
import Hero from "@/components/Hero";
import BrandStatement from "@/components/home/BrandStatement";
import NewArrivals from "@/components/home/NewArrivals";
import FeaturedPieces from "@/components/home/FeaturedPieces";
import CraftMessage from "@/components/home/CraftMessage";
import Editorial from "@/components/Editorial";
import Values from "@/components/home/Values";
import InstagramGrid from "@/components/home/InstagramGrid";
import NewsletterSignup from "@/components/ui/NewsletterSignup";

/**
 * Homepage, in the order the brief sets out: collection image, brand
 * statement, the new collection, new arrivals, featured pieces, fabrics and
 * craftsmanship, the story, values, Instagram, and the newsletter. It reads
 * as an editorial rather than a catalogue — two small product moments only.
 */
export default function Home() {
  return (
    <>
      <Curtain />
      <Hero />
      <BrandStatement />
      <NewArrivals />
      <FeaturedPieces />
      <CraftMessage />
      <Editorial
        image="/img/editorial-courtyard.jpg"
        alt="A woman in a flowing deep olive dress walking through a sunlit cream stone courtyard"
        index="04"
        eyebrow="Our Story"
        title="Where nature meets heritage"
        body="IrisandMe was born in Australia from a simple wish: clothing with the calm of the natural world and the grace of heritage craft, made for the way women live now."
        cta="Read Our Story"
        href="/our-story"
        align="left"
        position="66% center"
      />
      <Values />
      <InstagramGrid />
      <NewsletterSignup />
    </>
  );
}
