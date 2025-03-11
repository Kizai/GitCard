import Image from "next/image";
import { RepoDetails, LanguageStats, CardConfig } from "@/types/github";
import { formatNumber, getRelativeTime } from "@/lib/utils";

interface RepositoryCardProps {
  repo: RepoDetails;
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
  stars: '⭐',
  forks: '🔱',
  issues: '🔍',
  contributors: '👥',
};

export function RepositoryCard({ repo, languages, config }: RepositoryCardProps) {
  const { theme } = config;

  // 添加错误处理
  if (!repo || !repo.owner) {
    return (
      <div
        className={`rounded-lg border p-6 shadow-sm ${RATIO_STYLES[config.aspectRatio]}`}
        style={{
          backgroundColor: theme.background,
          borderColor: theme.border,
          color: theme.text,
        }}
      >
        <p className="text-center text-sm opacity-60">Loading repository data...</p>
      </div>
    );
  }

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
      {/* 头部：仓库信息 */}
      <div data-id="card-header" className="absolute top-0 left-0 right-0 p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0 pr-8">
            <h2 className="text-4xl font-bold mb-2 truncate">
              {repo.name}
            </h2>
            <p className="text-2xl opacity-80 mb-4 truncate">
              by {repo.owner.login}
            </p>
            {repo.description && (
              <p className="text-lg opacity-90 line-clamp-2">{repo.description}</p>
            )}
          </div>
          <div data-id="avatar-container" className="relative h-24 w-24 flex-shrink-0 rounded-lg overflow-hidden">
            <Image
              src={repo.owner.avatar_url}
              alt={repo.owner.login}
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
                <span className="text-xl">{STAT_ICONS.stars}</span>
                <span className="text-3xl font-bold" style={{ color: theme.accent }}>
                  {formatNumber(repo.stargazers_count)}
                </span>
              </div>
              <div className="text-sm opacity-80">Stars</div>
            </div>
            <div>
              <div className="flex items-center justify-center gap-2">
                <span className="text-xl">{STAT_ICONS.forks}</span>
                <span className="text-3xl font-bold" style={{ color: theme.accent }}>
                  {formatNumber(repo.forks_count)}
                </span>
              </div>
              <div className="text-sm opacity-80">Forks</div>
            </div>
            <div>
              <div className="flex items-center justify-center gap-2">
                <span className="text-xl">{STAT_ICONS.issues}</span>
                <span className="text-3xl font-bold" style={{ color: theme.accent }}>
                  {formatNumber(repo.open_issues_count)}
                </span>
              </div>
              <div className="text-sm opacity-80">Issues</div>
            </div>
            <div>
              <div className="flex items-center justify-center gap-2">
                <span className="text-xl">{STAT_ICONS.contributors}</span>
                <span className="text-3xl font-bold" style={{ color: theme.accent }}>
                  {formatNumber(repo.contributors_count)}
                </span>
              </div>
              <div className="text-sm opacity-80">Contributors</div>
            </div>
          </div>
        </div>
      )}

      {/* 语言统计 */}
      {config.showLanguages && languagePercentages.length > 0 && (
        <div data-id="languages-section" className="absolute bottom-16 left-0 right-0 px-6">
          <div className="flex h-2 overflow-hidden rounded-full bg-gray-200">
            {languagePercentages.map(({ name, percentage }, index) => {
              const colors = [
                "bg-blue-500",
                "bg-green-500",
                "bg-yellow-500",
                "bg-red-500",
                "bg-purple-500",
              ];
              return (
                <div
                  key={name}
                  data-id={`lang-bar-${index}`}
                  className={`${colors[index % colors.length]} transition-all duration-300`}
                  style={{ width: `${percentage}%` }}
                  title={`${name}: ${percentage.toFixed(1)}%`}
                />
              );
            })}
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {languagePercentages.slice(0, 3).map(({ name, percentage }, index) => (
              <div
                key={name}
                data-id={`lang-label-${index}`}
                className="text-sm px-2 py-1 rounded-full bg-opacity-10"
                style={{ backgroundColor: theme.border }}
              >
                {name} ({percentage.toFixed(1)}%)
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
        Last updated: {getRelativeTime(repo.updated_at)}
      </div>
    </div>
  );
} 