import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentorship & Guidance | geekyZindagi",
  description: "Connect with experienced builders and get 1-on-1 mentorship to accelerate your tech career and personal growth.",
};

export default function MentorshipLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
