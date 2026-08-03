import React from 'react';
import { Briefcase, Calendar, Building, Sparkles } from 'lucide-react';
import { ExperienceItem } from '../types';

interface ExperienceSectionProps {
  experiences: ExperienceItem[];
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ experiences }) => {
  if (!experiences || experiences.length === 0) return null;

  return (
    <section id="experience-section" className="mb-12">
      <div className="flex items-center gap-2 mb-6">
        <Briefcase className="w-6 h-6 text-cyan-400" />
        <h2 className="text-2xl font-bold tracking-tight text-white">
          Trayectoria Profesional
        </h2>
      </div>

      <div className="relative pl-6 sm:pl-8 border-l-2 border-slate-800 space-y-8">
        {experiences.map((exp, idx) => (
          <div key={exp.id || idx} className="relative group">
            {/* Timeline Dot */}
            <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-slate-950 border-2 border-cyan-400 group-hover:scale-125 group-hover:bg-cyan-400 transition-all shadow-md shadow-cyan-500/20" />

            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-md hover:border-slate-700 transition-all">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {exp.role}
                  </h3>
                  <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 mt-0.5">
                    <Building className="w-3.5 h-3.5" />
                    <span>{exp.company}</span>
                  </div>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-800/80 border border-slate-700/60 text-slate-300 text-xs font-medium rounded-full w-fit">
                  <Calendar className="w-3 h-3 text-cyan-400" />
                  <span>{exp.period}</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-3">
                {exp.description}
              </p>

              {exp.tags && exp.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-slate-800 text-slate-300 border border-slate-700/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
