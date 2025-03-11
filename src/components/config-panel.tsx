import { CardConfig, CardTheme, CardAspectRatio } from "@/types/github";
import { themes } from "@/lib/themes";

interface ConfigPanelProps {
  config: CardConfig;
  onConfigChange: (config: CardConfig) => void;
}

export function ConfigPanel({ config, onConfigChange }: ConfigPanelProps) {
  const handleChange = (key: keyof CardConfig, value: any) => {
    onConfigChange({
      ...config,
      [key]: value,
    });
  };

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg shadow-sm border">
      <h3 className="text-lg font-semibold">Customize Card</h3>

      {/* 比例选择 */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Aspect Ratio</label>
        <div className="grid grid-cols-4 gap-2">
          {(['2:1', '16:9', '4:3', '1:1'] as CardAspectRatio[]).map((ratio) => (
            <button
              key={ratio}
              onClick={() => handleChange("aspectRatio", ratio)}
              className={`p-2 rounded-lg border text-sm transition-transform ${
                config.aspectRatio === ratio ? "ring-2 ring-blue-500 scale-[1.02]" : ""
              }`}
            >
              {ratio}
            </button>
          ))}
        </div>
      </div>

      {/* 主题选择 */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Theme</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {Object.values(themes).map(theme => (
            <button
              key={theme.id}
              onClick={() => handleChange("theme", theme)}
              className={`p-2 rounded-lg border text-sm transition-transform ${
                config.theme.id === theme.id ? "ring-2 ring-blue-500 scale-[1.02]" : ""
              }`}
              style={{
                backgroundColor: theme.background,
                color: theme.text,
                borderColor: theme.border,
              }}
            >
              {theme.name}
            </button>
          ))}
        </div>
      </div>

      {/* 显示选项 */}
      <div className="space-y-3">
        <label className="text-sm font-medium">Display Options</label>
        <div className="space-y-2">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={config.showStats}
              onChange={(e) => handleChange("showStats", e.target.checked)}
              className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
            />
            <span className="text-sm">Show Statistics</span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={config.showLanguages}
              onChange={(e) => handleChange("showLanguages", e.target.checked)}
              className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
            />
            <span className="text-sm">Show Languages</span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={config.showTopRepos}
              onChange={(e) => handleChange("showTopRepos", e.target.checked)}
              className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
            />
            <span className="text-sm">Show Top Repositories</span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={config.showContributions}
              onChange={(e) => handleChange("showContributions", e.target.checked)}
              className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
            />
            <span className="text-sm">Show Contributions</span>
          </label>
        </div>
      </div>

      {/* 仓库数量 */}
      {config.showTopRepos && (
        <div className="space-y-2">
          <label className="text-sm font-medium">Number of Repositories</label>
          <input
            type="range"
            min="1"
            max="5"
            value={config.maxRepos}
            onChange={(e) => handleChange("maxRepos", parseInt(e.target.value))}
            className="w-full"
          />
          <div className="text-sm text-gray-600">
            Show top {config.maxRepos} repositories
          </div>
        </div>
      )}
    </div>
  );
} 