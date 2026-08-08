import { Metadata } from "next";
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
# A Benchmark Can Pass Every Validity Check and Still Fail You

I recently published a framework for evaluating retrieval pipelines. The thesis was straightforward: most vector benchmarks are measuring nothing, but if you run your harness through two specific validity checks—Leakage (Check 1) and Power (Check 2)—you can mathematically prove whether your benchmark is capable of distinguishing a real model from random noise.

I ran my production benchmark through the checks. It passed both. It had no detectable leakage (a simulated 0.82×), and a measured signal-to-noise ratio of 22.9×. It was a rigorous, mathematically sound evaluation rig.

And yet, it is completely incapable of gating a release.

Here is why a benchmark can pass every validity check you throw at it, and still be statistically meaningless in practice.

### The 0.001 Gate Illusion

Like many engineering teams, I had a release gate. If a new pipeline configuration dropped the Mean Reciprocal Rank (MRR) below my baseline of \`0.357\`, the build would fail. It was a hard threshold, precise to three decimal places.

I ran a paired test on my pipeline: Expansion OFF vs. Expansion ON. 
* **Expansion OFF (Baseline):** 0.349
* **Expansion ON:** 0.318
* **Measured Drop:** 0.031

By the rules of the gate, Expansion ON is a regression and should be blocked. But look at the baseline itself—it measured \`0.349\`, which is *below* the \`0.357\` gate. The pipeline was failing its own gate. 

Think about what a 0.001 margin actually means on a discrete lattice. With 27 queries, a single query dropping from rank 1 (1.0) to rank 2 (0.5) shifts the overall mean by \`0.5 / 27 = 0.0185\`. One query moving just one spot at the top of the list changes the MRR by almost *nineteen times* the width of the gate. The gate wasn't enforcing a strict regression check; it was essentially testing whether any query moved near the top.

Was it a real regression, or just noise?

### The Reality of Statistical Power

Because I logged the exact per-query reciprocal ranks for both runs, I didn't have to guess. I ran a paired bootstrap with 10,000 resamples. 

The 95% Confidence Interval for the difference (OFF − ON) was \`[-0.014, 0.091]\`. 

The interval firmly straddles zero. That 0.031 drop? It is statistically indistinguishable from zero. We cannot mathematically prove whether the system got worse, got better, or stayed exactly the same. 

This happens because the paired differences have a standard deviation of 0.1428. Even with a highly correlated query set ($\rho \approx 0.917$), the Minimum Detectable Effect (MDE) for 80% power on my 27 queries is **0.077**. 

My benchmark can only resolve differences larger than 0.077. And yet, I had built a gate that demanded a resolution of **0.001**. 

### The Recursion Trap (Or, why you can't be clever)

Looking at the 27 queries, only 8 of them actually moved between the two runs. The other 19 contributed nothing but variance. The obvious engineering impulse is to figure out what makes a query discriminate, so we can write more of *those* and get a highly efficient benchmark.

I tried to isolate the property that makes those 8 queries move. I tested three pre-stated hypotheses:
1. **Rank Difficulty:** Do queries that start in the sensitive mid-rank range move more? (Result: p = 0.500)
2. **Phrasing:** Do keyword-style queries move differently than natural language questions? (Result: p = 0.080, but based on only n=2)
3. **Lexical Overlap:** Does query expansion disproportionately affect queries with low token overlap? (Result: p = 0.423, and removing the two confounded keyword queries pushes it to p = 0.848)

All three predictions failed. And that failure is exactly the finding. 

To identify the property that makes queries discriminate, you need enough discriminating queries to establish the property. Eight is not enough to characterize anything. Every pattern you try to extract from a sample that small will be noise dressed as insight. 

I even fell into this trap myself while analyzing this data. When the lexical overlap prediction failed (movers actually had *higher* overlap), I immediately restated the mechanism post-hoc to make the data fit ("Ah, expansion hurts high overlap queries because it dilutes the exact-match signal"). I caught it and reverted. That is exactly how broken benchmarks get rationalized live. Attempting to fit the hypothesis to the data after the fact is how you build a benchmark that validates its own bias.

### Where This Lands

You cannot cleverly select your way to a highly sensitive, low-N benchmark. You have to accept the discrimination rate (in this case, ~30%) as a property of the corpus and the model, rather than a bug to optimize away. 

But even that 30% is a soft estimate specific to this single expansion comparison. The 95% interval on 8-of-27 runs from roughly 15% to 49%. If I want to resolve a meaningful architectural change of 0.05 MRR, my required sample size ranges from somewhere between **130 and 430 queries**. I cannot narrow it without writing more queries.

That is expensive. Which brings us to the final, honest conclusion of any release gate: **decide what regression size you'd actually roll back for first.** If a 0.031 drop isn't something you would actually halt a release for, you don't need to resolve it. And you certainly don't need to write 130 to 430 queries to measure it. 

A valid benchmark is just a tool. If your release gate demands a resolution narrower than your Minimum Detectable Effect, you aren't doing engineering. You're doing theatre.

### Acknowledgements

Four of the core ideas in this post—per-query floors, paired differences over ratio-of-means, the lattice framing, and the critical 8-of-27 observation that triggered this entire realization—came directly from an incredibly sharp commenter on the previous post. Thank you for keeping me honest.

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
