import React from 'react';
import { 
  Star, 
  GitFork, 
  FolderGit2, 
  Users, 
  Code2, 
  TrendingUp, 
  Award,
  Zap
} from 'lucide-react';
import { GitHubUser, GitHubRepo } from '../types';

interface GitHubStatsProps {
  user: GitHubUser;
  repos: GitHubRepo[];
}

export const GitHubStats: React.FC<GitHubStatsProps> = ({ user, repos }) => {
  // Calculate total stars across all fetched repos
  const totalStars = repos.reduce((acc, repo) => acc + (repo.stargazers_count || 0), 0);
  const totalForks = repos.reduce((acc, repo) => acc + (repo.forks_count || 0), 0);

  // Calculate language distribution
  const languageCounts: Record<string, number> = {};
  repos.forEach((repo) => {
    if (repo.language) {
      languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1;
    }
  });

  const sortedLanguages = Object.entries(languageCounts)
    .map(([lang, count]) => ({ lang, count, percentage: Math.round((count / (repos.length || 1)) * 100) }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  const getLanguageColor = (lang: string) => {
    switch (lang.toLowerCase()) {
      case 'typescript': return 'bg-blue-500 text-blue-400 border-blue-500/30';
      case 'javascript': return 'bg-yellow-500 text-yellow-400 border-yellow-500/30';
      case 'python': return 'bg-emerald-500 text-emerald-400 border-emerald-500/30';
      case 'go': return 'bg-cyan-500 text-cyan-400 border-cyan-500/30';
      case 'html': return 'bg-orange-500 text-orange-400 border-orange-500/30';
      case 'css': return 'bg-indigo-500 text-indigo-400 border-indigo-500/30';
      case 'rust': return 'bg-amber-600 text-amber-400 border-amber-500/30';
      case 'c#': return 'bg-purple-500 text-purple-400 border-purple-500/30';
      default: return 'bg-slate-500 text-slate-400 border-slate-500/30';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      {/* Metric 1: Public Repositories */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md relative overflow-hidden group hover:border-cyan-500/50 transition-all">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Repositorios</p>
            <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">{user.public_repos || repos.length}</h3>
          </div>
          <div className="p-3 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 rounded-xl group-hover:scale-110 transition-transform">
            <FolderGit2 className="w-6 h-6" />
          </div>
        </div>
        <p className="text-xs text-slate-400 mt-3 flex items-center gap-1">
          <Zap className="w-3.5 h-3.5 text-cyan-400" />
          <span>Sincronizados con GitHub API</span>
        </p>
      </div>

      {/* Metric 2: Total Stars Earned */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md relative overflow-hidden group hover:border-amber-500/50 transition-all">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Estrellas Recibidas</p>
            <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">{totalStars}</h3>
          </div>
          <div className="p-3 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-xl group-hover:scale-110 transition-transform">
            <Star className="w-6 h-6 fill-amber-400/20" />
          </div>
        </div>
        <p className="text-xs text-slate-400 mt-3 flex items-center gap-1">
          <Award className="w-3.5 h-3.5 text-amber-400" />
          <span>Reconocimiento de la comunidad</span>
        </p>
      </div>

      {/* Metric 3: Total Forks & Community */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md relative overflow-hidden group hover:border-purple-500/50 transition-all">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Forks & Seguidores</p>
            <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">{user.followers} <span className="text-sm font-normal text-slate-400">seguidores</span></h3>
          </div>
          <div className="p-3 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-xl group-hover:scale-110 transition-transform">
            <Users className="w-6 h-6" />
          </div>
        </div>
        <p className="text-xs text-slate-400 mt-3 flex items-center gap-1">
          <GitFork className="w-3.5 h-3.5 text-purple-400" />
          <span>{totalForks} forks en repositorios</span>
        </p>
      </div>

      {/* Metric 4: Top Languages Breakdown */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md relative overflow-hidden group hover:border-indigo-500/50 transition-all">
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">Lenguajes Principales</p>
        
        {sortedLanguages.length === 0 ? (
          <p className="text-xs text-slate-500">Cargando estadísticas...</p>
        ) : (
          <div className="space-y-1.5">
            {sortedLanguages.slice(0, 3).map((item) => (
              <div key={item.lang} className="flex items-center justify-between text-xs">
                <span className="text-slate-300 font-medium">{item.lang}</span>
                <span className="text-slate-400">{item.count} repos</span>
              </div>
            ))}
            {/* Visual Bar */}
            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden flex mt-2">
              {sortedLanguages.map((item, idx) => (
                <div
                  key={item.lang}
                  style={{ width: `${item.percentage}%` }}
                  className={`h-full ${
                    idx === 0 ? 'bg-cyan-500' : idx === 1 ? 'bg-blue-500' : idx === 2 ? 'bg-indigo-500' : 'bg-slate-600'
                  }`}
                  title={`${item.lang}: ${item.count} repos`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
