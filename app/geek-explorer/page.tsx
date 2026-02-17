import { Metadata } from "next";
import WizardForm from "@/components/geek-explorer/wizard-form";

export const metadata: Metadata = {
    title: "Geek Explorer | geekyZindagi",
    description: "Discover your geek archetype! Take the geekyZindagi explorer quiz to find your realm and connect with your tribe.",
    alternates: {
        canonical: "/geek-explorer",
    },
};

export default function GeekExplorerPage() {
    return <WizardForm />;
}
