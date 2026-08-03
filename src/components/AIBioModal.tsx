import React, { useState } from 'react';
import { Sparkles, X, Check, RefreshCw, Wand2, ArrowRight } from 'lucide-react';
import { GitHubUser, GitHubRepo, PortfolioConfig } from '../types';

interface AIBioModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: GitHubUser;
  repos: GitHubRepo[];
  config: PortfolioConfig;
  onApplyAiBio: (aiData: { tagline: string; aboutMe: string }) => void;
}

export const AIBioModal: React.FC<AIBioModalProps> = ({
  isOpen,
  onClose,
  user,
  repos,
  config,
  onApplyAiBio,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [generatedResult, setGeneratedResult] = useState<{
    tagline: string;
    aboutMe: string;
    skillsSummary?: string;
  } | null>(null);

  if (!isOpen) return null;

  const handleGenerate = async () => {
    setIsLoading(true);
    setErrorMsg(null);

    try {
      const topLanguages = Array.from(new Set(repos.map((r) => r.language).filter(Boolean))) as string[];

      const res = await fetch('/api/ai/bio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: config.title || user.name || user.login,
          bio: user.bio,
          role: config.role,
          languages: topLanguages,
          repos: repos.slice(0, 6).map((r) => ({ name: r.name, description: r.description })),
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Error al conectar con la API de IA.');
      }

      const data = await res.json();
      setGeneratedResult(data);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Ocurrió un error al generar la biografía.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleApply = () => {
    if (generatedResult) {
      onApplyAiBio({
        tagline: generatedResult.tagline,
        aboutMe: generatedResult.aboutMe,
      });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl relative overflow-hidden">
        
        {/* Glow Header */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500" />

        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-xl">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Gemini IA Portfolio Enhancer</h3>
              <p className="text-xs text-slate-400">Genera una biografía ejecutiva para tu perfil en 1 clic.</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-6 space-y-4">
          {!generatedResult && !isLoading && (
            <div className="text-center py-6 space-y-4">
              <Wand2 className="w-12 h-12 text-indigo-400 mx-auto animate-bounce" />
              <div className="max-w-sm mx-auto">
                <p className="text-sm font-medium text-slate-200">
                  Gemini analizó tu usuario <span className="text-cyan-400">@{user.login}</span> y tus repositorios principales.
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Generará un título impactante y una descripción estructurada orientada a reclutadores y colaboradores.
                </p>
              </div>

              <button
                onClick={handleGenerate}
                className="px-6 py-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:opacity-90 text-white font-bold text-xs rounded-xl shadow-lg transition-all flex items-center gap-2 mx-auto"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Generar Biografía Profesional</span>
              </button>
            </div>
          )}

          {isLoading && (
            <div className="text-center py-12 space-y-3">
              <RefreshCw className="w-8 h-8 text-cyan-400 animate-spin mx-auto" />
              <p className="text-sm font-semibold text-white">Analizando perfil y generando síntesis con Gemini IA...</p>
              <p className="text-xs text-slate-400">Por favor espera un segundo.</p>
            </div>
          )}

          {errorMsg && (
            <div className="p-4 bg-rose-950/50 border border-rose-800 rounded-2xl text-rose-200 text-xs text-center">
              {errorMsg}
            </div>
          )}

          {generatedResult && (
            <div className="space-y-4 bg-slate-950 p-5 rounded-2xl border border-slate-800">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">Título Propuesto:</span>
                <p className="text-sm font-bold text-white mt-1">{generatedResult.tagline}</p>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">Resumen Propuesto:</span>
                <p className="text-xs text-slate-300 leading-relaxed mt-1">{generatedResult.aboutMe}</p>
              </div>

              {generatedResult.skillsSummary && (
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">Fortalezas Destacadas:</span>
                  <p className="text-xs text-slate-400 mt-1">{generatedResult.skillsSummary}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {generatedResult && (
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              onClick={handleGenerate}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl transition-colors"
            >
              Re-generar
            </button>
            <button
              onClick={handleApply}
              className="px-5 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg transition-all flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Aplicar a mi Portafolio</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
