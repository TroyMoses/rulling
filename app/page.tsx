"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { MainLayout } from "@/components/main-layout";
import { HeroSection } from "@/components/hero-section";
import { TopDealsSlider } from "@/components/top-deals-slider";
import { HalfPriceDeals } from "@/components/half-price-deals";
import { SmartphoneDeals } from "@/components/smartphone-deals";
import { TopBrands } from "@/components/top-brands";
import { HomeEntertainmentDeals } from "@/components/home-entertainment-deals";
import { AllProductsSection } from "@/components/all-products-section";

export default function HomePage() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-out-cubic",
      once: true,
      offset: 100,
    });
  }, []);

  return (
    <MainLayout>
      <HeroSection />
      <TopDealsSlider />
      <HalfPriceDeals />
      <SmartphoneDeals />
      <TopBrands />
      <HomeEntertainmentDeals />
      <AllProductsSection />
    </MainLayout>
  );
}
