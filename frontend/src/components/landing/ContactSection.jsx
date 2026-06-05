import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Loader2, Send, MapPin, Phone, Mail } from "lucide-react";
import { toast } from "sonner";
import { CONTACT } from "@/constants/testIds";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const INTERESTS = [
  { v: "residential", l: "Luxury Residence" },
  { v: "commercial", l: "Commercial / Investment" },
  { v: "plots", l: "Plots & Land" },
  { v: "general", l: "General Advisory" },
];

const ContactSection = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "residential",
    location: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) {
      toast.error("Please add your name, email and phone.");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API}/contact`, form);
      toast.success(
        "Thank you. An advisor will reach out within one business day."
      );
      setForm({
        name: "",
        email: "",
        phone: "",
        interest: "residential",
        location: "",
        message: "",
      });
    } catch (err) {
      const detail =
        err?.response?.data?.detail || "Could not send. Please try again.";
      toast.error(detail);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      data-testid={CONTACT.root}
      className="relative py-24 md:py-32 bg-[#0a0908]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left — copy & address */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5"
          >
            <div className="text-overline mb-4">Begin a conversation</div>
            <h2 className="font-serif-display font-light text-4xl md:text-5xl lg:text-6xl text-[#f5f0ea] leading-tight">
              Tell us what you are{" "}
              <span className="italic text-[#dcc197]">looking for.</span>
            </h2>
            <p className="mt-8 text-[#a39b92] leading-relaxed max-w-md">
              Share a few details and one of our advisors will respond within a
              business day — discreetly, and never from a call centre.
            </p>

            <div className="mt-12 space-y-6 text-sm">
              <Detail icon={MapPin} label="Principal Office">
                12th Floor, Prestige Atrium · MG Road, Bangalore 560001
              </Detail>
              <Detail icon={Phone} label="Advisory line">
                +91 80 4567 8900
              </Detail>
              <Detail icon={Mail} label="Mail">
                advisors@sarvabhoomirealty.in
              </Detail>
            </div>

            <div className="hairline mt-12" />
            <div className="mt-6 text-xs tracking-[0.25em] uppercase text-[#a39b92]">
              Mon — Sat · 10:00 to 19:00 IST
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.form
            onSubmit={submit}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="lg:col-span-7 bg-[#14110f] border border-[#2a2623] p-7 md:p-10"
          >
            <div className="grid sm:grid-cols-2 gap-6">
              <FormField label="Full name *">
                <input
                  data-testid={CONTACT.name}
                  className="sb-form"
                  value={form.name}
                  onChange={set("name")}
                  placeholder="Your name"
                />
              </FormField>
              <FormField label="Phone *">
                <input
                  data-testid={CONTACT.phone}
                  className="sb-form"
                  value={form.phone}
                  onChange={set("phone")}
                  placeholder="+91 98xx xxx xxx"
                />
              </FormField>
              <FormField label="Email *">
                <input
                  data-testid={CONTACT.email}
                  className="sb-form"
                  type="email"
                  value={form.email}
                  onChange={set("email")}
                  placeholder="you@example.com"
                />
              </FormField>
              <FormField label="Preferred city">
                <input
                  data-testid={CONTACT.location}
                  className="sb-form"
                  value={form.location}
                  onChange={set("location")}
                  placeholder="Bangalore, Hyderabad…"
                />
              </FormField>
              <FormField label="Interest" className="sm:col-span-2">
                <select
                  data-testid={CONTACT.interest}
                  className="sb-form"
                  value={form.interest}
                  onChange={set("interest")}
                >
                  {INTERESTS.map((i) => (
                    <option key={i.v} value={i.v}>
                      {i.l}
                    </option>
                  ))}
                </select>
              </FormField>
              <FormField label="A note to our advisor" className="sm:col-span-2">
                <textarea
                  data-testid={CONTACT.message}
                  className="sb-form min-h-[120px] resize-none"
                  value={form.message}
                  onChange={set("message")}
                  placeholder="Tell us about your requirement, budget range, timing…"
                />
              </FormField>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="text-[11px] tracking-[0.2em] uppercase text-[#a39b92]">
                Your details remain private to our advisory team.
              </div>
              <button
                type="submit"
                data-testid={CONTACT.submit}
                disabled={loading}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#c89b5f] text-[#0a0908] text-sm tracking-wide font-medium hover:bg-[#dcc197] transition-colors disabled:opacity-60"
              >
                {loading ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Send size={16} />
                )}
                Send Enquiry
              </button>
            </div>
          </motion.form>
        </div>
      </div>

      <style>{`
        .sb-form {
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
        .sb-form::placeholder { color: #6b665f; }
        .sb-form:focus { border-color: #c89b5f; background: #0a0908; }
        .sb-form option { background: #14110f; color: #f5f0ea; }
      `}</style>
    </section>
  );
};

const FormField = ({ label, children, className = "" }) => (
  <label className={`block ${className}`}>
    <span className="block text-[10px] uppercase tracking-[0.3em] text-[#a39b92] mb-2">
      {label}
    </span>
    {children}
  </label>
);

const Detail = ({ icon: Icon, label, children }) => (
  <div className="flex items-start gap-4">
    <span className="mt-1 w-9 h-9 border border-[#2a2623] flex items-center justify-center text-[#c89b5f]">
      <Icon size={15} />
    </span>
    <div>
      <div className="text-[10px] uppercase tracking-[0.3em] text-[#a39b92]">
        {label}
      </div>
      <div className="mt-1 text-[#f5f0ea]">{children}</div>
    </div>
  </div>
);

export default ContactSection;
