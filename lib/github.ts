import axios from "axios";

export interface GitHubStats {
  stars: number;
  forks: number;
}

/**
 * Fetches stars and forks for a given GitHub repository.
 * Format: "owner/repo"
 */
export async function getGitHubStats(repoPath: string): Promise<GitHubStats | null> {
  try {
    // Extract owner and repo from path if it's a full URL
    const cleanPath = repoPath.replace("https://github.com/", "").replace(/\/$/, "");
    
    // Use an optional GitHub token from environment for higher rate limits
    const token = process.env.GITHUB_TOKEN;
    const headers = token ? { Authorization: `token ${token}` } : {};

    const response = await axios.get(`https://api.github.com/repos/${cleanPath}`, {
      headers,
      timeout: 5000,
    });

    return {
      stars: response.data.stargazers_count,
      forks: response.data.forks_count,
    };
  } catch (error) {
    console.error(`Error fetching GitHub stats for ${repoPath}:`, error);
    return null;
  }
}
