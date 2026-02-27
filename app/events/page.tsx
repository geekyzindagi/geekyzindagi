import { Metadata } from "next";
import EventsClient from "@/components/landing/EventsClient";

export const metadata: Metadata = {
  title: "Events & Meetups | geekyZindagi",
  description: "Join our community workshops and offline meetups. Request an event or browse upcoming sessions.",
  alternates: {
    canonical: "/events",
  },
};

export default function EventsPage() {
  return <EventsClient />;
}
