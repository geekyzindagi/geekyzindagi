import { Metadata } from "next";
import { NavbarNotion, FooterNotion } from "@/components/landing";
import Link from "next/link";
import { ArrowLeft, Share2, Bookmark } from "lucide-react";

export const metadata: Metadata = {
  title: "My retrieval benchmark passed the noise test. So did one I broke on purpose.",
  description: "A deep dive into retrieval evals, noise floors, and why one check is never enough. Learn how to validate your benchmarks properly.",
  authors: [{ name: "Guruprasad Kudte" }],
  openGraph: {
    title: "My retrieval benchmark passed the noise test.",
    description: "A deep dive into retrieval evals, noise floors, and why one check is never enough.",
    type: "article",
    publishedTime: "2026-08-05T00:00:00.000Z",
  },
  twitter: {
    title: "My retrieval benchmark passed the noise test. So did one I broke on purpose.",
  }
};

export default async function EvalValidityChecks() {
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
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
              My retrieval benchmark passed the "replace all vectors with noise" test. So did a benchmark I broke on purpose.
            </h1>
            <div className="flex items-center justify-between py-6 border-y border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-white font-bold">
                  GZ
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Guruprasad Kudte</p>
                  <p className="text-xs text-gray-500">August 5, 2026 • 6 min read</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <Share2 className="w-5 h-5 text-gray-500" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <Bookmark className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>
          </header>

          <div className="prose prose-lg prose-slate max-w-none prose-headings:font-bold prose-a:text-blue-600">
            <p className="lead text-xl text-gray-600 mb-8">
              There's a sanity check going around for retrieval evals: replace every vector in your index with random numbers, rerun the benchmark, see what it scores. If random garbage scores well, your benchmark was never measuring retrieval quality.
            </p>

            <p className="mb-6 text-gray-700 leading-relaxed">
              Good test. I ran it on my own production eval (1052 chunks, 218 files, 28 queries, baseline MRR@10 0.349). It passed.
            </p>
            <p className="mb-6 text-gray-700 leading-relaxed">
              Then I built a benchmark that is obviously broken — one where a random ranker scores 80% of what a perfect model scores — and ran the same test on that.
            </p>
            <p className="mb-8 text-gray-700 leading-relaxed font-semibold">
              It passed too.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-4 text-gray-900">Correction 1: The floor is not zero</h2>
            <p className="mb-6 text-gray-700 leading-relaxed">
              The version of this test I'd absorbed said a healthy noise floor should be "near zero." That's folklore and it will give you a wrong answer. Expected MRR under random ranking is fully determined by pool size N, gold count G, and cutoff k. Nothing else. For G=1 it's exactly <code className="bg-gray-100 px-1 py-0.5 rounded text-sm text-pink-600">H_k / N</code>.
            </p>

            <div className="bg-gray-50 p-6 rounded-lg mb-8 font-mono text-sm text-gray-800 border border-gray-200">
              <p>Same metric, wildly different floors:</p>
              <br/>
              <p>G=10, N=200   -&gt;  0.1318</p>
              <p>G=1.4, N=218  -&gt;  0.0186</p>
              <p>G=5,  N=8     -&gt;  0.7932</p>
            </div>

            <p className="mb-6 text-gray-700 leading-relaxed">
              So "is 0.10 a bad noise floor?" is unanswerable in isolation. Compare measured against the analytic expectation, not against zero. The exact derivation for expected MRR under random ranking for G items in N candidates is:
            </p>

            <div className="bg-gray-900 text-gray-100 p-6 rounded-lg mb-8 font-mono text-sm overflow-x-auto">
              <pre>
{`E[MRR@k] = sum_{r=1}^{k} [ product_{j=0}^{r-2} (N-G-j)/(N-j) * G/(N-(r-1)) ] / r`}
              </pre>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-4 text-gray-900">Why one check isn't enough</h2>
            <p className="mb-6 text-gray-700 leading-relaxed">
              Let's look at a clean toy corpus, 200 chunks, 20 queries, 20 random seeds:
            </p>

            <div className="bg-gray-50 p-6 rounded-lg mb-8 font-mono text-sm text-gray-800 border border-gray-200">
              <p>measured 0.1299   analytic 0.1318   ratio 0.99x   PASS</p>
              <p>real 1.0000 / noise 0.1299 = 7.7x           PASS</p>
            </div>

            <p className="mb-6 text-gray-700 leading-relaxed">
              Now shrink the candidate pool from 200 to 8. Change nothing else:
            </p>

            <div className="bg-gray-50 p-6 rounded-lg mb-8 font-mono text-sm text-gray-800 border border-gray-200">
              <p>measured 0.8083   analytic 0.7932   ratio 1.02x   PASS</p>
              <p>real 1.0000 / noise 0.8083 = 1.24x          FAIL</p>
            </div>

            <p className="mb-6 text-gray-700 leading-relaxed">
              The leakage check passes on the broken benchmark, and it's <em>right</em> to pass — there is no leakage, the data is honest. The analytic expectation already accounts for pool size, so when the pool shrinks the expectation rises to meet the measurement.
            </p>
            <p className="mb-8 text-gray-700 leading-relaxed">
              But the benchmark is still worthless. The distance between "no system at all" and "perfect system" is just 0.19. Any real model lands in that sliver and run-to-run variance swamps the difference.
            </p>

            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 mb-8">
              <h3 className="text-blue-900 font-bold mb-3">Two independent checks, and they fail in different ways:</h3>
              <ul className="list-disc pl-5 text-blue-900 space-y-2">
                <li><strong>Check 1 (leakage):</strong> noise floor vs analytic. Is the data honest?</li>
                <li><strong>Check 2 (power):</strong> real MRR vs noise floor. Can the benchmark tell anything apart?</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-4 text-gray-900">The Units Bug (How I failed my own test)</h2>
            <p className="mb-6 text-gray-700 leading-relaxed">
              On my own eval, the first run reported 5.80x on Check 1. Apparent leakage. It turned out to be a bug in my test, not a finding: the simulation ranked 1052 chunks, but the scorer deduplicates to 218 file paths before computing MRR. The analytic assumed chunks, but the measurement was effectively over files.
            </p>
            <p className="mb-6 text-gray-700 leading-relaxed">
              I found it by inverting the approximation. <code className="bg-gray-100 px-1 py-0.5 rounded text-sm text-pink-600">E ≈ G·H₁₀/N</code>, so <code className="bg-gray-100 px-1 py-0.5 rounded text-sm text-pink-600">N ≈ 1.39 × 2.929 / 0.02246 ≈ 181</code>. Nowhere near 1052, close to 218.
            </p>
            <p className="mb-6 text-gray-700 leading-relaxed">
              Corrected: 0.82x on Check 1, 22.9x on Check 2, both pass.
            </p>
            <p className="mb-6 text-gray-700 leading-relaxed font-semibold italic">
              Correction: an earlier version cited a baseline of 0.358 from an unlogged run. The traceable figure from the logged phase-6 baseline is 0.349 (n=27), giving 22.9×.
            </p>

            <div className="bg-gray-100 p-8 rounded-2xl border-l-4 border-gray-900 my-10">
              <p className="text-gray-700 italic font-semibold">
                Worth saying out loud — a validity check whose first run confirms everything is fine is a check nobody should trust. This one caught a real error in the work of the person who wrote it.
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-4 text-gray-900">One trap if your pipeline is hybrid</h2>
            <p className="mb-8 text-gray-700 leading-relaxed">
              <strong>Run this with BM25 and any reranker disabled.</strong> Those components don't consume vectors. Leave them on and they'll carry the score, and you'll certify a benchmark you never tested.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-4 text-gray-900">What this establishes, and what it doesn't</h2>
            <p className="mb-6 text-gray-700 leading-relaxed">
              Check 2 (22.9×) is a live measurement — real ONNX embeddings, real index, real queries. Check 1 (0.82×) is a simulation of the scoring harness: it assigns random scores to document IDs and confirms the scorer's arithmetic matches probability theory. It rules out counting bugs, dedup errors, and corrupted gold sets — it caught exactly such a bug on its first run. It does not push random vectors through the live index.
            </p>
            <p className="mb-8 text-gray-700 leading-relaxed">
              Two further limits: with 28 queries this detects gross benchmark failure, not mild leakage. And seven of those queries have more than one gold file, which raises their individual floors while carrying equal weight in a flat mean.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-4 text-gray-900">The Code</h2>
            <p className="mb-6 text-gray-700 leading-relaxed">
              You can find the standalone, numpy-only rig here: <a href="https://github.com/gurukudte/eval-validity" className="text-blue-600 hover:underline">github.com/gurukudte/eval-validity</a>. It's completely self-contained, downloads no models, and runs in about a second.
            </p>
            <p className="mb-6 text-gray-700 leading-relaxed">
              It ships with the deliberately broken benchmark so you can watch Check 1 pass while Check 2 fails before pointing it at anything you care about. Swap the <code className="bg-gray-100 px-1 py-0.5 rounded text-sm">embed()</code> function for your own pipeline; nothing else changes.
            </p>

          </div>
        </div>
      </article>

      <FooterNotion />
    </div>
  );
}
