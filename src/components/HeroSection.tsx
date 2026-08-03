import React from 'react';
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  MapPin, 
  Briefcase, 
  FileText, 
  ExternalLink, 
  Sparkles, 
  BookOpen, 
  Calendar, 
  Globe, 
  CheckCircle2,
  Code
} from 'lucide-react';
import { GitHubUser, PortfolioConfig, CustomLink } from '../types';

interface HeroSectionProps {
  user: GitHubUser;
  config: PortfolioConfig;
  onOpenAiBio?: () => void;
  isEditing?: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  user,
  config,
  onOpenAiBio,
  isEditing
}) => {
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'BookOpen': return <BookOpen className="w-4 h-4" />;
      case 'Calendar': return <Calendar className="w-4 h-4" />;
      case 'Globe': return <Globe className="w-4 h-4" />;
      case 'Code': return <Code className="w-4 h-4" />;
      default: return <ExternalLink className="w-4 h-4" />;
    }
  };

  const getStatusBadge = () => {
    switch (config.statusType) {
      case 'available':
        return {
          text: config.statusText || 'Disponible para ofertas & freelance',
          bg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
          dot: 'bg-emerald-400',
        };
      case 'busy':
        return {
          text: config.statusText || 'Enfocado en proyectos actuales',
          bg: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
          dot: 'bg-amber-400',
        };
      case 'exploring':
      default:
        return {
          text: config.statusText || 'Explorando código abierto & colaboraciones',
          bg: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
          dot: 'bg-blue-400',
        };
    }
  };

  const statusInfo = getStatusBadge();

  return (
    <section id="hero-section" className="relative overflow-hidden rounded-3xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl p-6 sm:p-10 mb-8 shadow-2xl">
      {/* Background Gradient Orbs */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        
        {/* Left Side: Avatar & Core Profile Info */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 flex-1">
          {/* Avatar with Animated Glow */}
          <div className="relative group shrink-0">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 opacity-75 blur transition duration-500 group-hover:opacity-100" />
            <img
              src={config.customAvatarUrl || user.avatar_url}
              alt={config.title || user.name || user.login}
              onError={(e) => {
                // Fallback avatar if link fails to load
                (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(config.title || user.login)}&background=0D8ABC&color=fff&size=256`;
              }}
              className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full object-cover border-2 border-slate-800 shadow-xl bg-slate-800"
            />
            {/* Status Indicator Badge */}
            <div className="absolute bottom-1 right-1 bg-slate-950 p-1.5 rounded-full border border-slate-800 shadow-md">
              <span className={`block w-4 h-4 rounded-full ${statusInfo.dot} animate-pulse`} />
            </div>
          </div>

          {/* Text Content */}
          <div className="space-y-3">
            {/* Status Pill */}
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border ${statusInfo.bg}`}>
              <span className={`w-2 h-2 rounded-full ${statusInfo.dot}`} />
              <span>{statusInfo.text}</span>
            </div>

            {/* Name & Handle */}
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
                {config.title || user.name || user.login}
              </h1>
              <p className="text-lg font-semibold text-cyan-400 mt-1">
                {config.role}
              </p>
              <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                <span>@{user.login}</span>
                {user.company && (
                  <>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Briefcase className="w-3 h-3 text-slate-400" />
                      {user.company}
                    </span>
                  </>
                )}
                {(config.location || user.location) && (
                  <>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      {config.location || user.location}
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Tagline / Bio */}
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed font-normal">
              {config.tagline || user.bio || "Desarrollador apasionado creando soluciones digitales impactantes."}
            </p>

            {/* Social & Contact Bar */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {config.email && (
                <a
                  href={`mailto:${config.email}`}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800/90 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg border border-slate-700/80 transition-all"
                >
                  <Mail className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Email</span>
                </a>
              )}

              {config.githubUrl && (
                <a
                  href={config.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800/90 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg border border-slate-700/80 transition-all"
                >
                  <Github className="w-3.5 h-3.5 text-slate-300" />
                  <span>GitHub</span>
                </a>
              )}

              {config.linkedinUrl && (
                <a
                  href={config.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-900/40 hover:bg-blue-800/60 text-blue-200 text-xs font-medium rounded-lg border border-blue-700/50 transition-all"
                >
                  <Linkedin className="w-3.5 h-3.5 text-blue-400" />
                  <span>LinkedIn</span>
                </a>
              )}

              {config.twitterUrl && (
                <a
                  href={config.twitterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800/90 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg border border-slate-700/80 transition-all"
                >
                  <Twitter className="w-3.5 h-3.5 text-sky-400" />
                  <span>Twitter / X</span>
                </a>
              )}

              {config.customLinks?.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800/90 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg border border-slate-700/80 transition-all"
                >
                  {getIconComponent(link.iconName)}
                  <span>{link.title}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Action Buttons & AI Enhancement Button */}
        <div className="flex flex-col sm:flex-row md:flex-col items-stretch gap-3 shrink-0 w-full md:w-auto">
          {config.resumeUrl && config.resumeUrl !== '#' && (
            <a
              href={config.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-sm rounded-xl shadow-lg shadow-cyan-600/25 transition-all text-center"
            >
              <FileText className="w-4 h-4" />
              <span>Ver Currículum</span>
            </a>
          )}

          {onOpenAiBio && (
            <button
              onClick={onOpenAiBio}
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700/80 text-amber-300 font-medium text-xs rounded-xl transition-all text-center group"
            >
              <Sparkles className="w-4 h-4 text-amber-400 group-hover:rotate-12 transition-transform" />
              <span>Optimizar Perfil con Gemini IA</span>
            </button>
          )}
        </div>

      </div>

      {/* About Me Expanded Paragraph */}
      {config.aboutMe && (
        <div className="mt-8 pt-6 border-t border-slate-800/80">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-2">
            Sobre Mí & Visión
          </h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            {config.aboutMe}
          </p>
        </div>
      )}
    </section>
  );
};
