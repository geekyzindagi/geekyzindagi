import { z } from "zod";

// Tech stack options for the form
export const TECH_STACK_OPTIONS = [
  "React",
  "Next.js",
  "Vue",
  "Angular",
  "Node.js",
  "Python",
  "Go",
  "Rust",
  "TypeScript",
  "JavaScript",
  "Java",
  "C#",
  "Ruby",
  "PHP",
  "Swift",
  "Kotlin",
  "Flutter",
  "React Native",
  "PostgreSQL",
  "MongoDB",
  "Redis",
  "GraphQL",
  "REST API",
  "Docker",
  "Kubernetes",
  "AWS",
  "GCP",
  "Azure",
  "Vercel",
  "AI/ML",
  "OpenAI",
  "LangChain",
  "TensorFlow",
  "PyTorch",
  "Blockchain",
  "Web3",
  "IoT",
  "Mobile",
  "Desktop",
  "CLI",
  "Other",
] as const;

// What they're looking for options
export const LOOKING_FOR_OPTIONS = [
  { value: "feedback", label: "Feedback on my idea" },
  { value: "collaborators", label: "Co-founders / Collaborators" },
  { value: "mentorship", label: "Mentorship & guidance" },
  { value: "resources", label: "Learning resources" },
  { value: "accountability", label: "Accountability partner" },
  { value: "just-sharing", label: "Just sharing my idea" },
] as const;

// ============ IDEA SUBMISSION SCHEMA ============

export const ideaSubmissionSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  email: z
    .string()
    .email("Please enter a valid email")
    .optional()
    .or(z.literal("")),
  title: z
    .string()
    .min(5, "Idea title must be at least 5 characters")
    .max(150, "Idea title must be less than 150 characters"),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters")
    .max(2000, "Description must be less than 2000 characters"),
  techStack: z
    .array(z.string())
    .min(1, "Select at least one technology")
    .max(10, "Maximum 10 technologies allowed"),
  nextSteps: z
    .string()
    .min(10, "Please describe your next steps (at least 10 characters)")
    .max(1000, "Next steps must be less than 1000 characters"),
  lookingFor: z.string().min(1, "Please select what you're looking for"),
});

export type IdeaSubmissionInput = z.infer<typeof ideaSubmissionSchema>;
