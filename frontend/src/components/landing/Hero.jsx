import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import { HERO } from "@/constants/testIds";

const HERO_IMG =
  "https://images.pexels.com/photos/31817157/pexels-photo-31817157.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1080&w=1920";

const Hero = () => {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      data-testid={HERO.root}
      className="relative min-h-[100vh] flex items-end overflow-hidden grain-overlay"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={HERO_IMG}
          alt="Sarvabhoomi luxury villa"
          className="w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/65 to-[#0a0908]" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-transparent" />
      </div>

      {/* Decorative corner mark */}
      <div className="absolute top-28 right-8 md:right-16 z-10 hidden md:block">
        <div className="text-right">
          <div className="text-[10px] tracking-[0.4em] text-[#c89b5f]/80 uppercase">
            Estd. 2007 — India
          </div>
          <div className="font-serif-display italic text-[#f5f0ea]/70 text-sm mt-1">
            sarvā · bhoomi
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl w-full mx-auto px-6 md:px-12 pb-24 md:pb-32 pt-32">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <div className="text-overline mb-6 flex items-center gap-3">
            <span className="block w-10 h-px bg-[#c89b5f]" />
            Curated real estate · Pan-India
          </div>

          <h1 className="font-serif-display font-light text-[#f5f0ea] text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.02] tracking-tight">
            Homes, addresses<br />
            and land that<br />
            <span className="italic text-[#dcc197]">outlast us.</span>
          </h1>

          <p className="mt-8 text-[#a39b92] text-base md:text-lg leading-relaxed max-w-xl tracking-wide">
            Sarvabhoomi Realty Group curates a small, deliberate portfolio of
            luxury residences, Grade-A commercial spaces and heritage land
            parcels across India — each vetted for legal title, design merit
            and long-term value.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.4 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <button
              data-testid={HERO.ctaPrimary}
              onClick={() => scrollTo("properties")}
              className="group inline-flex items-center gap-3 px-7 py-4 bg-[#c89b5f] text-[#0a0908] text-sm tracking-wide font-medium hover:bg-[#dcc197] transition-colors"
            >
              Explore Portfolio
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </button>
            <button
              data-testid={HERO.ctaSecondary}
              onClick={() => scrollTo("contact")}
              className="inline-flex items-center gap-3 px-7 py-4 border border-[#2a2623] hover:border-[#c89b5f] text-[#f5f0ea] text-sm tracking-wide transition-colors"
            >
              Speak to an Advisor
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.8 }}
            className="mt-16 flex flex-wrap items-center gap-x-8 gap-y-3 text-xs tracking-wider text-[#a39b92]"
          >
            <span className="flex items-center gap-2">
              <MapPin size={14} className="text-[#c89b5f]" />
              Bangalore · Hyderabad · Pune · Goa
            </span>
            <span className="hidden md:block w-px h-3 bg-[#2a2623]" />
            <span>RERA · Title Insured · Independently Advised</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 right-6 md:right-12 z-10 hidden md:flex flex-col items-center gap-3">
        <div className="text-[10px] tracking-[0.4em] text-[#a39b92] uppercase [writing-mode:vertical-rl]">
          Scroll
        </div>
        <div className="w-px h-12 bg-gradient-to-b from-[#c89b5f] to-transparent" />
      </div>
    </section>
  );
};

export default Hero;
