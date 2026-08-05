import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events & Workshops | geekyZindagi",
  description: "Join upcoming tech workshops, hackathons, and community meetups hosted by the geekyZindagi tribe.",
};

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
