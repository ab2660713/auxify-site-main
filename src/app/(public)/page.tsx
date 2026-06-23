import CTA from './_components/home/cta';
import Certified from './_components/home/certified';
import Experience from './_components/home/experience2';
import { FAQSection } from './_components/home/faq';
import Features2 from './_components/home/features2';
import { Hero } from './_components/home/hero';
import Industries from './_components/home/industries';
import { IntegrationCarousel } from './_components/home/integration';
import Metrics from './_components/home/metrics';
import Timeline from './_components/home/timeline';

export default function PublicHome() {
  return (
    <>
      <Hero />

      <Metrics />

      <Experience />

      <Features2 />

      <Timeline />

      <Industries />

      <IntegrationCarousel />

      <Certified />

      <FAQSection />

      <CTA />
    </>
  );
}
