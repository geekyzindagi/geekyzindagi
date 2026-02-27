import { Metadata } from "next";
import MentorshipClient from "@/components/landing/MentorshipClient";

export const metadata: Metadata = {
  title: "Mentorship & Contribution | geekyZindagi",
  description: "Help scale the geekyZindagi ecosystem. Join as a contributor, designer, or builder.",
  alternates: {
    canonical: "/mentorship",
  },
};

export default function MentorshipPage() {
  return <MentorshipClient />;
}
