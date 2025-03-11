# GitCard

GitCard 是一个优雅的 GitHub 个人资料卡片和项目卡片生成工具。它能帮助开发者创建精美的卡片来展示他们的 GitHub 个人资料或项目信息，非常适合用于在社交媒体、个人网站或文档中展示。

## ✨ 功能特点

- 🎨 支持多种卡片类型
  - 个人资料卡片：展示用户信息、统计数据和热门仓库
  - 项目卡片：展示仓库详情、统计数据和语言分布
- 📐 灵活的卡片尺寸
  - 16:9 - 适合网页横幅
  - 4:3 - 经典比例
  - 2:1 - 宽屏展示
  - 1:1 - 社交媒体最爱
- 🎭 丰富的主题选项
  - Light - 明亮清新
  - Dark - 深色优雅
  - GitHub - 官方风格
  - Rainbow - 缤纷多彩
  - Nord - 北欧风格
  - Solarized - 护眼主题
- 📊 详细的统计信息
  - Stars、Forks、Issues 统计
  - 贡献者数量统计
  - 编程语言分布
  - 个人活跃度数据

## 🚀 快速开始

1. 克隆仓库：
```bash
git clone https://github.com/yourusername/gitcard.git
cd gitcard
```

2. 安装依赖：
```bash
npm install
```

3. 配置 GitHub Token（必需）：
   - 访问 [GitHub Token Settings](https://github.com/settings/tokens)
   - 点击 "Generate new token (classic)"
   - 勾选以下权限：
     - `read:user` - 访问用户信息
     - `public_repo` - 访问公开仓库信息
   - 复制生成的 token
   - 在项目根目录创建 `.env.local` 文件：
   ```
   NEXT_PUBLIC_GITHUB_TOKEN=your_github_token_here
   ```

4. 启动开发服务器：
```bash
npm run dev
```

5. 打开浏览器访问 http://localhost:3000

## 💡 使用指南

### 生成个人资料卡片

1. 选择 "Profile Card" 类型
2. 输入 GitHub 用户名（如：vercel）
3. 自定义卡片设置：
   - 选择合适的尺寸
   - 选择喜欢的主题
   - 调整显示选项
4. 预览卡片效果

### 生成项目卡片

1. 选择 "Repository Card" 类型
2. 输入仓库地址（格式：owner/repo，如：vercel/next.js）
3. 自定义卡片设置：
   - 选择合适的尺寸
   - 选择喜欢的主题
   - 调整显示选项
4. 预览卡片效果

## ⚠️ 常见问题

1. API 请求限制
   - 错误信息：`API rate limit exceeded`
   - 解决方案：确保正确配置了 GitHub Token
   - 检查 `.env.local` 文件是否存在且包含有效的 token

2. 图片加载问题
   - 确保网络连接稳定
   - 检查 GitHub 头像 URL 是否可访问
   - 尝试刷新页面重新加载

3. 数据不显示
   - 检查用户名或仓库地址是否正确
   - 确认该用户/仓库是公开的
   - 查看浏览器控制台是否有错误信息

## 🤝 贡献指南

欢迎提交 Pull Request 来改进这个项目！在提交之前，请确保：

1. 代码风格符合项目规范
2. 所有的改动都经过测试
3. 更新相关文档
4. 提交信息清晰明了

## 📄 许可证

本项目采用 GPL-3.0 许可证。详见 [LICENSE](LICENSE) 文件。

## 🙏 鸣谢

- [Next.js](https://nextjs.org/) - React 应用框架
- [Tailwind CSS](https://tailwindcss.com/) - 样式框架
- [GitHub API](https://docs.github.com/en/rest) - 数据支持
