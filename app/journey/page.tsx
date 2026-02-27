import { Metadata } from "next";
import { NavbarNotion, FooterNotion, StoryNotion } from "@/components/landing";

export const metadata: Metadata = {
    title: "The Journey | geekyZindagi",
    description: "From side project to purposeful obsession. Discover the story behind geekyZindagi and the vision for the future.",
    alternates: {
        canonical: "/journey",
    },
};

export default function JourneyPage() {
    return (
        <div className="min-h-screen bg-[#FFFCF8]">
            <NavbarNotion />
            <main className="pt-20">
                <StoryNotion />
            </main>
            <FooterNotion />
        </div>
    );
}
