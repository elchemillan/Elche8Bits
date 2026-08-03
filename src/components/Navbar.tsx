import React, { useState } from 'react';
import { 
  Github, 
  Search, 
  Sparkles, 
  SlidersHorizontal, 
  ExternalLink, 
  Eye, 
  Code, 
  Globe, 
  Rocket, 
  Check, 
  RefreshCw,
  Palette
} from 'lucide-react';
import { ThemePreset } from '../types';

interface NavbarProps {
  githubUsername: string;
  onSearchUser: (username: string) => void;
  isLoading: boolean;
  activeTab: 'preview' | 'editor' | 'guide';
  setActiveTab: (tab: 'preview' | 'editor' | 'guide') => void;
  currentTheme: ThemePreset;
  onThemeChange: (theme: ThemePreset) => void;
  onOpenAiBio: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  githubUsername,
  onSearchUser,
  isLoading,
  activeTab,
  setActiveTab,
  currentTheme,
  onThemeChange,
  onOpenAiBio
}) => {
  const [inputVal, setInputVal] = useState(githubUsername);
  const [copied, setCopied] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputVal.trim()) {
      onSearchUser(inputVal.trim());
    }
  };

  const themeOptions: { id: ThemePreset; label: string; color: string }[] = [
    { id: 'slate', label: 'Dark Slate', color: 'bg-slate-900 border-slate-700' },
    { id: 'emerald', label: 'Emerald Cyber', color: 'bg-emerald-950 border-emerald-700' },
    { id: 'purple', label: 'Purple Sunset', color: 'bg-purple-950 border-purple-700' },
    { id: 'midnight', label: 'Deep Ocean', color: 'bg-blue-950 border-blue-700' },
    { id: 'minimal', label: 'Light Clean', color: 'bg-gray-100 border-gray-300' },
  ];

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-slate-950/80 border-b border-slate-800 text-white transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          
          {/* Logo Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 p-0.5 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Github className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                  DevPage
                </span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  GitHub Sync
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">Generador de Portafolios & GitHub Pages</p>
            </div>
          </div>

          {/* Search Bar GitHub Username */}
          <form onSubmit={handleSearchSubmit} className="flex-1 max-w-md mx-2">
            <div className="relative flex items-center">
              <div className="absolute left-3 text-slate-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Ingresa usuario de GitHub (ej. torvalds, gaearon)..."
                className="w-full pl-9 pr-24 py-1.5 text-sm bg-slate-900/90 border border-slate-800 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="absolute right-1 px-3 py-1 bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-xs rounded-md transition-colors flex items-center gap-1 disabled:opacity-50"
              >
                {isLoading ? (
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <span>Sincronizar</span>
                )}
              </button>
            </div>
          </form>

          {/* Navigation View Modes */}
          <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-lg border border-slate-800">
            <button
              onClick={() => setActiveTab('preview')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                activeTab === 'preview'
                  ? 'bg-cyan-500 text-slate-950 font-semibold shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Vista Previa</span>
            </button>

            <button
              onClick={() => setActiveTab('editor')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                activeTab === 'editor'
                  ? 'bg-cyan-500 text-slate-950 font-semibold shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Personalizar</span>
            </button>

            <button
              onClick={() => setActiveTab('guide')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                activeTab === 'guide'
                  ? 'bg-cyan-500 text-slate-950 font-semibold shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Rocket className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Publicar en GitHub Pages</span>
            </button>
          </div>

          {/* Quick AI & Theme Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenAiBio}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-lg text-xs font-medium transition-all shadow-md shadow-indigo-500/20"
              title="Generar resumen profesional con Gemini IA"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span className="hidden lg:inline">Gemini IA</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
