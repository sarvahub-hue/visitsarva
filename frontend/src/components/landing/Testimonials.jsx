import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { TESTIMONIALS as TIDS } from "@/constants/testIds";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const Testimonials = () => {
  const [items, setItems] = useState([]);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    axios
      .get(`${API}/testimonials`)
      .then(({ data }) => setItems(data))
      .catch(() => {});
  }, []);

  const total = items.length;
  const next = () => setIdx((i) => (i + 1) % total);
  const prev = () => setIdx((i) => (i - 1 + total) % total);

  if (!total) return null;
  const t = items[idx];

  return (
    <section
      data-testid={TIDS.root}
      className="relative py-24 md:py-32 bg-[#0a0908]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-12 gap-8 items-end mb-12">
          <div className="md:col-span-8">
            <div className="text-overline mb-4">In their words</div>
            <h2 className="font-serif-display font-light text-4xl md:text-5xl text-[#f5f0ea] leading-tight">
              Clients who quietly{" "}
              <span className="italic text-[#dcc197]">come back.</span>
            </h2>
          </div>
          <div className="md:col-span-4 flex md:justify-end gap-3">
            <button
              data-testid={TIDS.prev}
              onClick={prev}
              className="w-12 h-12 border border-[#2a2623] hover:border-[#c89b5f] text-[#f5f0ea] flex items-center justify-center transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              data-testid={TIDS.next}
              onClick={next}
              className="w-12 h-12 border border-[#2a2623] hover:border-[#c89b5f] text-[#f5f0ea] flex items-center justify-center transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-12 gap-10 md:gap-14 items-center">
          <div className="md:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden border border-[#2a2623]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={t.id}
                  src={t.image}
                  alt={t.name}
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>
          </div>

          <div className="md:col-span-7" data-testid={TIDS.item(t.id)}>
            <Quote size={40} className="text-[#c89b5f]" strokeWidth={1} />
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={t.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.6 }}
                className="mt-6 font-serif-display text-2xl md:text-3xl lg:text-4xl text-[#f5f0ea] leading-snug italic font-light"
              >
                "{t.quote}"
              </motion.blockquote>
            </AnimatePresence>

            <div className="mt-10 hairline" />

            <div className="mt-6 flex items-center justify-between">
              <div>
                <div className="font-serif-display text-xl text-[#dcc197]">
                  {t.name}
                </div>
                <div className="text-xs tracking-[0.2em] uppercase text-[#a39b92] mt-1">
                  {t.role} · {t.location}
                </div>
              </div>
              <div className="text-xs tracking-[0.3em] uppercase text-[#a39b92]">
                {String(idx + 1).padStart(2, "0")} /{" "}
                {String(total).padStart(2, "0")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
