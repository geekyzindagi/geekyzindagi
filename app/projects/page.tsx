import Link from "next/link";
import { NavbarNotion, FooterNotion } from "@/components/landing";

import { Github, ExternalLink, Star, GitFork, Code2 } from "lucide-react";
import { getGitHubStats } from "@/lib/github";

const projects = [
  {
    title: "GeekyZindagi",
    description: "The official web application and core ecosystem for GeekyZindagi. A production-ready platform for the AI builder community, featuring identity management, idea exploration, and collaborative tools.",
    tech: ["Next.js 15", "TypeScript", "Prisma", "MongoDB", "Tailwind CSS"],
    github: "https://github.com/geekyzindagi/geekyzindagi",
    stars: 24,
    forks: 8,
    status: "Main App"
  }
];

export default async function ProjectsPage() {


  // Fetch real-time GitHub stats for all projects
  const projectsWithStats = await Promise.all(
    projects.map(async (project) => {
      const stats = await getGitHubStats(project.github);
      return {
        ...project,
        stars: stats?.stars ?? project.stars,
        forks: stats?.forks ?? project.forks,
      };
    })
  );

  return (
    <div className="min-h-screen bg-[#FFFCF8]">
      <NavbarNotion />

      <main className="container mx-auto px-6 pt-24 pb-20">
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-mono tracking-tight">
            /dev/projects
          </h1>
          <p className="text-xl text-gray-600">
            Open-source foundation for the modern AI builder.
          </p>
        </div>

        <div className="max-w-xl mx-auto">
          {projectsWithStats.map((project) => (
            <div
              key={project.title}
              className="group flex flex-col justify-between bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-2xl hover:border-blue-200 transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Code2 className="w-12 h-12" />
              </div>

              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded border ${project.status === 'Active' ? 'bg-green-50 text-green-700 border-green-200' :
                      project.status === 'Beta' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                        'bg-blue-50 text-blue-700 border-blue-200'
                    }`}>
                    {project.status}
                  </span>
                </div>

                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  {project.title}
                </h2>
                <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map(t => (
                    <span key={t} className="px-2 py-1 text-[11px] font-medium bg-gray-50 text-gray-500 rounded-md border border-gray-100">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5" />
                    {project.stars}
                  </span>
                  <span className="flex items-center gap-1">
                    <GitFork className="w-3.5 h-3.5" />
                    {project.forks}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 text-sm bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    <Github className="w-4 h-4" /> Code
                  </a>
                  <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <ExternalLink className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <FooterNotion />
    </div>
  );
}
