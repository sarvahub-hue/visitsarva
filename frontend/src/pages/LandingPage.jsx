import React from "react";
import Navigation from "@/components/landing/Navigation";
import Hero from "@/components/landing/Hero";
import TrustStrip from "@/components/landing/TrustStrip";
import PropertySearch from "@/components/landing/PropertySearch";
import FeaturedProperties from "@/components/landing/FeaturedProperties";
import About from "@/components/landing/About";
import WhyChooseUs from "@/components/landing/WhyChooseUs";
import Stats from "@/components/landing/Stats";
import Testimonials from "@/components/landing/Testimonials";
import ContactSection from "@/components/landing/ContactSection";
import Footer from "@/components/landing/Footer";

const LandingPage = () => {
  return (
    <main className="bg-[#0a0908] text-[#f5f0ea] font-sans-body overflow-x-hidden">
      <Navigation />
      <Hero />
      <TrustStrip />
      <PropertySearch />
      <FeaturedProperties />
      <About />
      <WhyChooseUs />
      <Stats />
      <Testimonials />
      <ContactSection />
      <Footer />
    </main>
  );
};

export default LandingPage;
