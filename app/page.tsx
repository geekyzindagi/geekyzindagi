import { auth } from "@/lib/auth";
import {
  HeroNotion,
  StoryNotion,
  DomainsNotion,
  FeaturesNotion,
  CTANotion,
  FooterNotion,
  NavbarNotion,
} from "@/components/landing";

export default async function Home() {
  const session = await auth();

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <NavbarNotion session={session} />

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
