"use client";

import { useState } from "react";
import { NavbarNotion, FooterNotion } from "@/components/landing";
import { motion } from "framer-motion";
import { Calendar, MapPin, Video, Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { toast } from "sonner";

export default function EventsPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    setIsSubmitted(true);
    toast.success("Event request submitted successfully!");
  }

  return (
    <div className="min-h-screen bg-[#FFFCF8]">
      <NavbarNotion session={null} />

      <main className="container mx-auto px-6 pt-32 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Events & Meetups
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We don't have any events planned at the moment, but we'd love to organize one based on your interests!
            </p>
          </div>

          {!isSubmitted ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm"
            >
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
                <Send className="w-6 h-6 text-blue-500" />
                Request an Event
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Type of Event</label>
                    <Select required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="online">Online Webinar/Workshop</SelectItem>
                        <SelectItem value="offline">Offline Meetup</SelectItem>
                        <SelectItem value="hackathon">Mini-Hackathon</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Your Email</label>
                    <Input type="email" placeholder="alex@gmail.com" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Proposed Agenda/Topic</label>
                  <Input placeholder="e.g. Building with AI Agents in 2026" required />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Agenda Details / Ideas to Review</label>
                  <Textarea 
                    placeholder="Tell us what you'd like to see, talk about, or learn..." 
                    className="min-h-[120px]" 
                    required 
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full md:w-auto px-8" 
                  disabled={isLoading}
                >
                  {isLoading ? "Submitting..." : "Submit Event Request"}
                </Button>
              </form>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white border border-green-100 rounded-3xl p-12 text-center shadow-sm"
            >
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-8 h-8 text-green-500" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Request Received!</h2>
              <p className="text-gray-600 mb-8">
                Thank you for your suggestion. We'll review the agenda and reach out if there's enough community interest to make it happen.
              </p>
              <Button variant="outline" onClick={() => setIsSubmitted(false)}>
                Submit another idea
              </Button>
            </motion.div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16 text-center">
            <div className="p-8 bg-gray-50 rounded-2xl border border-gray-100">
              <Video className="w-8 h-8 text-purple-500 mx-auto mb-4" />
              <h3 className="font-bold mb-2">Online Workshops</h3>
              <p className="text-sm text-gray-600">Virtual hangouts to share knowledge and build in public together.</p>
            </div>
            <div className="p-8 bg-gray-50 rounded-2xl border border-gray-100">
              <MapPin className="w-8 h-8 text-orange-500 mx-auto mb-4" />
              <h3 className="font-bold mb-2">Offline Meetups</h3>
              <p className="text-sm text-gray-600">Local gatherings to connect with other builders in your city.</p>
            </div>
          </div>
        </div>
      </main>

      <FooterNotion />
    </div>
  );
}
