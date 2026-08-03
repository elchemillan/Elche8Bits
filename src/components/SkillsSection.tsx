import React from 'react';
import { Wrench, Code, Server, Database, Cloud, Terminal } from 'lucide-react';
import { SkillItem } from '../types';

interface SkillsSectionProps {
  skills: SkillItem[];
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ skills }) => {
  const categories: SkillItem['category'][] = [
    'Frontend',
    'Backend',
    'Database',
    'DevOps & Cloud',
    'Herramientas',
  ];

  const getCategoryIcon = (cat: SkillItem['category']) => {
    switch (cat) {
      case 'Frontend': return <Code className="w-4 h-4 text-cyan-400" />;
      case 'Backend': return <Server className="w-4 h-4 text-emerald-400" />;
      case 'Database': return <Database className="w-4 h-4 text-amber-400" />;
      case 'DevOps & Cloud': return <Cloud className="w-4 h-4 text-purple-400" />;
      default: return <Terminal className="w-4 h-4 text-blue-400" />;
    }
  };

  return (
    <section id="skills-section" className="mb-12">
      <div className="flex items-center gap-2 mb-6">
        <Wrench className="w-6 h-6 text-cyan-400" />
        <h2 className="text-2xl font-bold tracking-tight text-white">
          Habilidades Tecnológicas & Stack
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {categories.map((cat) => {
          const catSkills = skills.filter((s) => s.category === cat);
          if (catSkills.length === 0) return null;

          return (
            <div
              key={cat}
              className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-md hover:border-slate-700 transition-all"
            >
              <div className="flex items-center gap-2.5 pb-3 mb-4 border-b border-slate-800/80">
                <div className="p-2 bg-slate-800/80 rounded-xl">
                  {getCategoryIcon(cat)}
                </div>
                <h3 className="font-bold text-sm text-white">{cat}</h3>
              </div>

              <div className="space-y-3">
                {catSkills.map((skill) => (
                  <div key={skill.name} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-slate-200">{skill.name}</span>
                      {skill.level && (
                        <span className="text-slate-400">{skill.level}%</span>
                      )}
                    </div>

                    {skill.level && (
                      <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                        <div
                          style={{ width: `${skill.level}%` }}
                          className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-500"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
