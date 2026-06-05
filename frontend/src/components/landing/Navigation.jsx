import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "@/components/landing/Logo";
import { NAV } from "@/constants/testIds";

const links = [
  { id: "properties", label: "Properties", testid: NAV.linkProperties },
  { id: "about", label: "About", testid: NAV.linkAbout },
  { id: "services", label: "Services", testid: NAV.linkServices },
  { id: "contact", label: "Contact", testid: NAV.linkContact },
];

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (id) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      data-testid={NAV.root}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/70 backdrop-blur-2xl border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
        <button
          onClick={() => handleNav("hero")}
          data-testid={NAV.logo}
          className="flex items-center gap-3 group"
        >
          <Logo size={34} />
          <div className="text-left leading-tight">
            <div className="font-serif-display text-xl text-[#f5f0ea] tracking-wide">
              Sarvabhoomi
            </div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-[#c89b5f]">
              Realty Group
            </div>
          </div>
        </button>

        <nav className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <button
              key={l.id}
              data-testid={l.testid}
              onClick={() => handleNav(l.id)}
              className="text-sm tracking-wide text-[#a39b92] hover:text-[#f5f0ea] transition-colors duration-300 relative group"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#c89b5f] group-hover:w-full transition-all duration-500" />
            </button>
          ))}
        </nav>

        <button
          data-testid={NAV.ctaConsult}
          onClick={() => handleNav("contact")}
          className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 bg-[#c89b5f] text-[#0a0908] text-sm font-medium tracking-wide hover:bg-[#dcc197] transition-colors duration-300"
        >
          Book Consultation
        </button>

        <button
          data-testid={NAV.mobileToggle}
          onClick={() => setOpen((s) => !s)}
          className="md:hidden text-[#f5f0ea]"
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-black/95 backdrop-blur-xl border-t border-white/5">
          <div className="px-6 py-6 flex flex-col gap-5">
            {links.map((l) => (
              <button
                key={l.id}
                onClick={() => handleNav(l.id)}
                className="text-left text-base text-[#f5f0ea]"
              >
                {l.label}
              </button>
            ))}
            <button
              onClick={() => handleNav("contact")}
              className="mt-2 px-4 py-3 bg-[#c89b5f] text-[#0a0908] text-sm font-medium"
            >
              Book Consultation
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navigation;
