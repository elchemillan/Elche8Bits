import React, { useEffect, useState } from 'react';
import { X, Github, RefreshCw, FileText, ExternalLink } from 'lucide-react';
import { GitHubRepo } from '../types';

interface ReadmeModalProps {
  repo: GitHubRepo | null;
  onClose: () => void;
}

export const ReadmeModal: React.FC<ReadmeModalProps> = ({ repo, onClose }) => {
  const [readmeText, setReadmeText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!repo) return;

    const fetchReadme = async () => {
      setIsLoading(true);
      try {
        const [owner] = repo.full_name.split('/');
        const res = await fetch(`/api/github/readme/${owner}/${repo.name}`);
        if (res.ok) {
          const data = await res.json();
          setReadmeText(data.readme || 'No se encontró archivo README.md en este repositorio.');
        } else {
          setReadmeText('No se pudo cargar el archivo README.');
        }
      } catch (err) {
        setReadmeText('Error de conexión al obtener el README.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchReadme();
  }, [repo]);

  if (!repo) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl relative">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-800 rounded-xl text-cyan-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">{repo.name} / README.md</h3>
              <p className="text-xs text-slate-400">{repo.full_name}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-colors"
              title="Ver en GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="py-4 overflow-y-auto flex-1 font-mono text-xs text-slate-300 leading-relaxed whitespace-pre-wrap bg-slate-950 p-4 rounded-2xl border border-slate-800/80 my-2">
          {isLoading ? (
            <div className="flex items-center justify-center py-12 gap-2 text-slate-400">
              <RefreshCw className="w-5 h-5 animate-spin text-cyan-400" />
              <span>Cargando README.md desde GitHub API...</span>
            </div>
          ) : (
            readmeText
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 shrink-0">
          <span>{repo.stargazers_count} ★ en GitHub</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-lg transition-colors"
          >
            Cerrar
          </button>
        </div>

      </div>
    </div>
  );
};
