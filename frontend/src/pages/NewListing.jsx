import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Sparkles, Send, Loader2, ImagePlus, X as XIcon, ArrowLeft, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import api from "@/api/client";
import { PROPERTY_CATEGORIES } from "@/utils/format";

const AREA_UNITS = ["sqft", "sqm", "acre", "cent", "guntha"];

const emptyForm = {
  title: "",
  description: "",
  category: "residential",
  sub_category: "",
  price: "",
  price_negotiable: false,
  bedrooms: "",
  bathrooms: "",
  floors: "",
  facing: "",
  furnishing: "",
  amenities_text: "",
  features_text: "",
  location: { address: "", city: "", state: "", pincode: "" },
  area: { size: "", unit: "sqft" },
  images: [], // [{url}]
};

const NewListing = () => {
  const [form, setForm] = useState(emptyForm);
  const [history, setHistory] = useState([
    {
      role: "assistant",
      content:
        "Hi! I'm here to help you list your property quickly. Tell me — what kind of property are you listing, where is it located, and what's the asking price? You can also describe area, bedrooms, amenities — anything you remember.",
    },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const sessionIdRef = useRef("listing-" + Math.random().toString(36).slice(2));
  const chatBoxRef = useRef(null);
  const imageInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [history, chatLoading]);

  const mergeAi = (extracted) => {
    if (!extracted) return;
    setForm((prev) => {
      const next = { ...prev };
      const set = (key, val) => {
        if (val === undefined || val === null || val === "" || val === 0) return;
        next[key] = val;
      };
      set("title", extracted.title);
      set("description", extracted.description);
      set("category", extracted.category);
      set("sub_category", extracted.sub_category);
      set("price", extracted.price);
      if (typeof extracted.price_negotiable === "boolean")
        next.price_negotiable = extracted.price_negotiable;
      set("bedrooms", extracted.bedrooms);
      set("bathrooms", extracted.bathrooms);
      set("floors", extracted.floors);
      set("facing", extracted.facing);
      set("furnishing", extracted.furnishing);
      if (Array.isArray(extracted.amenities) && extracted.amenities.length)
        next.amenities_text = extracted.amenities.join(", ");
      if (Array.isArray(extracted.features) && extracted.features.length)
        next.features_text = extracted.features.join(", ");
      if (extracted.location && typeof extracted.location === "object") {
        next.location = { ...next.location };
        for (const k of ["address", "city", "state", "pincode"]) {
          if (extracted.location[k]) next.location[k] = extracted.location[k];
        }
      }
      if (extracted.area && typeof extracted.area === "object") {
        next.area = { ...next.area };
        if (extracted.area.size) next.area.size = extracted.area.size;
        if (extracted.area.unit) next.area.unit = extracted.area.unit;
      }
      return next;
    });
  };

  const sendChat = async (e) => {
    e?.preventDefault?.();
    const msg = chatInput.trim();
    if (!msg) return;
    setChatInput("");
    setHistory((h) => [...h, { role: "user", content: msg }]);
    setChatLoading(true);
    try {
      const { data } = await api.post("/ai/listing-assistant", {
        session_id: sessionIdRef.current,
        message: msg,
        history: history.slice(-8),
      });
      setHistory((h) => [...h, { role: "assistant", content: data.reply || "Got it." }]);
      mergeAi(data.extracted);
    } catch (err) {
      setHistory((h) => [
        ...h,
        {
          role: "assistant",
          content:
            "Sorry, I'm having trouble responding right now. You can still fill the form manually.",
        },
      ]);
    } finally {
      setChatLoading(false);
    }
  };

  // ---- form helpers ----
  const setField = (k) => (e) => setForm((s) => ({ ...s, [k]: e.target.value }));
  const setLoc = (k) => (e) =>
    setForm((s) => ({ ...s, location: { ...s.location, [k]: e.target.value } }));
  const setArea = (k) => (e) =>
    setForm((s) => ({ ...s, area: { ...s.area, [k]: e.target.value } }));

  const addImageFromFile = async (file) => {
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image too large (max 5MB)");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setForm((s) => ({
        ...s,
        images: [...s.images, { url: reader.result }],
      }));
    };
    reader.readAsDataURL(file);
  };

  const removeImage = (idx) => {
    setForm((s) => ({ ...s, images: s.images.filter((_, i) => i !== idx) }));
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.price || !form.area.size) {
      toast.error("Title, price and area are required");
      return;
    }
    setSubmitting(true);
    try {
      const payload = {
        title: form.title.trim(),
        description: form.description,
        category: form.category,
        sub_category: form.sub_category || null,
        price: Number(form.price),
        price_negotiable: !!form.price_negotiable,
        bedrooms: form.bedrooms ? Number(form.bedrooms) : null,
        bathrooms: form.bathrooms ? Number(form.bathrooms) : null,
        floors: form.floors ? Number(form.floors) : null,
        facing: form.facing || null,
        furnishing: form.furnishing || null,
        amenities: form.amenities_text
          ? form.amenities_text.split(",").map((s) => s.trim()).filter(Boolean)
          : [],
        features: form.features_text
          ? form.features_text.split(",").map((s) => s.trim()).filter(Boolean)
          : [],
        location: form.location,
        area: { size: Number(form.area.size), unit: form.area.unit },
        images: form.images,
      };
      await api.post("/seller/properties", payload);
      toast.success("Listing submitted for verification!");
      navigate("/seller/dashboard");
    } catch (err) {
      toast.error(err?.response?.data?.detail || "Could not submit listing");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafaf7]">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
        <button
          onClick={() => navigate("/seller/dashboard")}
          className="inline-flex items-center gap-2 text-sm text-[#5b6371] hover:text-[#0D7A6B]"
        >
          <ArrowLeft size={14} /> Back to dashboard
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-12 gap-6 pb-16">
        {/* ===== AI CHATBOT ===== */}
        <aside className="lg:col-span-5 order-2 lg:order-1">
          <div className="card flex flex-col h-[78vh] sticky top-24">
            <div className="px-5 py-4 border-b border-[#e6e4dd] flex items-center gap-2 bg-[#0F2340] text-white rounded-t-lg">
              <Sparkles size={18} className="text-[#7ec4b8]" />
              <div>
                <div className="font-display font-semibold text-sm">AI Listing Assistant</div>
                <div className="text-[10px] tracking-wider uppercase text-white/70">
                  Powered by Claude · auto-fills form
                </div>
              </div>
            </div>
            <div ref={chatBoxRef} className="flex-1 overflow-y-auto px-5 py-4 space-y-3" data-testid="ai-chat-box">
              {history.map((m, i) => (
                <div
                  key={i}
                  className={`max-w-[85%] text-sm ${
                    m.role === "user"
                      ? "ml-auto bg-[#0D7A6B] text-white"
                      : "bg-[#fafaf7] text-[#1a1f2e] border border-[#e6e4dd]"
                  } px-3.5 py-2.5 rounded-lg leading-relaxed whitespace-pre-line`}
                >
                  {m.content}
                </div>
              ))}
              {chatLoading && (
                <div className="text-sm text-[#5b6371] flex items-center gap-2">
                  <Loader2 size={14} className="animate-spin" /> Assistant is thinking…
                </div>
              )}
            </div>
            <form onSubmit={sendChat} className="border-t border-[#e6e4dd] p-3 flex items-center gap-2">
              <input
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Describe your property…"
                className="input-field !py-2 flex-1"
                data-testid="ai-chat-input"
              />
              <button
                type="submit"
                disabled={chatLoading || !chatInput.trim()}
                className="btn-primary !py-2 !px-3"
                data-testid="ai-chat-send"
              >
                {chatLoading ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
              </button>
            </form>
          </div>
        </aside>

        {/* ===== FORM ===== */}
        <form onSubmit={submit} className="lg:col-span-7 order-1 lg:order-2 space-y-5" data-testid="new-listing-form">
          <div className="card p-6">
            <div className="eyebrow mb-2">New Listing</div>
            <h1 className="font-display text-2xl font-bold text-[#0F2340]">
              Describe your property
            </h1>
            <p className="mt-1 text-sm text-[#5b6371]">
              Chat with the AI on the left and watch this form auto-fill. You can edit anything before submitting.
            </p>
          </div>

          <Block title="Basics">
            <Row>
              <Field label="Title *">
                <input className="input-field" required value={form.title} onChange={setField("title")} placeholder="e.g. 3 BHK Garden Apartment — Whitefield" data-testid="listing-title" />
              </Field>
            </Row>
            <Row>
              <Field label="Category *">
                <select className="input-field" value={form.category} onChange={setField("category")} data-testid="listing-category">
                  {PROPERTY_CATEGORIES.map((c) => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
              </Field>
              <Field label="Sub-category">
                <input className="input-field" value={form.sub_category} onChange={setField("sub_category")} placeholder="e.g. 3 BHK, Villa, Office, Plot" />
              </Field>
            </Row>
            <Row>
              <Field label="Description">
                <textarea className="input-field min-h-[110px]" value={form.description} onChange={setField("description")} placeholder="Tell buyers about the property…" data-testid="listing-description" />
              </Field>
            </Row>
          </Block>

          <Block title="Pricing & Area">
            <Row>
              <Field label="Price (INR) *">
                <input className="input-field" type="number" required value={form.price} onChange={setField("price")} placeholder="e.g. 14500000" data-testid="listing-price" />
              </Field>
              <Field label="Negotiable">
                <label className="flex items-center gap-2 mt-2">
                  <input
                    type="checkbox"
                    checked={form.price_negotiable}
                    onChange={(e) => setForm((s) => ({ ...s, price_negotiable: e.target.checked }))}
                  />
                  <span className="text-sm">Yes, open to negotiation</span>
                </label>
              </Field>
            </Row>
            <Row>
              <Field label="Area size *">
                <input className="input-field" type="number" required value={form.area.size} onChange={setArea("size")} placeholder="e.g. 1850" data-testid="listing-area-size" />
              </Field>
              <Field label="Unit">
                <select className="input-field" value={form.area.unit} onChange={setArea("unit")} data-testid="listing-area-unit">
                  {AREA_UNITS.map((u) => (
                    <option key={u} value={u}>{u}</option>
                  ))}
                </select>
              </Field>
            </Row>
          </Block>

          <Block title="Configuration">
            <Row>
              <Field label="Bedrooms"><input className="input-field" type="number" value={form.bedrooms} onChange={setField("bedrooms")} /></Field>
              <Field label="Bathrooms"><input className="input-field" type="number" value={form.bathrooms} onChange={setField("bathrooms")} /></Field>
              <Field label="Floors"><input className="input-field" type="number" value={form.floors} onChange={setField("floors")} /></Field>
            </Row>
            <Row>
              <Field label="Facing"><input className="input-field" value={form.facing} onChange={setField("facing")} placeholder="e.g. East" /></Field>
              <Field label="Furnishing">
                <select className="input-field" value={form.furnishing} onChange={setField("furnishing")}>
                  <option value="">—</option>
                  <option>Unfurnished</option>
                  <option>Semi-furnished</option>
                  <option>Furnished</option>
                </select>
              </Field>
            </Row>
          </Block>

          <Block title="Location">
            <Row>
              <Field label="Address"><input className="input-field" value={form.location.address} onChange={setLoc("address")} data-testid="listing-address" /></Field>
            </Row>
            <Row>
              <Field label="City"><input className="input-field" value={form.location.city} onChange={setLoc("city")} data-testid="listing-city" /></Field>
              <Field label="State"><input className="input-field" value={form.location.state} onChange={setLoc("state")} /></Field>
              <Field label="Pincode"><input className="input-field" value={form.location.pincode} onChange={setLoc("pincode")} /></Field>
            </Row>
          </Block>

          <Block title="Amenities & Features">
            <Row>
              <Field label="Amenities (comma separated)">
                <input className="input-field" value={form.amenities_text} onChange={setField("amenities_text")} placeholder="Swimming Pool, Gym, Lift" />
              </Field>
            </Row>
            <Row>
              <Field label="Features (comma separated)">
                <input className="input-field" value={form.features_text} onChange={setField("features_text")} placeholder="RERA Approved, Park Facing" />
              </Field>
            </Row>
          </Block>

          <Block title="Images">
            <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
              {form.images.map((img, i) => (
                <div key={i} className="relative aspect-[4/3] rounded overflow-hidden border border-[#e6e4dd]">
                  <img src={img.url} alt="" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    className="absolute top-1.5 right-1.5 bg-black/70 text-white rounded-full p-1"
                    aria-label="Remove image"
                  >
                    <XIcon size={12} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => imageInputRef.current?.click()}
                className="aspect-[4/3] border-2 border-dashed border-[#e6e4dd] hover:border-[#0D7A6B] rounded flex flex-col items-center justify-center gap-1 text-[#5b6371] hover:text-[#0D7A6B]"
                data-testid="add-image-btn"
              >
                <ImagePlus size={20} />
                <span className="text-xs">Add image</span>
              </button>
              <input
                ref={imageInputRef}
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) addImageFromFile(f);
                  e.target.value = "";
                }}
              />
            </div>
            <p className="mt-2 text-xs text-[#5b6371]">JPG / PNG / WebP up to 5 MB each.</p>
          </Block>

          <div className="card p-6 flex items-center justify-between gap-4 bg-[#0D7A6B]/5 border-[#0D7A6B]/30">
            <div className="flex items-start gap-3">
              <CheckCircle2 size={20} className="text-[#0D7A6B] mt-0.5" />
              <div>
                <div className="font-display font-semibold text-[#0F2340]">
                  Submit for verification
                </div>
                <p className="text-xs text-[#5b6371] mt-0.5">
                  Our team will review and publish within 48 hours.
                </p>
              </div>
            </div>
            <button type="submit" disabled={submitting} className="btn-primary" data-testid="submit-listing">
              {submitting ? <Loader2 size={15} className="animate-spin" /> : null}
              Submit
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

const Block = ({ title, children }) => (
  <div className="card p-6">
    <h3 className="font-display font-semibold text-[#0F2340] mb-4">{title}</h3>
    <div className="space-y-3">{children}</div>
  </div>
);

const Row = ({ children }) => (
  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">{children}</div>
);

const Field = ({ label, children }) => (
  <div>
    <label className="label">{label}</label>
    {children}
  </div>
);

export default NewListing;
