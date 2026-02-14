"use client";

import { useAuth } from "@/context/AuthContext";
import {
  HeroNotion,
  StoryNotion,
  DomainsNotion,
  FeaturesNotion,
  CTANotion,
  FooterNotion,
  NavbarNotion,
} from "@/components/landing";

export default function Home() {

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <NavbarNotion />

      {/* Hero */}
      <HeroNotion />

      {/* Story - The Journey */}
      <StoryNotion />

      {/* Domains - Explore Life */}
      <DomainsNotion />

      {/* Features - The Geeky Way */}
      <FeaturesNotion />

      {/* CTA */}
      <CTANotion />

      {/* Footer */}
      <FooterNotion />
    </div>
  );
}
