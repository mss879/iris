import Curtain from "@/components/Curtain";
import Header from "@/components/Header";
import ScrollProgress from "@/components/anim/ScrollProgress";
import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import ShopCollection from "@/components/ShopCollection";
import Editorial from "@/components/Editorial";
import PressStrip from "@/components/PressStrip";
import Testimonials from "@/components/Testimonials";
import AsSeenOnYou from "@/components/AsSeenOnYou";
import MarqueeBand from "@/components/MarqueeBand";
import BrandPromise from "@/components/BrandPromise";
import Journal from "@/components/Journal";
import Moments from "@/components/Moments";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Curtain />
      <ScrollProgress />
      <Header />

      <main className="flex-1">
        <Hero />
        <Intro />
        <PressStrip />
        <ShopCollection />

        <Editorial
          image="/img/editorial-craft.jpg"
          alt="Bolts of deep olive silk and cream linen on a pale wooden atelier table in raking light"
          index="03"
          eyebrow="The Art of Slow Fashion"
          title="The making of the Olive Edit"
          body="Six weeks from loom to hem. Cloth chosen by hand, cut in one room, finished by the same people who started it."
          cta="Read the Story"
          align="left"
        />

        <AsSeenOnYou />

        <Editorial
          image="/img/editorial-courtyard.jpg"
          alt="A woman in a flowing deep olive silk dress walking through a sunlit cream stone courtyard"
          index="04"
          eyebrow="Back by popular demand"
          title="One dress, two ways"
          body="The Lena Maxi returns in deep olive — worn loose through summer, layered over cream knit when the light turns."
          cta="Shop the Dress"
          align="right"
        />

        <MarqueeBand />
        <BrandPromise />
        <Testimonials />
        <Journal />
        <Moments />
      </main>

      <Footer />
    </>
  );
}
