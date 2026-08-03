import React, { useState } from 'react';
import { 
  User, 
  Briefcase, 
  Wrench, 
  FolderGit2, 
  Plus, 
  Trash2, 
  Save, 
  Palette, 
  Sparkles, 
  Check, 
  Link as LinkIcon 
} from 'lucide-react';
import { PortfolioConfig, ThemePreset, SkillItem, ExperienceItem, CustomProject } from '../types';

interface CustomizerPanelProps {
  config: PortfolioConfig;
  userAvatar?: string;
  onChangeConfig: (newConfig: PortfolioConfig) => void;
  onOpenAiBio: () => void;
  onSave?: () => void;
}

export const CustomizerPanel: React.FC<CustomizerPanelProps> = ({
  config,
  userAvatar,
  onChangeConfig,
  onOpenAiBio,
  onSave
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'projects' | 'skills' | 'experience' | 'theme'>('profile');

  const handleProfileChange = (field: keyof PortfolioConfig, value: any) => {
    onChangeConfig({ ...config, [field]: value });
  };

  // Skill handlers
  const handleAddSkill = () => {
    const newSkill: SkillItem = { name: 'Nueva Tecnología', category: 'Frontend', level: 80 };
    onChangeConfig({ ...config, skills: [...config.skills, newSkill] });
  };

  const handleUpdateSkill = (index: number, field: keyof SkillItem, value: any) => {
    const updated = [...config.skills];
    updated[index] = { ...updated[index], [field]: value };
    onChangeConfig({ ...config, skills: updated });
  };

  const handleRemoveSkill = (index: number) => {
    const updated = config.skills.filter((_, i) => i !== index);
    onChangeConfig({ ...config, skills: updated });
  };

  // Experience handlers
  const handleAddExperience = () => {
    const newExp: ExperienceItem = {
      id: Date.now().toString(),
      role: 'Nuevo Cargo',
      company: 'Empresa',
      period: '2023 - Presente',
      description: 'Descripción de logros y responsabilidades...',
      tags: ['TypeScript', 'React'],
    };
    onChangeConfig({ ...config, experiences: [...config.experiences, newExp] });
  };

  const handleUpdateExperience = (id: string, field: keyof ExperienceItem, value: any) => {
    const updated = config.experiences.map((exp) =>
      exp.id === id ? { ...exp, [field]: value } : exp
    );
    onChangeConfig({ ...config, experiences: updated });
  };

  const handleRemoveExperience = (id: string) => {
    const updated = config.experiences.filter((exp) => exp.id !== id);
    onChangeConfig({ ...config, experiences: updated });
  };

  // Custom Projects handlers
  const handleAddCustomProject = () => {
    const newProj: CustomProject = {
      id: 'cp-' + Date.now(),
      title: 'Nuevo Proyecto Especial',
      description: 'Descripción detallada de las tecnologías y problemas resueltos en este proyecto.',
      tags: ['React', 'Node.js'],
      demoUrl: 'https://demo.com',
      repoUrl: 'https://github.com',
      featured: true,
    };
    onChangeConfig({ ...config, customProjects: [...config.customProjects, newProj] });
  };

  const handleUpdateCustomProject = (id: string, field: keyof CustomProject, value: any) => {
    const updated = config.customProjects.map((p) =>
      p.id === id ? { ...p, [field]: value } : p
    );
    onChangeConfig({ ...config, customProjects: updated });
  };

  const handleRemoveCustomProject = (id: string) => {
    const updated = config.customProjects.filter((p) => p.id !== id);
    onChangeConfig({ ...config, customProjects: updated });
  };

  const themeOptions: { id: ThemePreset; name: string; desc: string; bg: string }[] = [
    { id: 'slate', name: 'Dark Slate', desc: 'Gris oscuro profesional y elegante', bg: 'bg-slate-900 border-slate-700' },
    { id: 'emerald', name: 'Emerald Cyber', desc: 'Verde cibernético con tonos oscuros', bg: 'bg-emerald-950 border-emerald-700' },
    { id: 'purple', name: 'Purple Sunset', desc: 'Púrpura moderno para creadores', bg: 'bg-purple-950 border-purple-700' },
    { id: 'midnight', name: 'Deep Ocean', desc: 'Azul profundo de alta legibilidad', bg: 'bg-blue-950 border-blue-700' },
    { id: 'minimal', name: 'Light Clean', desc: 'Diseño claro y minimalista', bg: 'bg-gray-100 border-gray-300' },
  ];

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl mb-12 shadow-2xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800 mb-6">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Palette className="w-5 h-5 text-cyan-400" />
            <span>Panel de Personalización de Portafolio</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Modifica la información, el tema visual, los textos y los contenidos de tu web en tiempo real.
          </p>
        </div>

        <button
          onClick={onOpenAiBio}
          className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium text-xs rounded-xl shadow-lg transition-all"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>Generar Bio con Gemini IA</span>
        </button>
      </div>

      {/* Tabs Bar */}
      <div className="flex flex-wrap items-center gap-2 mb-8 bg-slate-950/60 p-1.5 rounded-2xl border border-slate-800">
        <button
          onClick={() => setActiveTab('profile')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'profile'
              ? 'bg-cyan-500 text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <User className="w-4 h-4" />
          <span>Perfil & Textos</span>
        </button>

        <button
          onClick={() => setActiveTab('projects')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'projects'
              ? 'bg-cyan-500 text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <FolderGit2 className="w-4 h-4" />
          <span>Proyectos Especiales</span>
        </button>

        <button
          onClick={() => setActiveTab('skills')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'skills'
              ? 'bg-cyan-500 text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Wrench className="w-4 h-4" />
          <span>Habilidades & Stack</span>
        </button>

        <button
          onClick={() => setActiveTab('experience')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'experience'
              ? 'bg-cyan-500 text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>Trayectoria</span>
        </button>

        <button
          onClick={() => setActiveTab('theme')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'theme'
              ? 'bg-cyan-500 text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Palette className="w-4 h-4" />
          <span>Tema & Estilos</span>
        </button>
      </div>

      {/* Tab Content 1: Profile */}
      {activeTab === 'profile' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Avatar Photo Editor */}
          <div className="md:col-span-2 bg-slate-950 p-4 border border-slate-800 rounded-2xl flex flex-col sm:flex-row items-center gap-4">
            <img
              src={config.customAvatarUrl || userAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
              alt="Avatar preview"
              className="w-16 h-16 rounded-full object-cover border-2 border-cyan-500/50 shadow-md shrink-0 bg-slate-800"
              onError={(e) => {
                (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(config.title || 'User')}&background=0D8ABC&color=fff&size=256`;
              }}
            />
            <div className="flex-1 w-full space-y-1">
              <label className="block text-xs font-semibold text-slate-300">Foto de Perfil (URL de la Imagen)</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={config.customAvatarUrl || ''}
                  onChange={(e) => handleProfileChange('customAvatarUrl', e.target.value)}
                  placeholder={userAvatar || 'https://github.com/username.png'}
                  className="flex-1 px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-cyan-500"
                />
                {userAvatar && (
                  <button
                    type="button"
                    onClick={() => handleProfileChange('customAvatarUrl', userAvatar)}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs font-medium rounded-xl border border-slate-700 transition-colors shrink-0"
                  >
                    Usar de GitHub
                  </button>
                )}
              </div>
              <p className="text-[11px] text-slate-500">Cargada automáticamente desde GitHub. Puedes cambiar la URL o restaurar la foto original.</p>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Nombre Completo</label>
            <input
              type="text"
              value={config.title}
              onChange={(e) => handleProfileChange('title', e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-cyan-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Título / Rol Profesional</label>
            <input
              type="text"
              value={config.role}
              onChange={(e) => handleProfileChange('role', e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-cyan-500"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-slate-300 mb-1">Frase Principal (Tagline)</label>
            <input
              type="text"
              value={config.tagline}
              onChange={(e) => handleProfileChange('tagline', e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-cyan-500"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-slate-300 mb-1">Sección "Sobre Mí"</label>
            <textarea
              rows={3}
              value={config.aboutMe}
              onChange={(e) => handleProfileChange('aboutMe', e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-cyan-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Estado / Disponibilidad</label>
            <select
              value={config.statusType}
              onChange={(e) => handleProfileChange('statusType', e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-cyan-500"
            >
              <option value="available">Disponible para ofertas & freelance</option>
              <option value="busy">Enfocado en proyectos actuales</option>
              <option value="exploring">Explorando código abierto & colaboraciones</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Texto del Estado</label>
            <input
              type="text"
              value={config.statusText}
              onChange={(e) => handleProfileChange('statusText', e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-cyan-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Ubicación</label>
            <input
              type="text"
              value={config.location}
              onChange={(e) => handleProfileChange('location', e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-cyan-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Email de Contacto</label>
            <input
              type="email"
              value={config.email}
              onChange={(e) => handleProfileChange('email', e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-cyan-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">URL Perfil LinkedIn</label>
            <input
              type="text"
              value={config.linkedinUrl}
              onChange={(e) => handleProfileChange('linkedinUrl', e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-cyan-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">URL Currículum (PDF / Link)</label>
            <input
              type="text"
              value={config.resumeUrl}
              onChange={(e) => handleProfileChange('resumeUrl', e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-cyan-500"
            />
          </div>
        </div>
      )}

      {/* Tab Content 2: Custom Projects */}
      {activeTab === 'projects' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">Proyectos Personalizados (No en GitHub)</h3>
            <button
              onClick={handleAddCustomProject}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs rounded-lg transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Añadir Proyecto</span>
            </button>
          </div>

          {config.customProjects.map((proj) => (
            <div key={proj.id} className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
              <div className="flex items-center justify-between gap-2">
                <input
                  type="text"
                  value={proj.title}
                  onChange={(e) => handleUpdateCustomProject(proj.id, 'title', e.target.value)}
                  className="font-bold text-sm bg-transparent text-white focus:outline-none border-b border-slate-800 focus:border-cyan-500 w-full"
                  placeholder="Título del proyecto"
                />
                <button
                  onClick={() => handleRemoveCustomProject(proj.id)}
                  className="p-1.5 text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <textarea
                rows={2}
                value={proj.description}
                onChange={(e) => handleUpdateCustomProject(proj.id, 'description', e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                placeholder="Descripción del proyecto..."
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  value={proj.demoUrl}
                  onChange={(e) => handleUpdateCustomProject(proj.id, 'demoUrl', e.target.value)}
                  className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200"
                  placeholder="URL Demo (ej. https://mydemo.com)"
                />
                <input
                  type="text"
                  value={proj.tags.join(', ')}
                  onChange={(e) => handleUpdateCustomProject(proj.id, 'tags', e.target.value.split(',').map((t) => t.trim()))}
                  className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200"
                  placeholder="Tags separados por coma (ej. React, AI)"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab Content 3: Skills */}
      {activeTab === 'skills' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">Gestionar Habilidades Tecnológicas</h3>
            <button
              onClick={handleAddSkill}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs rounded-lg transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Añadir Habilidad</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {config.skills.map((skill, index) => (
              <div key={index} className="flex items-center gap-2 p-3 bg-slate-950 border border-slate-800 rounded-xl">
                <input
                  type="text"
                  value={skill.name}
                  onChange={(e) => handleUpdateSkill(index, 'name', e.target.value)}
                  className="bg-transparent text-xs text-white font-semibold focus:outline-none w-1/3"
                />

                <select
                  value={skill.category}
                  onChange={(e) => handleUpdateSkill(index, 'category', e.target.value as any)}
                  className="bg-slate-900 text-xs text-slate-300 border border-slate-800 rounded px-2 py-1"
                >
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                  <option value="Database">Database</option>
                  <option value="DevOps & Cloud">DevOps & Cloud</option>
                  <option value="Herramientas">Herramientas</option>
                </select>

                <input
                  type="number"
                  min={10}
                  max={100}
                  value={skill.level || 80}
                  onChange={(e) => handleUpdateSkill(index, 'level', Number(e.target.value))}
                  className="w-16 bg-slate-900 text-xs text-slate-300 border border-slate-800 rounded px-2 py-1 text-center"
                />

                <button
                  onClick={() => handleRemoveSkill(index)}
                  className="p-1 text-rose-400 hover:bg-rose-500/10 rounded transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab Content 4: Experience */}
      {activeTab === 'experience' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">Gestionar Experiencia Laboral</h3>
            <button
              onClick={handleAddExperience}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs rounded-lg transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Añadir Experiencia</span>
            </button>
          </div>

          {config.experiences.map((exp) => (
            <div key={exp.id} className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
              <div className="flex items-center justify-between gap-2">
                <input
                  type="text"
                  value={exp.role}
                  onChange={(e) => handleUpdateExperience(exp.id, 'role', e.target.value)}
                  className="font-bold text-sm bg-transparent text-white focus:outline-none border-b border-slate-800 focus:border-cyan-500 w-1/2"
                  placeholder="Cargo / Puesto"
                />
                <input
                  type="text"
                  value={exp.company}
                  onChange={(e) => handleUpdateExperience(exp.id, 'company', e.target.value)}
                  className="text-xs text-cyan-400 font-semibold bg-transparent focus:outline-none border-b border-slate-800 focus:border-cyan-500 w-1/3"
                  placeholder="Empresa"
                />
                <button
                  onClick={() => handleRemoveExperience(exp.id)}
                  className="p-1.5 text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <input
                type="text"
                value={exp.period}
                onChange={(e) => handleUpdateExperience(exp.id, 'period', e.target.value)}
                className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-300"
                placeholder="Periodo (ej. 2022 - Presente)"
              />

              <textarea
                rows={2}
                value={exp.description}
                onChange={(e) => handleUpdateExperience(exp.id, 'description', e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                placeholder="Logos y funciones clave..."
              />
            </div>
          ))}
        </div>
      )}

      {/* Tab Content 5: Theme */}
      {activeTab === 'theme' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {themeOptions.map((th) => (
            <button
              key={th.id}
              onClick={() => handleProfileChange('theme', th.id)}
              className={`p-5 rounded-2xl border text-left transition-all ${th.bg} ${
                config.theme === th.id
                  ? 'ring-2 ring-cyan-400 border-cyan-400 shadow-xl'
                  : 'hover:border-slate-600'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-sm text-white">{th.name}</span>
                {config.theme === th.id && (
                  <Check className="w-4 h-4 text-cyan-400" />
                )}
              </div>
              <p className="text-xs text-slate-400">{th.desc}</p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
