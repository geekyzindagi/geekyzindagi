"use client";

import {
    HeroNotion,
    StoryNotion,
    DomainsNotion,
    FeaturesNotion,
    CTANotion,
    NavbarNotion,
    TreeWrapper,
    Branch,
    RootsFooter,
    ProgressTimeline,
    TreeDecoration,
    ExplorerIllustration,
    GardenIllustration,
} from "@/components/landing";

export default function HomeClient() {
    return (
        <div className="min-h-screen">
            <NavbarNotion />
            <HeroNotion />

            <TreeWrapper>
                <div className="relative">
                    <Branch side="left">
                        <StoryNotion />
                    </Branch>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden lg:flex w-1/2 justify-center items-center h-[500px]">
                        <ExplorerIllustration />
                    </div>
                </div>

                <div className="py-24">
                    <div className="container mx-auto px-6 mb-16 text-center">
                        <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tighter uppercase italic">
                            The Trunk
                        </h2>
                        <p className="text-gray-500 font-mono text-xs uppercase tracking-widest mt-2">
                            Chronological implementation
                        </p>
                    </div>
                    <ProgressTimeline />
                </div>

                <div className="relative">
                    <TreeDecoration
                        animationUrl="https://assets9.lottiefiles.com/packages/lf20_96b974.json"
                        className="absolute left-10 top-1/2 -translate-y-1/2 hidden lg:block"
                        size={350}
                    />
                    <Branch side="right">
                        <DomainsNotion />
                    </Branch>
                </div>

                <div className="relative">
                    <Branch side="left">
                        <FeaturesNotion />
                    </Branch>
                    <TreeDecoration
                        animationUrl="https://assets4.lottiefiles.com/packages/lf20_7lim8c.json"
                        className="absolute right-20 top-1/2 -translate-y-1/2 hidden lg:block"
                        size={250}
                    />
                </div>

                <div className="relative">
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 hidden lg:flex w-1/2 justify-center items-center h-[400px]">
                        <GardenIllustration />
                    </div>
                    <Branch side="right">
                        <CTANotion />
                    </Branch>
                </div>
            </TreeWrapper>

            <RootsFooter />
        </div>
    );
}
