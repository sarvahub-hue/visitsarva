import React from "react";
import { motion } from "framer-motion";
import { ABOUT } from "@/constants/testIds";

const ABOUT_IMG =
  "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxODl8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB2aWxsYSUyMG1vZGVybiUyMGV2ZW5pbmd8ZW58MHx8fHwxNzgwNjUwNjA4fDA&ixlib=rb-4.1.0&q=85";

const About = () => {
  return (
    <section
      id="about"
      data-testid={ABOUT.root}
      className="relative py-24 md:py-32 bg-[#0a0908]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Left column — visual */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9 }}
            className="lg:col-span-5 lg:sticky lg:top-32"
          >
            <div className="relative aspect-[3/4] overflow-hidden border border-[#2a2623]">
              <img
                src={ABOUT_IMG}
                alt="Sarvabhoomi heritage"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-[#f5f0ea]">
                <div className="text-overline mb-2">Sanskrit · Sarva-bhoomi</div>
                <div className="font-serif-display italic text-2xl leading-snug">
                  "All lands — held in trust."
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right column — text */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="lg:col-span-7"
          >
            <div className="text-overline mb-4">About the House</div>
            <h2 className="font-serif-display font-light text-4xl md:text-5xl lg:text-6xl text-[#f5f0ea] leading-tight">
              Eighteen years of building{" "}
              <span className="italic text-[#dcc197]">quiet</span> confidence in
              Indian real estate.
            </h2>

            <div className="mt-10 space-y-6 text-[#a39b92] leading-relaxed max-w-2xl">
              <p>
                Founded in 2007 in Bangalore, Sarvabhoomi Realty Group began as
                a single-family land advisory and has grown into one of India's
                most considered names in private real estate. We work
                deliberately — fewer transactions, deeper diligence, longer
                client relationships.
              </p>
              <p>
                Today our offices span Bangalore, Hyderabad, Pune and Goa.
                Whether you are buying a villa for your family, an income asset
                for your portfolio, or a tract of land to hold for the next
                generation, our role is the same: to be the calm, well-informed
                voice in the room.
              </p>
            </div>

            <div className="hairline my-10" />

            {/* Three pillars */}
            <div className="grid sm:grid-cols-3 gap-8">
              {[
                {
                  k: "Discretion",
                  v: "Private mandates. Names never leave the room.",
                },
                {
                  k: "Diligence",
                  v: "In-house legal + structural audits on every listing.",
                },
                {
                  k: "Endurance",
                  v: "We pick assets that compound over decades.",
                },
              ].map((p) => (
                <div key={p.k}>
                  <div className="font-serif-display text-xl text-[#dcc197]">
                    {p.k}
                  </div>
                  <p className="text-sm text-[#a39b92] mt-2 leading-relaxed">
                    {p.v}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
