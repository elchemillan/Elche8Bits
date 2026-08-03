import React, { useState } from 'react';
import { 
  Star, 
  GitFork, 
  ExternalLink, 
  Github, 
  FileText, 
  Pin, 
  Search, 
  Filter, 
  Sparkles,
  BookOpen,
  FolderGit2
} from 'lucide-react';
import { GitHubRepo, CustomProject } from '../types';

interface ProjectsGridProps {
  repos: GitHubRepo[];
  customProjects?: CustomProject[];
  featuredIds: number[];
  onTogglePin?: (id: number) => void;
  onViewReadme?: (repo: GitHubRepo) => void;
  onEnhanceProjectAi?: (repo: GitHubRepo) => void;
  isEditing?: boolean;
}

export const ProjectsGrid: React.FC<ProjectsGridProps> = ({
  repos,
  customProjects = [],
  featuredIds,
  onTogglePin,
  onViewReadme,
  onEnhanceProjectAi,
  isEditing
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('ALL');
  const [activeTab, setActiveTab] = useState<'featured' | 'all'>('featured');

  // Get list of unique languages
  const availableLanguages = Array.from(
    new Set(repos.map((r) => r.language).filter(Boolean))
  ) as string[];

  // Filter repositories
  const filteredRepos = repos.filter((repo) => {
    const matchesSearch =
      repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (repo.description && repo.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      repo.topics?.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesLanguage =
      selectedLanguage === 'ALL' || repo.language === selectedLanguage;

    const matchesTab =
      activeTab === 'all' || featuredIds.includes(repo.id);

    return matchesSearch && matchesLanguage && matchesTab;
  });

  const getLanguageBadgeColor = (lang: string | null) => {
    if (!lang) return 'bg-slate-800 text-slate-400 border-slate-700';
    switch (lang.toLowerCase()) {
      case 'typescript': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'javascript': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'python': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'go': return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20';
      case 'html': return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
      case 'css': return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20';
      default: return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <section id="projects-section" className="mb-12">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <FolderGit2 className="w-6 h-6 text-cyan-400" />
              <span>Proyectos & Repositorios Destacados</span>
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              {filteredRepos.length} repos
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Explora mis repositorios abiertos en GitHub, código fuente y aplicaciones en vivo.
          </p>
        </div>

        {/* Filter Tabs (Featured vs All) */}
        <div className="flex items-center gap-2 bg-slate-900/80 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('featured')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'featured'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Destacados ({featuredIds.length})
          </button>
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'all'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Todos ({repos.length})
          </button>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-6 bg-slate-900/40 p-3 rounded-2xl border border-slate-800/80">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por nombre o tema..."
            className="w-full pl-9 pr-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
          />
        </div>

        {/* Language Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
          <button
            onClick={() => setSelectedLanguage('ALL')}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors shrink-0 ${
              selectedLanguage === 'ALL'
                ? 'bg-slate-700 text-white'
                : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            Todos
          </button>
          {availableLanguages.map((lang) => (
            <button
              key={lang}
              onClick={() => setSelectedLanguage(lang)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors shrink-0 ${
                selectedLanguage === lang
                  ? 'bg-cyan-600 text-white'
                  : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {lang}
            </button>
          ))}
        </div>
      </div>

      {/* Custom Projects Highlight Card (Manual / Overrides) */}
      {customProjects.length > 0 && activeTab === 'featured' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {customProjects.map((p) => (
            <div
              key={p.id}
              className="bg-gradient-to-br from-indigo-950/40 to-slate-900/80 border border-indigo-500/30 rounded-2xl p-6 relative group hover:border-indigo-500 transition-all shadow-xl"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 uppercase tracking-wider">
                  Proyecto Destacado
                </span>
                <div className="flex items-center gap-2">
                  {p.demoUrl && (
                    <a
                      href={p.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors"
                      title="Ver Live Demo"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {p.repoUrl && (
                    <a
                      href={p.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors"
                      title="Código en GitHub"
                    >
                      <Github className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>

              <h3 className="text-lg font-bold text-white mt-3 group-hover:text-indigo-300 transition-colors">
                {p.title}
              </h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                {p.description}
              </p>

              <div className="flex flex-wrap gap-1.5 mt-4">
                {p.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-slate-800/80 text-slate-300 border border-slate-700/60"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Main Grid of Repositories */}
      {filteredRepos.length === 0 ? (
        <div className="text-center py-12 bg-slate-900/40 rounded-2xl border border-slate-800">
          <FolderGit2 className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-slate-300">No se encontraron repositorios</h3>
          <p className="text-xs text-slate-500 mt-1">Prueba cambiando la búsqueda o seleccionando otro filtro de lenguaje.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredRepos.map((repo) => {
            const isPinned = featuredIds.includes(repo.id);

            return (
              <div
                key={repo.id}
                className={`bg-slate-900/60 border rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 ${
                  isPinned
                    ? 'border-cyan-500/40 hover:border-cyan-400 shadow-lg shadow-cyan-500/5'
                    : 'border-slate-800/80 hover:border-slate-700'
                }`}
              >
                <div>
                  {/* Top Bar: Language & Pin / External */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${getLanguageBadgeColor(repo.language)}`}>
                      {repo.language || 'Software'}
                    </span>

                    <div className="flex items-center gap-1.5">
                      {onTogglePin && (
                        <button
                          onClick={() => onTogglePin(repo.id)}
                          className={`p-1.5 rounded-lg text-xs transition-colors ${
                            isPinned
                              ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                              : 'bg-slate-800/60 text-slate-500 hover:text-slate-300'
                          }`}
                          title={isPinned ? 'Desfijar de destacados' : 'Fijar en destacados'}
                        >
                          <Pin className={`w-3.5 h-3.5 ${isPinned ? 'fill-cyan-400' : ''}`} />
                        </button>
                      )}

                      {repo.homepage && (
                        <a
                          href={repo.homepage}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors"
                          title="Ver Sitio Web / Demo"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}

                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors"
                        title="Ver Repositorio en GitHub"
                      >
                        <Github className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 font-bold text-base text-white hover:text-cyan-400 transition-colors"
                  >
                    <span className="truncate">{repo.name}</span>
                  </a>

                  <p className="text-xs text-slate-300 mt-2 line-clamp-3 leading-relaxed">
                    {repo.description || 'Sin descripción en el repositorio.'}
                  </p>

                  {/* Topics Tags */}
                  {repo.topics && repo.topics.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-3">
                      {repo.topics.slice(0, 4).map((topic) => (
                        <span
                          key={topic}
                          className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-800/80 text-slate-400 border border-slate-700/50"
                        >
                          #{topic}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer Meta: Stars, Forks, README button, AI enhance */}
                <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center gap-3 font-medium">
                    <span className="flex items-center gap-1 hover:text-amber-400 transition-colors">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400/20" />
                      {repo.stargazers_count}
                    </span>
                    <span className="flex items-center gap-1 hover:text-cyan-400 transition-colors">
                      <GitFork className="w-3.5 h-3.5 text-cyan-400" />
                      {repo.forks_count}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {onEnhanceProjectAi && (
                      <button
                        onClick={() => onEnhanceProjectAi(repo)}
                        className="flex items-center gap-1 px-2 py-1 text-[10px] bg-indigo-950/60 hover:bg-indigo-900/80 text-indigo-300 border border-indigo-500/30 rounded-md transition-colors"
                        title="Mejorar descripción con Gemini IA"
                      >
                        <Sparkles className="w-3 h-3 text-indigo-400" />
                        <span>IA</span>
                      </button>
                    )}

                    {onViewReadme && (
                      <button
                        onClick={() => onViewReadme(repo)}
                        className="flex items-center gap-1 px-2 py-1 text-[10px] bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-md transition-colors"
                        title="Ver README"
                      >
                        <FileText className="w-3 h-3" />
                        <span>README</span>
                      </button>
                    )}
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
