import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { STATS } from "@/constants/testIds";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const fallback = {
  years: 18,
  properties_handled: 1240,
  happy_families: 980,
  cities: 12,
};

const items = [
  { key: "years", label: "Years of practice", suffix: "+" },
  { key: "properties_handled", label: "Properties advised", suffix: "+" },
  { key: "happy_families", label: "Families served", suffix: "+" },
  { key: "cities", label: "Cities present", suffix: "" },
];

const Counter = ({ value, suffix }) => {
  const [n, setN] = useState(0);
  useEffect(() => {
    let frame = 0;
    const total = 60;
    const step = () => {
      frame += 1;
      const eased = 1 - Math.pow(1 - frame / total, 3);
      setN(Math.round(value * eased));
      if (frame < total) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [value]);
  return (
    <span className="font-serif-display text-5xl md:text-6xl lg:text-7xl text-[#f5f0ea] tracking-tight">
      {n.toLocaleString("en-IN")}
      <span className="text-[#c89b5f]">{suffix}</span>
    </span>
  );
};

const Stats = () => {
  const [data, setData] = useState(fallback);
  useEffect(() => {
    axios
      .get(`${API}/stats`)
      .then(({ data }) => setData(data))
      .catch(() => {});
  }, []);

  return (
    <section
      data-testid={STATS.root}
      className="relative py-24 md:py-28 bg-[#14110f] border-y border-[#2a2623]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-overline mb-10">By the numbers</div>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.12 } },
          }}
          className="grid grid-cols-2 md:grid-cols-4 border-l border-t border-[#2a2623]"
        >
          {items.map((item) => (
            <motion.div
              key={item.key}
              variants={{
                hidden: { opacity: 0, y: 24 },
                show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
              }}
              className="border-r border-b border-[#2a2623] p-8 md:p-10"
            >
              <Counter value={data[item.key] ?? fallback[item.key]} suffix={item.suffix} />
              <div className="mt-4 text-xs tracking-[0.25em] uppercase text-[#a39b92]">
                {item.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Stats;
