// GitHub用户基本信息
export interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  name: string | null;
  company: string | null;
  blog: string | null;
  location: string | null;
  email: string | null;
  bio: string | null;
  twitter_username: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

// 仓库信息
export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  private: boolean;
  html_url: string;
  description: string | null;
  fork: boolean;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  homepage: string | null;
  size: number;
  stargazers_count: number;
  watchers_count: number;
  language: string | null;
  forks_count: number;
  topics: string[];
  visibility: string;
}

// 语言统计
export interface LanguageStats {
  [key: string]: number;
}

// 贡献数据
export interface ContributionData {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

// 卡片主题配置
export interface CardTheme {
  id: string;
  name: string;
  background: string;
  text: string;
  border: string;
  accent: string;
}

// 项目卡片类型
export type CardType = 'profile' | 'repository';

// 项目详细信息
export interface RepoDetails extends GitHubRepo {
  owner: {
    login: string;
    avatar_url: string;
  };
  contributors_count: number;
  open_issues_count: number;
  license?: {
    name: string;
    spdx_id: string;
  };
  default_branch: string;
  releases_count?: number;
  latest_release?: {
    name: string;
    tag_name: string;
    published_at: string;
  };
}

// 卡片比例类型
export type CardAspectRatio = '2:1' | '16:9' | '4:3' | '1:1';

// 卡片配置
export interface CardConfig {
  type: CardType;
  theme: CardTheme;
  aspectRatio: CardAspectRatio;
  showStats: boolean;
  showLanguages: boolean;
  showContributions: boolean;
  showTopRepos: boolean;
  maxRepos: number;
} 