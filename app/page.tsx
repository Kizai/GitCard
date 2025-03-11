'use client';

import { useState, useRef } from "react";
import { ProfileCard } from "@/components/cards/profile-card";
import { RepositoryCard } from "@/components/cards/repository-card";
import { ConfigPanel } from "@/components/config-panel";
import { themes } from "@/lib/themes";
import { fetchUserData, fetchRepoData } from "@/lib/github/api";
import { CardConfig, CardTheme, CardType } from "@/types/github";
import { exportCard } from "@/lib/export";

export default function Home() {
  const [config, setConfig] = useState<CardConfig>({
    type: 'repository',
    theme: themes.github,
    aspectRatio: '2:1',
    showStats: true,
    showLanguages: true,
    showContributions: true,
    showTopRepos: true,
    maxRepos: 3,
  });
  const [input, setInput] = useState("astral-sh/uv");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);

  // 加载数据
  const loadData = async (input: string) => {
    setIsLoading(true);
    setError(null);
    try {
      if (config.type === 'profile') {
        const userData = await fetchUserData(input);
        setData(userData);
      } else {
        const [owner, repo] = input.split('/');
        if (!owner || !repo) {
          throw new Error('Please enter a valid repository (e.g. owner/repo)');
        }
        const repoData = await fetchRepoData(owner, repo);
        setData(repoData);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load data");
    } finally {
      setIsLoading(false);
    }
  };

  // 处理输入提交
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      await loadData(input);
    }
  };

  // 修改类型切换处理
  const handleTypeChange = (type: CardType) => {
    setConfig({ ...config, type });
    setInput(type === 'profile' ? "vercel" : "astral-sh/uv");
    setData(null); // 清除当前数据
  };

  // 初始加载
  if (!data && !error && !isLoading) {
    loadData(input);
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* 头部 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            GitCard
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Create beautiful GitHub cards in seconds
          </p>
          
          {/* 类型选择 */}
          <div className="flex justify-center gap-4 mb-6">
            <button
              onClick={() => handleTypeChange('profile')}
              className={`px-4 py-2 rounded-lg ${
                config.type === 'profile'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              Profile Card
            </button>
            <button
              onClick={() => handleTypeChange('repository')}
              className={`px-4 py-2 rounded-lg ${
                config.type === 'repository'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              Repository Card
            </button>
          </div>
          
          {/* 输入表单 */}
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={config.type === 'profile' ? "Enter GitHub username" : "Enter repository (e.g. owner/repo)"}
                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
              >
                {isLoading ? "Loading..." : "Generate"}
              </button>
            </div>
          </form>
        </div>

        {/* 错误提示 */}
        {error && (
          <div className="max-w-md mx-auto mb-8 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
            {error}
          </div>
        )}

        {data && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 配置面板 */}
            <div className="lg:col-span-1">
              <ConfigPanel
                config={config}
                onConfigChange={setConfig}
              />
            </div>

            {/* 卡片预览 */}
            <div className="lg:col-span-2">
              {config.type === 'profile' ? (
                <ProfileCard
                  user={data.profile}
                  repos={data.topRepos}
                  languages={data.languageStats}
                  config={config}
                />
              ) : (
                <RepositoryCard
                  repo={data.repo}
                  languages={data.languages}
                  config={config}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 