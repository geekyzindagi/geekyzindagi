import { Metadata } from "next";
import HomeClient from "@/components/landing/HomeClient";

export const metadata: Metadata = {
  title: "geekyZindagi | Build, Learn, Grow",
  description: "The curated ecosystem for AI builders, creative technologists, and purposeful explorers. Join the geekyZindagi community to Build, Learn, and Grow.",
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return <HomeClient />;
}
