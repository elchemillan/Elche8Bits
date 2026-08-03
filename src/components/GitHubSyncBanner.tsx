import React, { useState } from 'react';
import { Github, RefreshCw, CheckCircle2, User, Sparkles, ArrowRight } from 'lucide-react';
import { GitHubUser } from '../types';

interface GitHubSyncBannerProps {
  currentUser: GitHubUser;
  currentAvatar?: string;
  onSearchUser: (username: string) => void;
  isLoading: boolean;
}

export const GitHubSyncBanner: React.FC<GitHubSyncBannerProps> = ({
  currentUser,
  currentAvatar,
  onSearchUser,
  isLoading,
}) => {
  const [usernameInput, setUsernameInput] = useState('');
  const [isExpanded, setIsExpanded] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (usernameInput.trim()) {
      onSearchUser(usernameInput.trim());
    }
  };

  return (
    <div className="bg-slate-900/90 border border-cyan-500/30 rounded-3xl p-5 sm:p-6 backdrop-blur-xl mb-6 shadow-xl shadow-cyan-950/20 relative overflow-hidden transition-all">
      {/* Background Accent Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        
        {/* Left Side: Avatar & Informative Message */}
        <div className="flex items-center gap-4 flex-1">
          <div className="relative shrink-0">
            <img
              src={currentAvatar || currentUser.avatar_url}
              alt={currentUser.login}
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-cyan-400/80 shadow-md bg-slate-800"
              onError={(e) => {
                (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.login)}&background=0D8ABC&color=fff&size=256`;
              }}
            />
            <div className="absolute -bottom-1 -right-1 bg-cyan-500 text-slate-950 p-1 rounded-full shadow-sm">
              <Github className="w-3.5 h-3.5" />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-white text-base sm:text-lg">
                Sincronización de Perfil & Foto de GitHub
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                <CheckCircle2 className="w-3 h-3" />
                <span>Activo</span>
              </span>
            </div>

            <p className="text-xs text-slate-300 mt-1 max-w-xl leading-relaxed">
              Carga tu <strong className="text-cyan-300">foto de perfil real</strong>, nombre, biografía y repositorios desde GitHub. Los datos profesionales los puedes personalizar después.
            </p>

            <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400 mt-2">
              <span className="text-slate-200 font-medium">@{currentUser.login}</span>
              <span>•</span>
              <span>{currentUser.name || 'Sin nombre configurado'}</span>
              <span>•</span>
              <span>{currentUser.public_repos} repositorios</span>
            </div>
          </div>
        </div>

        {/* Right Side: Quick Username Sync Form */}
        <form onSubmit={handleSubmit} className="w-full md:w-auto shrink-0 flex flex-col sm:flex-row items-center gap-2">
          <div className="relative w-full sm:w-64">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              <User className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={usernameInput}
              onChange={(e) => setUsernameInput(e.target.value)}
              placeholder="Tu usuario de GitHub..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-950 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || !usernameInput.trim()}
            className="w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
          >
            {isLoading ? (
              <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
            ) : (
              <>
                <RefreshCw className="w-3.5 h-3.5 text-slate-950" />
                <span>Sincronizar Perfil</span>
              </>
            )}
          </button>
        </form>

      </div>
    </div>
  );
};
