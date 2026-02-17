import { Metadata } from "next";
import { NavbarNotion, FooterNotion, ProgressTimeline } from "@/components/landing";

export const metadata: Metadata = {
    title: "Platform Progress | geekyZindagi",
    description: "Track the evolution of the geekyZindagi platform. From inception and foundation to reliability and scale.",
    alternates: {
        canonical: "/progress",
    },
};

export default function ProgressPage() {
    return (
        <div className="min-h-screen bg-[#FFFCF8]">
            <NavbarNotion />

            <main className="container mx-auto px-6 pt-24 pb-20">
                <div className="max-w-4xl mx-auto space-y-8">
                    <div className="space-y-2 text-center mb-12">
                        <h1 className="text-4xl font-black tracking-tighter text-gray-900">Platform Progress</h1>
                        <p className="text-xl text-gray-600">
                            Tracking the evolution of geekyZindagi from inception to the present.
                        </p>
                    </div>

                    <ProgressTimeline />
                </div>
            </main>

            <FooterNotion />
        </div>
    );
}
