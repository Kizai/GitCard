# GitCard

GitCard is an elegant GitHub profile and repository card generator. It helps developers create beautiful cards to showcase their GitHub profiles or project information, perfect for sharing on social media, personal websites, or documentation.

## ✨ Features

- 🎨 Multiple Card Types
  - Profile Card: Display user information, statistics, and popular repositories
  - Repository Card: Show repository details, statistics, and language distribution
- 📐 Flexible Card Sizes
  - 16:9 - Perfect for web banners
  - 4:3 - Classic ratio
  - 2:1 - Widescreen display
  - 1:1 - Social media favorite
- 🎭 Rich Theme Options
  - Light - Clean and fresh
  - Dark - Elegant dark mode
  - GitHub - Official style
  - Rainbow - Colorful and vibrant
  - Nord - Nordic style
  - Solarized - Eye-friendly
- 📊 Detailed Statistics
  - Stars, Forks, Issues counts
  - Contributors statistics
  - Programming language distribution
  - Personal activity data

## 🚀 Quick Start

1. Clone the repository:
```bash
git clone https://github.com/yourusername/gitcard.git
cd gitcard
```

2. Install dependencies:
```bash
npm install
```

3. Configure GitHub Token (Required):
   - Visit [GitHub Token Settings](https://github.com/settings/tokens)
   - Click "Generate new token (classic)"
   - Select the following permissions:
     - `read:user` - Access user information
     - `public_repo` - Access public repository information
   - Copy the generated token
   - Create `.env.local` file in the project root:
   ```
   NEXT_PUBLIC_GITHUB_TOKEN=your_github_token_here
   ```

4. Start the development server:
```bash
npm run dev
```

5. Open http://localhost:3000 in your browser

## 🚀 Deploy to Vercel

1. Push your code to GitHub:
   - Create a new repository on GitHub
   - Push your code to the repository

2. Deploy on Vercel:
   - Visit [Vercel](https://vercel.com)
   - Sign in with your GitHub account
   - Click "Import Project"
   - Select "Import Git Repository"
   - Choose your GitCard repository
   - Vercel will automatically detect Next.js configuration
   - Add Environment Variable:
     - Name: `NEXT_PUBLIC_GITHUB_TOKEN`
     - Value: Your GitHub Token
   - Click "Deploy"

3. Your project will be automatically deployed and available at a Vercel URL
   - You can customize the domain in Vercel project settings
   - Any future pushes to main branch will trigger automatic deployments

## 💡 Usage Guide

### Generate Profile Card

1. Select "Profile Card" type
2. Enter GitHub username (e.g., vercel)
3. Customize card settings:
   - Choose appropriate size
   - Select preferred theme
   - Adjust display options
4. Preview the card

### Generate Repository Card

1. Select "Repository Card" type
2. Enter repository address (format: owner/repo, e.g., vercel/next.js)
3. Customize card settings:
   - Choose appropriate size
   - Select preferred theme
   - Adjust display options
4. Preview the card

## ⚠️ Common Issues

1. API Rate Limit
   - Error message: `API rate limit exceeded`
   - Solution: Ensure GitHub Token is correctly configured
   - Check if `.env.local` file exists and contains valid token

2. Image Loading Issues
   - Ensure stable network connection
   - Check if GitHub avatar URLs are accessible
   - Try refreshing the page

3. Data Not Displaying
   - Verify username or repository address is correct
   - Confirm the user/repository is public
   - Check browser console for error messages

## 🤝 Contributing

Contributions are welcome! Before submitting a Pull Request, please ensure:

1. Code follows project style guidelines
2. All changes have been tested
3. Documentation is updated
4. Commit messages are clear and descriptive

## 📄 License

This project is licensed under the GPL-3.0 License. See the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React Framework
- [Tailwind CSS](https://tailwindcss.com/) - Styling Framework
- [GitHub API](https://docs.github.com/en/rest) - Data Provider 