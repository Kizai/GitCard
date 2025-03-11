import Image from "next/image";
import { GitHubUser, GitHubRepo, LanguageStats, CardConfig } from "@/types/github";
import { formatNumber, getRelativeTime } from "@/lib/utils";

interface ProfileCardProps {
  user: GitHubUser;
  repos: GitHubRepo[];
  languages: LanguageStats;
  config: CardConfig;
}

const RATIO_STYLES = {
  '2:1': 'aspect-[2/1]',
  '16:9': 'aspect-video',
  '4:3': 'aspect-[4/3]',
  '1:1': 'aspect-square',
};

// 统计图标
const STAT_ICONS = {
  repos: '📦',
  followers: '👥',
  following: '👤',
  gists: '📝',
};

export function ProfileCard({ user, repos, languages, config }: ProfileCardProps) {
  const { theme } = config;

  // 计算语言百分比
  const totalBytes = Object.values(languages).reduce((a, b) => a + b, 0);
  const languagePercentages = Object.entries(languages)
    .map(([name, bytes]) => ({
      name,
      percentage: (bytes / totalBytes) * 100,
      bytes
    }))
    .sort((a, b) => b.bytes - a.bytes);

  return (
    <div
      data-id="card-root"
      className={`relative rounded-lg border shadow-sm ${RATIO_STYLES[config.aspectRatio]} overflow-hidden`}
      style={{
        backgroundColor: theme.background,
        borderColor: theme.border,
        color: theme.text,
      }}
    >
      {/* 头部：用户信息 */}
      <div data-id="card-header" className="absolute top-0 left-0 right-0 p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0 pr-8">
            <h2 className="text-4xl font-bold mb-2 truncate">
              {user.name || user.login}
            </h2>
            <p className="text-2xl opacity-80 mb-4 truncate">@{user.login}</p>
            {user.bio && (
              <p className="text-lg opacity-90 line-clamp-2">{user.bio}</p>
            )}
          </div>
          <div data-id="avatar-container" className="relative h-24 w-24 flex-shrink-0 rounded-lg overflow-hidden">
            <Image
              src={user.avatar_url}
              alt={user.login}
              fill
              sizes="96px"
              priority
              style={{ objectFit: "cover" }}
              crossOrigin="anonymous"
            />
          </div>
        </div>
      </div>

      {/* 统计信息 */}
      {config.showStats && (
        <div data-id="stats-section" className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 px-6">
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <div className="flex items-center justify-center gap-2">
                <span className="text-xl">{STAT_ICONS.repos}</span>
                <span className="text-3xl font-bold" style={{ color: theme.accent }}>
                  {formatNumber(user.public_repos)}
                </span>
              </div>
              <div className="text-sm opacity-80">Repositories</div>
            </div>
            <div>
              <div className="flex items-center justify-center gap-2">
                <span className="text-xl">{STAT_ICONS.followers}</span>
                <span className="text-3xl font-bold" style={{ color: theme.accent }}>
                  {formatNumber(user.followers)}
                </span>
              </div>
              <div className="text-sm opacity-80">Followers</div>
            </div>
            <div>
              <div className="flex items-center justify-center gap-2">
                <span className="text-xl">{STAT_ICONS.following}</span>
                <span className="text-3xl font-bold" style={{ color: theme.accent }}>
                  {formatNumber(user.following)}
                </span>
              </div>
              <div className="text-sm opacity-80">Following</div>
            </div>
            <div>
              <div className="flex items-center justify-center gap-2">
                <span className="text-xl">{STAT_ICONS.gists}</span>
                <span className="text-3xl font-bold" style={{ color: theme.accent }}>
                  {formatNumber(user.public_gists)}
                </span>
              </div>
              <div className="text-sm opacity-80">Gists</div>
            </div>
          </div>
        </div>
      )}

      {/* 热门仓库 */}
      {config.showTopRepos && repos.length > 0 && (
        <div data-id="repos-section" className="absolute bottom-16 left-0 right-0 px-6">
          <div className="grid grid-cols-2 gap-3">
            {repos.slice(0, 2).map((repo, index) => (
              <div
                key={repo.id}
                data-id={`repo-${index}`}
                className="flex items-center justify-between rounded border px-3 py-2"
                style={{ borderColor: theme.border }}
              >
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{repo.name}</p>
                  <div className="flex items-center space-x-2 text-sm opacity-60">
                    <span>⭐</span>
                    <span>{formatNumber(repo.stargazers_count)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* GitHub Logo */}
      <div data-id="github-logo" className="absolute bottom-4 right-4">
        <svg
          viewBox="0 0 24 24"
          width="24"
          height="24"
          className="opacity-40"
          style={{ fill: theme.text }}
        >
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>
      </div>

      {/* 页脚 */}
      <div data-id="footer" className="absolute bottom-4 left-4 text-xs opacity-60">
        Joined: {getRelativeTime(user.created_at)}
      </div>
    </div>
  );
} 