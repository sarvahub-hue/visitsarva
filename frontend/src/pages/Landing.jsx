import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  HeadphonesIcon,
  Ban,
  Home,
  Building2,
  Trees,
  Factory,
  Key,
  HardHat,
  FileCheck,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AISearchBar from "@/components/AISearchBar";
import PropertyCard from "@/components/PropertyCard";
import api from "@/api/client";
import { PROPERTY_CATEGORIES, SERVICE_TYPES } from "@/utils/format";

const HERO_BG =
  "https://images.unsplash.com/photo-1748063578185-3d68121b11ff?w=1920&auto=format&fit=crop&q=80";

const SECTOR_CARDS = [
  { value: "commercial", title: "Commercial", desc: "Offices, retail, pre-leased assets", Icon: Building2 },
  { value: "residential", title: "Residential", desc: "Villas, independent houses, builder floors", Icon: Home },
  { value: "plot", title: "Plots & Agriculture", desc: "DTCP-approved plots, farm land", Icon: Trees },
  { value: "apartment", title: "Apartments", desc: "1, 2, 3 BHK flats in gated communities", Icon: Building2 },
  { value: "industrial", title: "Industrial", desc: "Warehouses, factories, industrial land", Icon: Factory },
  { value: "rental", title: "Rentals", desc: "Furnished & semi-furnished homes for rent", Icon: Key },
  { value: "construction_interior", title: "Construction & Interiors", desc: "Build-to-spec, premium interiors", Icon: HardHat },
  { value: "services", title: "All-in-One Documents", desc: "Khata, valuation, conversions, approvals", Icon: FileCheck, link: "/services" },
];

const Landing = () => {
  const [featured, setFeatured] = useState([]);
  const [howTab, setHowTab] = useState("buyer");
  const [stats] = useState({
    properties: 1240,
    cities: 18,
    sellers: 320,
    buyers: 980,
  });

  useEffect(() => {
    api.get("/properties/featured").then(({ data }) => setFeatured(data || [])).catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-[#fafaf7]">
      <Navbar />

      {/* ===== HERO ===== */}
      <section
        id="hero"
        className="relative min-h-[88vh] flex items-center overflow-hidden"
        data-testid="hero-section"
      >
        <div className="absolute inset-0">
          <img
            src={HERO_BG}
            alt="VisitSarva — verified properties"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F2340]/85 via-[#0F2340]/65 to-[#0F2340]/30" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20 w-full">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="eyebrow text-[#7ec4b8] mb-5">
              Zero Brokerage · Verified Listings · Direct Contact
            </div>
            <h1 className="font-display font-bold text-white text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight">
              Find Your Dream Property.
              <br />
              <span className="text-[#7ec4b8]">Zero Brokerage.</span>
            </h1>
            <p className="mt-6 text-white/85 text-base md:text-lg leading-relaxed max-w-2xl">
              Buy property, pay no brokerage. We connect you directly to
              verified sellers across India — every listing is reviewed by our
              team before it goes live.
            </p>

            <div className="mt-8 max-w-2xl">
              <AISearchBar />
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {PROPERTY_CATEGORIES.slice(0, 6).map((c) => (
                <Link
                  key={c.value}
                  to={`/properties?category=${c.value}`}
                  data-testid={`hero-pill-${c.value}`}
                  className="chip bg-white/95 hover:bg-white border-white text-[#0F2340]"
                >
                  {c.label}
                </Link>
              ))}
              <Link
                to="/properties"
                className="chip bg-[#0D7A6B] text-white border-[#0D7A6B]"
              >
                All Categories <ArrowRight size={12} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== SECTOR CARDS ===== */}
      <section className="py-20 md:py-28" data-testid="sectors-section">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <div className="eyebrow mb-3">What We Offer</div>
            <h2 className="section-title">
              Eight sectors, one transparent platform.
            </h2>
            <p className="mt-4 text-[#5b6371]">
              Every category is curated, every listing vetted by our internal
              team. Browse what you need — or have our team find it for you.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
            {SECTOR_CARDS.map((s) => {
              const target = s.link || `/properties?category=${s.value}`;
              return (
                <Link
                  key={s.value}
                  to={target}
                  data-testid={`sector-card-${s.value}`}
                  className="card p-5 md:p-6 hover:border-[#0D7A6B] hover:-translate-y-0.5 transition-all"
                >
                  <s.Icon size={22} className="text-[#0D7A6B]" strokeWidth={1.5} />
                  <h3 className="mt-4 font-display font-semibold text-[#0F2340]">
                    {s.title}
                  </h3>
                  <p className="mt-1.5 text-xs text-[#5b6371] leading-relaxed">
                    {s.desc}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== FEATURED PROPERTIES ===== */}
      {featured.length > 0 && (
        <section className="py-16 md:py-20 bg-white border-y border-[#e6e4dd]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex items-end justify-between gap-4 flex-wrap mb-10">
              <div>
                <div className="eyebrow mb-2">Featured</div>
                <h2 className="section-title">Hand-picked listings.</h2>
              </div>
              <Link
                to="/properties"
                className="text-sm text-[#0D7A6B] hover:underline flex items-center gap-1"
                data-testid="view-all-featured"
              >
                View all <ArrowRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {featured.slice(0, 6).map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== BUYER / SELLER CARDS ===== */}
      <section className="py-20 md:py-28" data-testid="role-cta-section">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="eyebrow mb-3">Get Started</div>
            <h2 className="section-title">
              Buying or selling? Either way — zero brokerage for buyers.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5 md:gap-6">
            <RoleCard
              role="buyer"
              title="Are you a Buyer?"
              copy="Browse verified properties, contact sellers directly through our team. No brokerage, ever."
              points={["Verified listings only", "Direct team contact", "AI-powered smart search"]}
            />
            <RoleCard
              role="seller"
              title="Are you a Seller?"
              copy="List your property for free. Our team verifies and publishes it within 48 hours."
              points={["Free listing", "AI-assisted form filling", "Internal verification before going live"]}
              variant="navy"
            />
          </div>
        </div>
      </section>

      {/* ===== MOTIVE ===== */}
      <section id="motive" className="py-24 md:py-32 bg-[#0F2340] text-white relative overflow-hidden" data-testid="motive-section">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle at 30% 30%, #fff 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div className="relative max-w-5xl mx-auto px-6 lg:px-8 text-center">
          <div className="eyebrow text-[#7ec4b8] mb-5">Our Motive</div>
          <h2 className="font-display font-bold text-3xl md:text-5xl lg:text-6xl leading-tight tracking-tight">
            "Buy property,<br />
            <span className="text-[#7ec4b8]">pay no brokerage."</span>
          </h2>
          <p className="mt-8 text-white/80 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            We believe buying a home should be simple, transparent, and fair.
            No middlemen. No hidden fees. Just you, the seller, and us.
          </p>
          <div className="mt-14 grid sm:grid-cols-3 gap-6 text-left max-w-4xl mx-auto">
            <Pillar Icon={Ban} title="Zero Brokerage">
              Buyers pay nothing. We charge no commission on transactions.
            </Pillar>
            <Pillar Icon={ShieldCheck} title="Verified Listings Only">
              Every property is internally reviewed and approved before going live.
            </Pillar>
            <Pillar Icon={HeadphonesIcon} title="Direct Team Contact">
              Reach a human at VisitSarva — not a call centre, not a broker.
            </Pillar>
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="py-20 md:py-24 bg-white border-y border-[#e6e4dd]" data-testid="how-it-works">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-10">
            <div className="eyebrow mb-3">How It Works</div>
            <h2 className="section-title">Four steps from sign-up to keys.</h2>
          </div>
          <div className="flex justify-center gap-2 mb-12">
            <button
              data-testid="how-tab-buyer"
              onClick={() => setHowTab("buyer")}
              className={`chip ${howTab === "buyer" ? "chip-active" : ""}`}
            >
              For Buyers
            </button>
            <button
              data-testid="how-tab-seller"
              onClick={() => setHowTab("seller")}
              className={`chip ${howTab === "seller" ? "chip-active" : ""}`}
            >
              For Sellers
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            {(howTab === "buyer"
              ? [
                  ["Sign Up", "Create a free buyer account in 30 seconds."],
                  ["Search & Browse", "Use AI smart search or filters to find your match."],
                  ["Save & Enquire", "Shortlist favourites and send an enquiry."],
                  ["Our Team Connects You", "We coordinate directly between you and the seller."],
                ]
              : [
                  ["Sign Up", "Create a free seller account."],
                  ["List Your Property", "Our AI assistant fills the form from your description."],
                  ["Team Verifies", "We audit the listing within 48 hours."],
                  ["Property Goes Live", "Verified listings appear to buyers across India."],
                ]
            ).map(([title, body], i) => (
              <div key={title} className="relative">
                <div className="w-10 h-10 rounded-full bg-[#0D7A6B] text-white flex items-center justify-center font-display font-semibold">
                  {i + 1}
                </div>
                <h3 className="mt-4 font-display font-semibold text-[#0F2340]">{title}</h3>
                <p className="mt-2 text-sm text-[#5b6371] leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section id="services" className="py-20 md:py-28" data-testid="services-section">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <div className="eyebrow mb-3">Property Services</div>
            <h2 className="section-title">All-in-One Documents.</h2>
            <p className="mt-4 text-[#5b6371]">
              Everything property-related under one roof — registration,
              valuation, conversions, approvals.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICE_TYPES.map((s) => (
              <div key={s.value} className="card p-6 flex flex-col" data-testid={`service-card-${s.value}`}>
                <FileCheck size={20} className="text-[#0D7A6B]" strokeWidth={1.5} />
                <h3 className="mt-4 font-display font-semibold text-[#0F2340]">{s.label}</h3>
                <p className="mt-2 text-sm text-[#5b6371] flex-1">
                  Talk to our specialist team — paperwork handled end-to-end.
                </p>
                <Link
                  to="/services"
                  className="mt-5 text-sm text-[#0D7A6B] hover:underline flex items-center gap-1"
                >
                  Request Service <ArrowRight size={13} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="py-16 bg-[#0F2340] text-white" data-testid="stats-section">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            [stats.properties, "Properties Listed"],
            [stats.cities, "Cities Covered"],
            [stats.sellers, "Verified Sellers"],
            [stats.buyers, "Happy Buyers"],
          ].map(([n, label]) => (
            <div key={label} className="text-center md:text-left">
              <div className="font-display text-4xl md:text-5xl font-bold text-[#7ec4b8]">
                {n.toLocaleString("en-IN")}+
              </div>
              <div className="mt-2 text-xs uppercase tracking-[0.18em] text-white/70">
                {label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <div className="eyebrow mb-3">Customer Stories</div>
            <h2 className="section-title">From the people who trusted us.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                name: "Arjun Mehra",
                role: "Buyer, Bangalore",
                text: "Found my 3 BHK in Whitefield in two weeks — and paid zero brokerage. The team handled everything.",
              },
              {
                name: "Kavya Iyer",
                role: "Seller, Hyderabad",
                text: "The AI listing form did half my work. Property was live in 3 days, sold in 6 weeks.",
              },
              {
                name: "Rohit Bhandari",
                role: "Buyer, Pune",
                text: "What I loved most: a real person from VisitSarva calling me back, not a broker chasing commission.",
              },
            ].map((t) => (
              <div key={t.name} className="card p-6">
                <div className="flex gap-0.5 text-[#0D7A6B]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <p className="mt-4 text-[#1a1f2e] leading-relaxed">"{t.text}"</p>
                <div className="mt-5 pt-4 border-t border-[#e6e4dd]">
                  <div className="font-display font-semibold text-[#0F2340]">{t.name}</div>
                  <div className="text-xs text-[#5b6371]">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

const RoleCard = ({ role, title, copy, points, variant = "teal" }) => {
  const isNavy = variant === "navy";
  return (
    <div
      data-testid={`role-card-${role}`}
      className={`relative p-8 md:p-10 rounded-xl border ${
        isNavy ? "bg-[#0F2340] text-white border-[#0F2340]" : "bg-white border-[#e6e4dd]"
      }`}
    >
      <h3 className={`font-display text-2xl md:text-3xl font-bold ${isNavy ? "text-white" : "text-[#0F2340]"}`}>
        {title}
      </h3>
      <p className={`mt-3 text-sm md:text-base leading-relaxed ${isNavy ? "text-white/80" : "text-[#5b6371]"}`}>
        {copy}
      </p>
      <ul className="mt-5 space-y-2 text-sm">
        {points.map((p) => (
          <li key={p} className="flex items-center gap-2.5">
            <CheckCircle2 size={15} className={isNavy ? "text-[#7ec4b8]" : "text-[#0D7A6B]"} />
            {p}
          </li>
        ))}
      </ul>
      <div className="mt-7 flex flex-wrap gap-3">
        <Link
          to={`/register?role=${role}`}
          data-testid={`role-${role}-signup`}
          className={isNavy ? "btn-primary bg-[#7ec4b8] !text-[#0F2340] hover:bg-[#9ed5cb]" : "btn-primary"}
        >
          Sign Up as {role === "buyer" ? "Buyer" : "Seller"}
        </Link>
        <Link
          to="/login"
          data-testid={`role-${role}-login`}
          className={isNavy ? "btn-outline !bg-transparent !text-white !border-white/40 hover:!border-white" : "btn-outline"}
        >
          Login
        </Link>
      </div>
    </div>
  );
};

const Pillar = ({ Icon, title, children }) => (
  <div>
    <Icon size={28} className="text-[#7ec4b8]" strokeWidth={1.5} />
    <h4 className="mt-4 font-display text-xl font-semibold">{title}</h4>
    <p className="mt-2 text-sm text-white/75 leading-relaxed">{children}</p>
  </div>
);

export default Landing;
