import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { ArrowUpRight, MapPin, Maximize2 } from "lucide-react";
import { PROPERTIES as TIDS } from "@/constants/testIds";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const FILTERS = [
  { id: "all", label: "All", testid: TIDS.filterAll },
  { id: "residential", label: "Residential", testid: TIDS.filterResidential },
  { id: "commercial", label: "Commercial", testid: TIDS.filterCommercial },
  { id: "plots", label: "Plots & Land", testid: TIDS.filterPlots },
];

const FeaturedProperties = () => {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    let mounted = true;
    axios
      .get(`${API}/properties`)
      .then(({ data }) => {
        if (mounted) setItems(data);
      })
      .catch(() => {});
    return () => {
      mounted = false;
    };
  }, []);

  const filtered = useMemo(
    () => (filter === "all" ? items : items.filter((p) => p.category === filter)),
    [items, filter]
  );

  const enquire = (id) => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="properties"
      data-testid={TIDS.root}
      className="relative py-24 md:py-32 bg-[#0a0908]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-12 gap-10 items-end mb-14">
          <div className="md:col-span-7">
            <div className="text-overline mb-4">The Portfolio</div>
            <h2 className="font-serif-display font-light text-4xl md:text-5xl lg:text-6xl text-[#f5f0ea] leading-tight">
              A short list, not a{" "}
              <span className="italic text-[#dcc197]">long catalogue.</span>
            </h2>
          </div>
          <div className="md:col-span-5 text-[#a39b92] text-sm md:text-base leading-relaxed">
            We carry a deliberate inventory across three categories. Each
            property is personally walked, photographed and legally audited by
            our advisors before it appears here.
          </div>
        </div>

        {/* Filter pills */}
        <div className="flex flex-wrap items-center gap-2 mb-10 border-b border-[#2a2623] pb-6">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              data-testid={f.testid}
              onClick={() => setFilter(f.id)}
              className={`px-5 py-2.5 text-xs tracking-[0.2em] uppercase transition-all duration-300 ${
                filter === f.id
                  ? "bg-[#c89b5f] text-[#0a0908]"
                  : "text-[#a39b92] hover:text-[#f5f0ea] border border-[#2a2623] hover:border-[#c89b5f]"
              }`}
            >
              {f.label}
            </button>
          ))}
          <div className="ml-auto text-xs tracking-[0.25em] uppercase text-[#a39b92]">
            {filtered.length} listings
          </div>
        </div>

        {/* Property cards — asymmetric grid */}
        <div className="grid md:grid-cols-12 gap-6 md:gap-8">
          {filtered.map((p, idx) => {
            const isHero = idx === 0;
            return (
              <motion.article
                key={p.id}
                data-testid={TIDS.card(p.id)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: idx * 0.08 }}
                className={`group relative border border-[#2a2623] bg-[#14110f] overflow-hidden ${
                  isHero ? "md:col-span-8 md:row-span-2" : "md:col-span-4"
                }`}
              >
                <div
                  className={`relative overflow-hidden ${
                    isHero ? "h-[420px] md:h-[560px]" : "h-[280px]"
                  }`}
                >
                  <img
                    src={p.image}
                    alt={p.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                  <span className="absolute top-4 left-4 text-[10px] tracking-[0.25em] uppercase bg-[#0a0908]/80 backdrop-blur text-[#c89b5f] px-3 py-1.5 border border-[#c89b5f]/30">
                    {p.tag}
                  </span>
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-7">
                    <div className="flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-[#c89b5f] mb-3">
                      <MapPin size={12} /> {p.location}
                    </div>
                    <h3
                      className={`font-serif-display text-[#f5f0ea] leading-tight ${
                        isHero ? "text-3xl md:text-4xl" : "text-xl md:text-2xl"
                      }`}
                    >
                      {p.title}
                    </h3>
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-4 text-xs text-[#a39b92]">
                        <span>{p.bhk}</span>
                        <span className="w-1 h-1 bg-[#c89b5f] rounded-full" />
                        <span className="flex items-center gap-1.5">
                          <Maximize2 size={11} /> {p.area}
                        </span>
                      </div>
                      <div className="font-serif-display text-lg md:text-xl text-[#dcc197]">
                        {p.price}
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  data-testid={TIDS.enquire(p.id)}
                  onClick={() => enquire(p.id)}
                  className="w-full px-6 py-4 flex items-center justify-between text-xs tracking-[0.25em] uppercase text-[#f5f0ea] hover:bg-[#c89b5f] hover:text-[#0a0908] transition-colors duration-300 border-t border-[#2a2623]"
                >
                  Enquire privately
                  <ArrowUpRight size={14} />
                </button>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
