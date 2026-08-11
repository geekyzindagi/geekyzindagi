import os

markdown_path = r"C:\Users\RAMESH KUDTE\.gemini\antigravity-ide\brain\08b9b888-6205-4815-a41d-f39aa5de5130\post3_draft.md"
dest_dir = r"app\blog\eval-regression-gates"
dest_path = os.path.join(dest_dir, "page.tsx")

os.makedirs(dest_dir, exist_ok=True)

with open(markdown_path, "r", encoding="utf-8") as f:
    markdown_content = f.read()

# We want to format this markdown into the TSX template.
# The template has a specific structure:
# A header section with metadata
# An article wrapper with title
# And the body with markdown elements styled with Tailwind.

# We will just dump it directly into a standard template format.

tsx_content = """import { Metadata } from "next";
import { NavbarNotion, FooterNotion } from "@/components/landing";
import Link from "next/link";
import { ArrowLeft, Share2, Bookmark } from "lucide-react";
import ReactMarkdown from 'react-markdown';

export const metadata: Metadata = {
  title: "A Benchmark Can Pass Every Validity Check and Still Fail You",
  description: "Why a benchmark can pass every validity check you throw at it, and still be statistically meaningless in practice.",
  authors: [{ name: "Guruprasad Kudte" }],
  openGraph: {
    title: "A Benchmark Can Pass Every Validity Check and Still Fail You",
    description: "Why a benchmark can pass every validity check you throw at it, and still be statistically meaningless in practice.",
    type: "article",
    publishedTime: "2026-08-08T00:00:00.000Z",
  },
  twitter: {
    title: "A Benchmark Can Pass Every Validity Check and Still Fail You",
  }
};

const markdownBody = `
""" + markdown_content.replace('`', '\\`') + """
`;

export default async function EvalRegressionGates() {
  return (
    <div className="min-h-screen bg-[#FFFCF8]">
      <NavbarNotion />

      <article className="container mx-auto px-6 pt-32 pb-20">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Library
          </Link>

          <header className="mb-12">
            <div className="flex gap-2 mb-4">
              <span className="px-2 py-1 text-xs font-semibold bg-red-50 text-red-600 rounded">Evaluation</span>
              <span className="px-2 py-1 text-xs font-semibold bg-blue-50 text-blue-600 rounded">Search</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              A Benchmark Can Pass Every Validity Check and Still Fail You
            </h1>

            <div className="flex items-center justify-between py-6 border-y border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                  GK
                </div>
                <div>
                  <div className="font-medium text-gray-900">Guruprasad Kudte</div>
                  <div className="text-sm text-gray-500">Aug 8, 2026 Â· 8 min read</div>
                </div>
              </div>
              <div className="flex gap-3">
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <Bookmark className="w-5 h-5" />
                </button>
              </div>
            </div>
          </header>

          <div className="prose prose-lg max-w-none text-gray-600 prose-headings:text-gray-900 prose-a:text-blue-600 hover:prose-a:text-blue-500 prose-code:bg-gray-100 prose-code:text-gray-800 prose-code:px-1 prose-code:rounded">
            <ReactMarkdown>
              {markdownBody.replace('# A Benchmark Can Pass Every Validity Check and Still Fail You', '')}
            </ReactMarkdown>
          </div>
        </div>
      </article>

      <FooterNotion />
    </div>
  );
}
"""

with open(dest_path, "w", encoding="utf-8") as f:
    f.write(tsx_content)

print(f"Successfully generated {dest_path}")
