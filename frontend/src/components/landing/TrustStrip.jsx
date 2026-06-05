import React from "react";

const items = [
  "RERA Approved",
  "Title Insured",
  "₹ 4,800 Cr+ Transacted",
  "18 Years of Practice",
  "Member · CREDAI",
  "Pan-India",
  "ISO 9001 : 2015",
  "Bespoke Advisory",
];

const TrustStrip = () => {
  const row = [...items, ...items];
  return (
    <section
      aria-label="Trust markers"
      className="relative border-y border-[#2a2623] bg-[#0a0908] py-5 overflow-hidden"
    >
      <div className="flex gap-16 whitespace-nowrap sb-marquee">
        {row.map((t, i) => (
          <span
            key={i}
            className="text-xs tracking-[0.3em] uppercase text-[#a39b92] flex items-center gap-16"
          >
            {t}
            <span className="w-1 h-1 bg-[#c89b5f] rounded-full" />
          </span>
        ))}
      </div>
    </section>
  );
};

export default TrustStrip;
