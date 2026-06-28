import Image from 'next/image';
import { ShieldCheck, ExternalLink } from 'lucide-react';

const certifications = [
  {
    name: 'ISO 27001',
    subtitle: 'Information Security Management',
    src: '/certified/27001.png',
    href: '/certified/27001.pdf',
    width: 80,
    height: 80,
  },
  {
    name: 'ISO 42001',
    subtitle: 'AI Management System',
    src: '/certified/42001.png',
    href: '/certified/42001.pdf',
    width: 142,
    height: 80,
  },
  {
    name: 'ISO 27701',
    subtitle: 'Privacy Information Management',
    src: '/certified/ISO27701logo.png',
    href: '/certified/27701.pdf',
    width: 160,
    height: 140,
  },
  {
    name: 'SOC 2',
    subtitle: 'Service Organization Control',
    src: '/certified/soc2.png',
    href: '/certified/soc.pdf',
    width: 80,
    height: 80,
  },
  {
    name: 'DPDPA',
    subtitle: 'Data Protection Compliance',
    src: '/certified/dpdpa.png',
    href: '/certified/dpdpa.pdf',
    width: 85,
    height: 80,
  },
] as const;

const topRow = certifications.slice(0, 3);
const bottomRow = certifications.slice(3);

export default function Certified() {
  return (
    <section aria-label="Auxify certifications" className="w-full bg-white">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:py-20 lg:py-24">
        {/* Heading */}
        <div className="mb-14 text-center">
          {/* <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#014baa]/15 bg-[#014baa]/5 px-4 py-1.5">
            <ShieldCheck className="h-4 w-4 text-[#0a0a0a]" />
            <span className="text-xs font-semibold text-[#0a0a0a]">Certified & Compliant</span>
          </div> */}
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#0a0a0a] sm:text-4xl lg:text-5xl">
            Built to pass your security review.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[#4A5568]">
            Auxify is certified and compliant with global security, AI governance, and data protection standards.
          </p>
        </div>

        {/* Top row — 3 cards */}
        <div className="mx-auto grid max-w-4xl gap-5 sm:grid-cols-3">
          {topRow.map((cert) => (
            <a
              key={cert.name}
              href={cert.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col items-center justify-center gap-4 rounded-2xl border border-[#E2E8F0] bg-white p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#014baa]/30 hover:shadow-xl hover:shadow-[#014baa]/8"
            >
              <div className="absolute top-3 right-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <ExternalLink className="h-4 w-4 text-[#0a0a0a]" />
              </div>

              <div className="transition-transform duration-300 group-hover:scale-110">
                <Image
                  alt={`${cert.name} certification`}
                  className="max-h-20 w-auto object-contain"
                  height={cert.height}
                  src={cert.src}
                  width={cert.width}
                />
              </div>

              <div className="text-center">
                <p className="text-sm font-bold text-[#0a0a0a]">{cert.name}</p>
                <p className="mt-1 text-xs text-[#4A5568] transition-colors duration-300 group-hover:text-[#0a0a0a]">
                  {cert.subtitle}
                </p>
              </div>

              <div className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 rounded-b-2xl bg-[#014baa] transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          ))}
        </div>

        {/* Bottom row — 2 cards centered */}
        <div className="mx-auto mt-5 grid max-w-3xl gap-5 sm:grid-cols-2 sm:px-16">
          {bottomRow.map((cert) => (
            <a
              key={cert.name}
              href={cert.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col items-center justify-center gap-4 rounded-2xl border border-[#E2E8F0] bg-white p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#014baa]/30 hover:shadow-xl hover:shadow-[#014baa]/8"
            >
              <div className="absolute top-3 right-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <ExternalLink className="h-4 w-4 text-[#0a0a0a]" />
              </div>

              <div className="transition-transform duration-300 group-hover:scale-110">
                <Image
                  alt={`${cert.name} certification`}
                  className="max-h-20 w-auto object-contain"
                  height={cert.height}
                  src={cert.src}
                  width={cert.width}
                />
              </div>

              <div className="text-center">
                <p className="text-sm font-bold text-[#0a0a0a]">{cert.name}</p>
                <p className="mt-1 text-xs text-[#4A5568] transition-colors duration-300 group-hover:text-[#0a0a0a]">
                  {cert.subtitle}
                </p>
              </div>

              <div className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 rounded-b-2xl bg-[#014baa] transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
