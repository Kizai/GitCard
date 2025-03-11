import { GitHubUser, GitHubRepo, LanguageStats, RepoDetails } from "@/types/github";

const GITHUB_API_BASE = "https://api.github.com";

// 获取认证头
const getAuthHeaders = () => ({
  "Accept": "application/vnd.github.v3+json",
  ...(process.env.NEXT_PUBLIC_GITHUB_TOKEN && {
    "Authorization": `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`
  })
});

// 获取用户信息
export async function fetchUserProfile(username: string): Promise<GitHubUser> {
  const response = await fetch(`${GITHUB_API_BASE}/users/${username}`, {
    headers: getAuthHeaders(),
    next: { revalidate: 60 } // 缓存60秒
  });

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(`User ${username} not found`);
    }
    if (response.status === 403) {
      throw new Error('API rate limit exceeded. Please try again later or add a GitHub token.');
    }
    throw new Error(`Failed to fetch user profile: ${response.statusText}`);
  }

  return response.json();
}

// 获取用户仓库列表
export async function fetchUserRepos(username: string): Promise<GitHubRepo[]> {
  const response = await fetch(
    `${GITHUB_API_BASE}/users/${username}/repos?sort=stars&per_page=100`,
    {
      headers: getAuthHeaders(),
      next: { revalidate: 60 }
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch user repos: ${response.statusText}`);
  }

  return response.json();
}

// 获取仓库语言统计
export async function fetchRepoLanguages(username: string, repo: string): Promise<LanguageStats> {
  const response = await fetch(
    `${GITHUB_API_BASE}/repos/${username}/${repo}/languages`,
    {
      headers: getAuthHeaders(),
      next: { revalidate: 60 }
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch repo languages: ${response.statusText}`);
  }

  return response.json();
}

// 获取用户贡献数据
export async function fetchUserContributions(username: string): Promise<number[]> {
  const response = await fetch(`https://github.com/users/${username}/contributions`, {
    next: { revalidate: 60 }
  });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch user contributions: ${response.statusText}`);
  }

  const html = await response.text();
  const matches = html.match(/data-count="(\d+)"/g);
  if (!matches) {
    return [];
  }

  return matches.map(match => parseInt(match.match(/\d+/)?.[0] || "0", 10));
}

// 获取仓库详细信息
export async function fetchRepoDetails(owner: string, repo: string): Promise<RepoDetails> {
  const [repoData, contributorsCount, latestRelease] = await Promise.all([
    fetch(`${GITHUB_API_BASE}/repos/${owner}/${repo}`, {
      headers: getAuthHeaders(),
      next: { revalidate: 60 }
    }).then(res => res.json()),
    
    fetch(`${GITHUB_API_BASE}/repos/${owner}/${repo}/contributors?per_page=1&anon=true`, {
      headers: getAuthHeaders(),
      next: { revalidate: 60 }
    }).then(res => parseInt(res.headers.get('link')?.match(/&page=(\d+)/)?.[1] || '1')),
    
    fetch(`${GITHUB_API_BASE}/repos/${owner}/${repo}/releases/latest`, {
      headers: getAuthHeaders(),
      next: { revalidate: 60 }
    }).then(res => res.ok ? res.json() : null)
  ]);

  return {
    ...repoData,
    contributors_count: contributorsCount,
    latest_release: latestRelease,
  };
}

// 聚合仓库数据
export async function fetchRepoData(owner: string, repo: string) {
  const [repoDetails, languages] = await Promise.all([
    fetchRepoDetails(owner, repo),
    fetchRepoLanguages(owner, repo),
  ]);

  return {
    repo: repoDetails,
    languages,
  };
}

// 聚合所有数据
export async function fetchUserData(username: string) {
  const [profile, repos] = await Promise.all([
    fetchUserProfile(username),
    fetchUserRepos(username),
  ]);

  // 获取前5个最受欢迎仓库的语言统计
  const topRepos = repos
    .filter(repo => !repo.fork)
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 5);

  const languagePromises = topRepos.map(repo => 
    fetchRepoLanguages(username, repo.name)
  );

  const languages = await Promise.all(languagePromises);

  // 合并语言统计
  const languageStats = languages.reduce((acc, curr) => {
    Object.entries(curr).forEach(([lang, bytes]) => {
      acc[lang] = (acc[lang] || 0) + bytes;
    });
    return acc;
  }, {} as LanguageStats);

  return {
    profile,
    topRepos,
    languageStats,
  };
} 