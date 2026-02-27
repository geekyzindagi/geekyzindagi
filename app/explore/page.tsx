import { Metadata } from "next";
import { NavbarNotion, FooterNotion, DomainsNotion } from "@/components/landing";

export const metadata: Metadata = {
    title: "Explore Domains | geekyZindagi",
    description: "Discover our curated realms: Tech, Art, Science, Wellness, and more. Find your archetypes and connect with the tribe.",
    alternates: {
        canonical: "/explore",
    },
};

export default function ExplorePage() {
    return (
        <div className="min-h-screen bg-[#FFFCF8]">
            <NavbarNotion />
            <main className="pt-20">
                <DomainsNotion />
            </main>
            <FooterNotion />
        </div>
    );
}
