import React, { useState } from "react";
import axios from "axios";
import { Search, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { SEARCH } from "@/constants/testIds";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const TYPES = [
  { value: "all", label: "All Categories" },
  { value: "residential", label: "Residential" },
  { value: "commercial", label: "Commercial" },
  { value: "plots", label: "Plots & Land" },
];
const CITIES = ["", "Bangalore", "Hyderabad", "Pune", "Coorg", "Goa"];
const BHKS = ["any", "3 BHK", "4 BHK", "5 BHK", "Plot", "Open Floor"];

const PropertySearch = () => {
  const [type, setType] = useState("all");
  const [city, setCity] = useState("");
  const [bhk, setBhk] = useState("any");
  const [budget, setBudget] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(`${API}/properties/search`, {
        property_type: type,
        city: city || null,
        bhk,
        budget: budget || null,
      });
      setResults(data);
      toast.success(
        `${data.count} ${data.count === 1 ? "property" : "properties"} found`
      );
    } catch (err) {
      toast.error("Could not fetch results. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="search"
      data-testid={SEARCH.root}
      className="relative py-20 md:py-28 bg-[#0a0908]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="grid md:grid-cols-12 gap-8 items-end mb-10"
        >
          <div className="md:col-span-7">
            <div className="text-overline mb-4">Find your address</div>
            <h2 className="font-serif-display font-light text-4xl md:text-5xl text-[#f5f0ea] leading-tight">
              A search built for{" "}
              <span className="italic text-[#dcc197]">discerning buyers.</span>
            </h2>
          </div>
          <p className="md:col-span-5 text-[#a39b92] text-sm leading-relaxed">
            Filter by purpose, geography and configuration. Every listing we
            surface is title-vetted by our in-house legal team — so what you see
            is what you can actually own.
          </p>
        </motion.div>

        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="bg-[#14110f] border border-[#2a2623] p-6 md:p-8 grid md:grid-cols-12 gap-4"
        >
          <Field label="Category">
            <select
              data-testid={SEARCH.selectType}
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="sb-input"
            >
              {TYPES.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </Field>

          <Field label="City">
            <select
              data-testid={SEARCH.selectCity}
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="sb-input"
            >
              {CITIES.map((c) => (
                <option key={c || "any"} value={c}>
                  {c || "Any city"}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Configuration">
            <select
              data-testid={SEARCH.selectBhk}
              value={bhk}
              onChange={(e) => setBhk(e.target.value)}
              className="sb-input"
            >
              {BHKS.map((b) => (
                <option key={b} value={b}>
                  {b === "any" ? "Any" : b}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Budget (INR)">
            <input
              data-testid={SEARCH.inputBudget}
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              placeholder="e.g. 3 Cr"
              className="sb-input"
            />
          </Field>

          <div className="md:col-span-12 flex justify-end pt-2">
            <button
              type="submit"
              data-testid={SEARCH.submit}
              disabled={loading}
              className="inline-flex items-center gap-3 px-7 py-4 bg-[#c89b5f] text-[#0a0908] text-sm tracking-wide font-medium hover:bg-[#dcc197] transition-colors disabled:opacity-60"
            >
              {loading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Search size={16} />
              )}
              Search Listings
            </button>
          </div>
        </motion.form>

        {results && (
          <div
            data-testid={SEARCH.results}
            className="mt-8 border-l-2 border-[#c89b5f] pl-5"
          >
            <div className="text-xs uppercase tracking-[0.3em] text-[#a39b92]">
              Result
            </div>
            <div
              data-testid={SEARCH.resultCount}
              className="font-serif-display text-2xl md:text-3xl text-[#f5f0ea] mt-2"
            >
              {results.count} matching {results.count === 1 ? "property" : "properties"}
              {city && <> in {city}</>}
            </div>
            {results.count > 0 && (
              <div className="mt-3 text-sm text-[#a39b92]">
                Scroll down to view featured listings, or book a consultation
                for our complete short-list.
              </div>
            )}
          </div>
        )}
      </div>

      <style>{`
        .sb-input {
          width: 100%;
          background: transparent;
          color: #f5f0ea;
          border: 1px solid #2a2623;
          padding: 0.85rem 1rem;
          font-size: 0.9rem;
          letter-spacing: 0.02em;
          outline: none;
          transition: border-color .3s ease, background .3s ease;
        }
        .sb-input:focus {
          border-color: #c89b5f;
          background: #0a0908;
        }
        .sb-input option { background: #14110f; color: #f5f0ea; }
      `}</style>
    </section>
  );
};

const Field = ({ label, children }) => (
  <label className="md:col-span-3 block">
    <span className="block text-[10px] uppercase tracking-[0.3em] text-[#a39b92] mb-2">
      {label}
    </span>
    {children}
  </label>
);

export default PropertySearch;
