import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { GitHubStats } from './components/GitHubStats';
import { ProjectsGrid } from './components/ProjectsGrid';
import { SkillsSection } from './components/SkillsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { CustomizerPanel } from './components/CustomizerPanel';
import { GitHubPagesGuide } from './components/GitHubPagesGuide';
import { AIBioModal } from './components/AIBioModal';
import { ReadmeModal } from './components/ReadmeModal';
import { GitHubSyncBanner } from './components/GitHubSyncBanner';
import { 
  DEFAULT_GITHUB_USER, 
  DEFAULT_GITHUB_REPOS, 
  DEFAULT_PORTFOLIO_CONFIG 
} from './data/defaults';
import { GitHubUser, GitHubRepo, PortfolioConfig, ThemePreset } from './types';
import { Github, RefreshCw, Sparkles, CheckCircle2, AlertCircle, Eye, Rocket, SlidersHorizontal } from 'lucide-react';

export default function App() {
  const [githubUsername, setGithubUsername] = useState<string>('desarrollador-pro');
  const [user, setUser] = useState<GitHubUser>(DEFAULT_GITHUB_USER);
  const [repos, setRepos] = useState<GitHubRepo[]>(DEFAULT_GITHUB_REPOS);
  const [config, setConfig] = useState<PortfolioConfig>(() => {
    const saved = localStorage.getItem('devpage_config');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return DEFAULT_PORTFOLIO_CONFIG;
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'preview' | 'editor' | 'guide'>('preview');
  const [isAiModalOpen, setIsAiModalOpen] = useState<boolean>(false);
  const [readmeRepo, setReadmeRepo] = useState<GitHubRepo | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  // Save config changes to localStorage
  useEffect(() => {
    localStorage.setItem('devpage_config', JSON.stringify(config));
  }, [config]);

  // Show temporary toast message
  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  // Sync user data with GitHub API
  const handleSearchUser = async (username: string) => {
    setIsLoading(true);
    setGithubUsername(username);

    try {
      const userRes = await fetch(`/api/github/user/${username}`);
      if (!userRes.ok) {
        throw new Error('Usuario de GitHub no encontrado.');
      }
      const userData: GitHubUser = await userRes.json();
      setUser(userData);

      const reposRes = await fetch(`/api/github/repos/${username}`);
      if (reposRes.ok) {
        const reposData: GitHubRepo[] = await reposRes.json();
        setRepos(reposData);

        // Auto update config title, role, bio and avatar
        const topRepoIds = reposData.slice(0, 6).map((r) => r.id);
        setConfig((prev) => ({
          ...prev,
          title: userData.name || userData.login,
          customAvatarUrl: userData.avatar_url,
          tagline: userData.bio || prev.tagline,
          aboutMe: userData.bio ? `${userData.bio} Con más de ${userData.public_repos} repositorios creados.` : prev.aboutMe,
          githubUrl: userData.html_url,
          location: userData.location || prev.location,
          email: userData.email || prev.email,
          featuredRepoIds: topRepoIds.length > 0 ? topRepoIds : prev.featuredRepoIds,
        }));

        showToast(`¡Perfil de @${username} sincronizado con éxito desde GitHub!`);
      }
    } catch (err: any) {
      console.error(err);
      showToast(`⚠️ ${err.message || 'Error al buscar en GitHub API'}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle repository pin
  const handleTogglePin = (repoId: number) => {
    setConfig((prev) => {
      const isPinned = prev.featuredRepoIds.includes(repoId);
      const newIds = isPinned
        ? prev.featuredRepoIds.filter((id) => id !== repoId)
        : [...prev.featuredRepoIds, repoId];
      return { ...prev, featuredRepoIds: newIds };
    });
  };

  // Apply Gemini AI Bio
  const handleApplyAiBio = (aiData: { tagline: string; aboutMe: string }) => {
    setConfig((prev) => ({
      ...prev,
      tagline: aiData.tagline,
      aboutMe: aiData.aboutMe,
    }));
    showToast('✨ Biografía profesional actualizada con Gemini IA');
  };

  // Theme Wrapper Classes
  const getThemeClass = (theme: ThemePreset) => {
    switch (theme) {
      case 'emerald':
        return 'bg-emerald-950 text-slate-100 selection:bg-emerald-500 selection:text-slate-950';
      case 'purple':
        return 'bg-slate-950 text-purple-100 selection:bg-purple-500 selection:text-white';
      case 'midnight':
        return 'bg-slate-950 text-blue-100 selection:bg-blue-500 selection:text-white';
      case 'minimal':
        return 'bg-gray-950 text-slate-100 selection:bg-cyan-500 selection:text-slate-950';
      case 'slate':
      default:
        return 'bg-slate-950 text-slate-100 selection:bg-cyan-500 selection:text-slate-950';
    }
  };

  return (
    <div className={`min-h-screen font-sans ${getThemeClass(config.theme)} transition-colors duration-500`}>
      
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 bg-cyan-500 text-slate-950 font-bold text-xs rounded-2xl shadow-2xl flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4" />
          <span>{notification}</span>
        </div>
      )}

      {/* Top Navigation */}
      <Navbar
        githubUsername={githubUsername}
        onSearchUser={handleSearchUser}
        isLoading={isLoading}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentTheme={config.theme}
        onThemeChange={(theme) => setConfig({ ...config, theme })}
        onOpenAiBio={() => setIsAiModalOpen(true)}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* VIEW 1: Live Preview Mode */}
        {activeTab === 'preview' && (
          <div className="animate-fade-in space-y-8">
            <GitHubSyncBanner
              currentUser={user}
              currentAvatar={config.customAvatarUrl || user.avatar_url}
              onSearchUser={handleSearchUser}
              isLoading={isLoading}
            />

            <HeroSection
              user={user}
              config={config}
              onOpenAiBio={() => setIsAiModalOpen(true)}
            />

            {config.showStats && (
              <GitHubStats user={user} repos={repos} />
            )}

            <ProjectsGrid
              repos={repos}
              customProjects={config.customProjects}
              featuredIds={config.featuredRepoIds}
              onTogglePin={handleTogglePin}
              onViewReadme={(repo) => setReadmeRepo(repo)}
            />

            <SkillsSection skills={config.skills} />

            <ExperienceSection experiences={config.experiences} />
          </div>
        )}

        {/* VIEW 2: Customizer Editor Mode */}
        {activeTab === 'editor' && (
          <div className="animate-fade-in space-y-8">
            <CustomizerPanel
              config={config}
              userAvatar={user.avatar_url}
              onChangeConfig={setConfig}
              onOpenAiBio={() => setIsAiModalOpen(true)}
            />

            {/* Live Mini Preview below Editor */}
            <div className="border-t border-slate-800 pt-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                  <Eye className="w-4 h-4 text-cyan-400" />
                  <span>Previsualización en tiempo real</span>
                </h3>
              </div>
              <HeroSection user={user} config={config} />
            </div>
          </div>
        )}

        {/* VIEW 3: GitHub Pages Deployment Assistant */}
        {activeTab === 'guide' && (
          <div className="animate-fade-in">
            <GitHubPagesGuide githubUsername={user.login || githubUsername} />
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950/80 py-8 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-medium">
            <Github className="w-4 h-4 text-cyan-400" />
            <span>DevPage & GitHub Sync • Vinculado con la API de GitHub</span>
          </div>
          <p>
            Generado para el usuario <strong className="text-white">@{user.login}</strong>
          </p>
        </div>
      </footer>

      {/* Modals */}
      <AIBioModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        user={user}
        repos={repos}
        config={config}
        onApplyAiBio={handleApplyAiBio}
      />

      <ReadmeModal
        repo={readmeRepo}
        onClose={() => setReadmeRepo(null)}
      />

    </div>
  );
}
