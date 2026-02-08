import axios from "axios";

export interface GitHubStats {
  stars: number;
  forks: number;
}

// Simple in-memory cache to prevent frequent API calls
// Keys are repo paths, values are stats with a timestamp
const cache: Record<string, { stats: GitHubStats; timestamp: number }> = {};
const CACHE_TTL = 3600000; // 1 hour in milliseconds

/**
 * Fetches stars and forks for a given GitHub repository.
 * Format: "owner/repo"
 */
export async function getGitHubStats(repoPath: string): Promise<GitHubStats | null> {
  // Extract owner and repo from path if it's a full URL
  const cleanPath = repoPath.replace("https://github.com/", "").replace(/\/$/, "");

  // Check cache first
  const cached = cache[cleanPath];
  const now = Date.now();
  if (cached && (now - cached.timestamp < CACHE_TTL)) {
    return cached.stats;
  }

  try {
    // Use an optional GitHub token from environment for higher rate limits
    const token = process.env.GITHUB_TOKEN;
    const headers = token ? { Authorization: `token ${token}` } : {};

    const response = await axios.get(`https://api.github.com/repos/${cleanPath}`, {
      headers,
      timeout: 5000,
    });

    const stats = {
      stars: response.data.stargazers_count,
      forks: response.data.forks_count,
    };

    // Update cache
    cache[cleanPath] = { stats, timestamp: now };

    return stats;
  } catch (error) {
    // If request fails but we have cached data (even if expired), return it
    if (cached) {
      console.warn(`GitHub API failed for ${cleanPath}, returning expired cache.`);
      return cached.stats;
    }
    
    console.error(`Error fetching GitHub stats for ${repoPath}:`, error);
    return null;
  }
}
