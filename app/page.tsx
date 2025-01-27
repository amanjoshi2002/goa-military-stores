"use client";

import { useEffect } from "react";
import HeroSlider from "@/components/HeroSlider";
import FeaturedProducts from "@/components/FeaturedProducts";
import CategorySlider from "@/components/CategorySlider";
import AboutUs from "@/components/AboutUs";
import Testimonials from "@/components/Testimonials";
import ContactUs from "@/components/ContactUs";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSlider />
      <CategorySlider />
      <FeaturedProducts />
      <AboutUs />
      <Testimonials />
      <ContactUs />
      <Footer />
    </main>
  );
}