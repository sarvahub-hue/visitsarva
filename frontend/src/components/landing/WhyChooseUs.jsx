import React from "react";
import { motion } from "framer-motion";
import {
  ScrollText,
  ShieldCheck,
  Compass,
  Building2,
  Handshake,
  LineChart,
} from "lucide-react";
import { SERVICES } from "@/constants/testIds";

const Tile = ({ children, className = "", ...rest }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.7 }}
    className={`relative border border-[#2a2623] bg-[#14110f] p-7 md:p-9 group hover:border-[#c89b5f]/50 transition-colors duration-500 ${className}`}
    {...rest}
  >
    {children}
  </motion.div>
);

const WhyChooseUs = () => {
  return (
    <section
      id="services"
      data-testid={SERVICES.root}
      className="relative py-24 md:py-32 bg-[#0a0908]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-12 gap-8 items-end mb-14">
          <div className="md:col-span-7">
            <div className="text-overline mb-4">Why Sarvabhoomi</div>
            <h2 className="font-serif-display font-light text-4xl md:text-5xl lg:text-6xl text-[#f5f0ea] leading-tight">
              Six disciplines, one{" "}
              <span className="italic text-[#dcc197]">standard.</span>
            </h2>
          </div>
          <p className="md:col-span-5 text-[#a39b92] text-sm md:text-base leading-relaxed">
            The same in-house team that walks the property writes its title
            opinion and negotiates its terms. Nothing is outsourced. Nothing is
            commoditised.
          </p>
        </div>

        {/* Bento grid — asymmetric */}
        <div className="grid md:grid-cols-12 gap-5 md:gap-6">
          <Tile className="md:col-span-7 md:row-span-2 min-h-[300px]">
            <ScrollText size={26} className="text-[#c89b5f]" strokeWidth={1.2} />
            <h3 className="mt-8 font-serif-display text-3xl md:text-4xl text-[#f5f0ea] leading-tight">
              Title-vetted, RERA registered, mother-deed audited.
            </h3>
            <p className="mt-5 text-[#a39b92] leading-relaxed max-w-xl">
              Every property we sell carries a written legal opinion from our
              in-house counsel — covering 30 years of title history, statutory
              approvals, encumbrance and litigation checks. We refuse mandates
              that cannot pass our own bar.
            </p>
            <div className="mt-8 inline-flex items-center gap-3 text-xs tracking-[0.3em] uppercase text-[#c89b5f]">
              <span className="w-8 h-px bg-[#c89b5f]" /> Diligence Stack
            </div>
          </Tile>

          <Tile className="md:col-span-5">
            <Compass size={24} className="text-[#c89b5f]" strokeWidth={1.2} />
            <h3 className="mt-6 font-serif-display text-2xl text-[#f5f0ea]">
              Bespoke property hunt
            </h3>
            <p className="mt-3 text-sm text-[#a39b92] leading-relaxed">
              We do not push inventory. We listen, then go and find — including
              off-market estates that never reach a public listing.
            </p>
          </Tile>

          <Tile className="md:col-span-5">
            <ShieldCheck size={24} className="text-[#c89b5f]" strokeWidth={1.2} />
            <h3 className="mt-6 font-serif-display text-2xl text-[#f5f0ea]">
              End-to-end transaction care
            </h3>
            <p className="mt-3 text-sm text-[#a39b92] leading-relaxed">
              Negotiation, structuring, stamp duty, registration, possession —
              one point of contact, zero loose ends.
            </p>
          </Tile>

          <Tile className="md:col-span-4">
            <Building2 size={22} className="text-[#c89b5f]" strokeWidth={1.2} />
            <h3 className="mt-6 font-serif-display text-xl text-[#f5f0ea]">
              Commercial leasing
            </h3>
            <p className="mt-3 text-sm text-[#a39b92] leading-relaxed">
              Grade-A office and high-street retail for founders and family
              offices.
            </p>
          </Tile>

          <Tile className="md:col-span-4">
            <Handshake size={22} className="text-[#c89b5f]" strokeWidth={1.2} />
            <h3 className="mt-6 font-serif-display text-xl text-[#f5f0ea]">
              NRI advisory
            </h3>
            <p className="mt-3 text-sm text-[#a39b92] leading-relaxed">
              FEMA-aware structuring, repatriation guidance, power-of-attorney
              execution.
            </p>
          </Tile>

          <Tile className="md:col-span-4">
            <LineChart size={22} className="text-[#c89b5f]" strokeWidth={1.2} />
            <h3 className="mt-6 font-serif-display text-xl text-[#f5f0ea]">
              Land banking
            </h3>
            <p className="mt-3 text-sm text-[#a39b92] leading-relaxed">
              Heritage land parcels in Karnataka, Telangana and Goa for
              long-horizon holders.
            </p>
          </Tile>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
