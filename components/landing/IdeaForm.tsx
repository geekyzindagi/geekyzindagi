"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Loader2, Sparkles, X } from "lucide-react";

import { apiClient } from "@/lib/api-client";
import { useStats } from "@/context/StatsContext";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

import {
  ideaSubmissionSchema,
  type IdeaSubmissionInput,
  TECH_STACK_OPTIONS,
  LOOKING_FOR_OPTIONS,
} from "@/lib/validations/idea";

export function IdeaForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { triggerRefresh } = useStats();

  const form = useForm<IdeaSubmissionInput>({
    resolver: zodResolver(ideaSubmissionSchema),
    defaultValues: {
      name: "",
      email: "",
      title: "",
      description: "",
      techStack: [],
      nextSteps: "",
      lookingFor: "",
    },
  });

  const selectedTechStack = form.watch("techStack");

  function toggleTech(tech: string) {
    const current = form.getValues("techStack");
    if (current.includes(tech)) {
      form.setValue(
        "techStack",
        current.filter((t) => t !== tech),
        { shouldValidate: true }
      );
    } else if (current.length < 10) {
      form.setValue("techStack", [...current, tech], { shouldValidate: true });
    }
  }

  async function onSubmit(data: IdeaSubmissionInput) {
    setIsLoading(true);
    try {
      await apiClient.post("/ideas", data);

      setIsSubmitted(true);
      triggerRefresh();
      toast.success("🎉 You're now an Explorer!", {
        description: "We'll review your idea and reach out soon.",
      });
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to submit. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  }

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12 px-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border-2 border-amber-200"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-100 text-amber-600 mb-4">
          <Sparkles className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Welcome, Explorer! 🚀
        </h3>
        <p className="text-gray-600 max-w-md mx-auto mb-6">
          Your idea has been submitted. We&apos;ll review it and reach out if
          there&apos;s a great fit to join our community of Builders and Elders.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            variant="outline"
            onClick={() => {
              setIsSubmitted(false);
              form.reset();
            }}
          >
            Submit Another Idea
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Name & Email Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Name *</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email (optional)</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  So we can reach out about your idea
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Idea Title */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Idea Title *</FormLabel>
              <FormControl>
                <Input
                  placeholder="AI-powered habit tracker for developers"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Give your idea a catchy, descriptive title
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Describe Your Idea *</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="What problem does it solve? Who is it for? What makes it unique?"
                  className="min-h-[120px] resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                {field.value.length}/2000 characters
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Tech Stack */}
        <FormField
          control={form.control}
          name="techStack"
          render={() => (
            <FormItem>
              <FormLabel>Tech Stack *</FormLabel>
              <FormDescription className="mb-3">
                Select the technologies you want to use (max 10)
              </FormDescription>

              {/* Selected tags */}
              {selectedTechStack.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {selectedTechStack.map((tech) => (
                    <Badge
                      key={tech}
                      variant="secondary"
                      className="cursor-pointer hover:bg-red-100 group"
                      onClick={() => toggleTech(tech)}
                    >
                      {tech}
                      <X className="w-3 h-3 ml-1 group-hover:text-red-500" />
                    </Badge>
                  ))}
                </div>
              )}

              {/* Available options */}
              <div className="flex flex-wrap gap-2 p-4 bg-gray-50 rounded-lg border max-h-[200px] overflow-y-auto">
                {TECH_STACK_OPTIONS.filter(
                  (tech) => !selectedTechStack.includes(tech)
                ).map((tech) => (
                  <Badge
                    key={tech}
                    variant="outline"
                    className="cursor-pointer hover:bg-gray-100"
                    onClick={() => toggleTech(tech)}
                  >
                    + {tech}
                  </Badge>
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Next Steps */}
        <FormField
          control={form.control}
          name="nextSteps"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What&apos;s Your Next Step? *</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="I want to validate the idea with potential users, then build an MVP in the next 2 weeks..."
                  className="min-h-[100px] resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                How do you plan to move forward with this idea?
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Looking For */}
        <FormField
          control={form.control}
          name="lookingFor"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What Are You Looking For? *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select what you're seeking..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {LOOKING_FOR_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          size="lg"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 mr-2" />
              Submit & Become an Explorer
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
