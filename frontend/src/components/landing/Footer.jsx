import React from "react";
import { Instagram, Linkedin, Facebook, Youtube } from "lucide-react";
import Logo from "@/components/landing/Logo";
import { FOOTER } from "@/constants/testIds";

const columns = [
  {
    title: "Portfolio",
    links: ["Luxury Residences", "Commercial", "Plots & Land", "Off-Market"],
  },
  {
    title: "House",
    links: ["About", "Leadership", "Press", "Careers"],
  },
  {
    title: "Cities",
    links: ["Bangalore", "Hyderabad", "Pune", "Goa"],
  },
];

const Footer = () => {
  return (
    <footer
      data-testid={FOOTER.root}
      className="relative bg-[#0a0908] border-t border-[#2a2623] pt-20 pb-10"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <Logo size={38} />
              <div className="leading-tight">
                <div className="font-serif-display text-2xl text-[#f5f0ea]">
                  Sarvabhoomi
                </div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-[#c89b5f]">
                  Realty Group
                </div>
              </div>
            </div>
            <p className="mt-6 text-[#a39b92] leading-relaxed max-w-sm text-sm">
              Bespoke real estate advisory across India's most considered
              addresses. Founded 2007.
            </p>

            <div className="mt-8 flex items-center gap-3">
              {[Instagram, Linkedin, Facebook, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 border border-[#2a2623] hover:border-[#c89b5f] flex items-center justify-center text-[#a39b92] hover:text-[#c89b5f] transition-colors"
                  aria-label="social"
                >
                  <Icon size={15} strokeWidth={1.4} />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title} className="md:col-span-2">
              <div className="text-[10px] uppercase tracking-[0.3em] text-[#c89b5f] mb-5">
                {col.title}
              </div>
              <ul className="space-y-3 text-sm">
                {col.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-[#a39b92] hover:text-[#f5f0ea] transition-colors"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="md:col-span-1">
            <div className="text-[10px] uppercase tracking-[0.3em] text-[#c89b5f] mb-5">
              Legal
            </div>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="text-[#a39b92] hover:text-[#f5f0ea]">RERA</a></li>
              <li><a href="#" className="text-[#a39b92] hover:text-[#f5f0ea]">Privacy</a></li>
              <li><a href="#" className="text-[#a39b92] hover:text-[#f5f0ea]">Terms</a></li>
            </ul>
          </div>
        </div>

        <div className="hairline mt-16" />

        <div className="mt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs tracking-wide text-[#a39b92]">
          <div>
            © {new Date().getFullYear()} Sarvabhoomi Realty Group LLP. All rights reserved.
          </div>
          <div className="text-[11px] tracking-[0.25em] uppercase">
            RERA: KA/AGT/SRG/2007/00128
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
