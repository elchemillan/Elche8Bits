import React, { useState } from 'react';
import { 
  Rocket, 
  Github, 
  CheckCircle2, 
  Copy, 
  Check, 
  Download, 
  Terminal, 
  ExternalLink, 
  HelpCircle,
  Globe,
  Settings,
  ArrowRight,
  FileCode
} from 'lucide-react';

interface GitHubPagesGuideProps {
  githubUsername: string;
}

export const GitHubPagesGuide: React.FC<GitHubPagesGuideProps> = ({ githubUsername }) => {
  const [activeTab, setActiveTab] = useState<'export' | 'workflow' | 'terminal'>('export');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const safeUsername = githubUsername || 'tu-usuario';
  const targetRepoName = `${safeUsername}.github.io`;

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const workflowYaml = `name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: 'pages'
  cancel-in-progress: true

jobs:
  deploy:
    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build project
        run: npm run build

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
`;

  const terminalCommands = `# 1. Clona tu repositorio exportado
git clone https://github.com/${safeUsername}/${targetRepoName}.git
cd ${targetRepoName}

# 2. Instala dependencias
npm install

# 3. Construye el sitio estático para producción
npm run build

# 4. Despliega en GitHub Pages con el paquete gh-pages
npx gh-pages -d dist
`;

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4">
      {/* Banner Intro */}
      <div className="bg-gradient-to-r from-cyan-950 via-slate-900 to-indigo-950 border border-cyan-500/30 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Rocket className="w-3.5 h-3.5" />
              <span>Publicación en GitHub Pages</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Publica tu Sitio Web en <span className="text-cyan-400">https://{targetRepoName}</span>
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm max-w-xl leading-relaxed">
              Sigue esta guía paso a paso para exportar el código fuente completo de tu portafolio y alojarlo de forma 100% gratuita en GitHub Pages.
            </p>
          </div>

          <a
            href={`https://github.com/${safeUsername}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg transition-all shrink-0"
          >
            <Github className="w-4 h-4" />
            <span>Ir a tu Perfil de GitHub</span>
          </a>
        </div>
      </div>

      {/* Deployment Method Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('export')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs transition-all ${
            activeTab === 'export'
              ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Método 1: Exportar desde AI Studio</span>
        </button>

        <button
          onClick={() => setActiveTab('workflow')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs transition-all ${
            activeTab === 'workflow'
              ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <FileCode className="w-4 h-4" />
          <span>Método 2: GitHub Actions (Automatizado)</span>
        </button>

        <button
          onClick={() => setActiveTab('terminal')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs transition-all ${
            activeTab === 'terminal'
              ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Terminal className="w-4 h-4" />
          <span>Método 3: Comando Terminal (Manual)</span>
        </button>
      </div>

      {/* Tab 1: Export via AI Studio */}
      {activeTab === 'export' && (
        <div className="space-y-6">
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-cyan-500 text-slate-950 font-black text-xs flex items-center justify-center">1</span>
              <span>Exporta este proyecto a tu cuenta de GitHub</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Haz clic en el menú superior derecho de <strong>AI Studio</strong> (icono de Ajustes / Compartir) y selecciona la opción <strong>"Export to GitHub"</strong>.
            </p>
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-start gap-3">
              <HelpCircle className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-white">Consejo importante para la URL de tu página:</p>
                <p className="mt-1">
                  Si le pones a tu repositorio el nombre exacto <code className="text-cyan-300 bg-slate-900 px-1.5 py-0.5 rounded">{targetRepoName}</code>, tu página web estará disponible directamente en la dirección raíz: <a href={`https://${targetRepoName}`} target="_blank" rel="noreferrer" className="text-cyan-400 underline">https://{targetRepoName}</a>.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-cyan-500 text-slate-950 font-black text-xs flex items-center justify-center">2</span>
              <span>Activa GitHub Pages en tu repositorio</span>
            </h3>
            <ol className="list-decimal list-inside text-xs text-slate-300 space-y-2 leading-relaxed">
              <li>Abre tu nuevo repositorio en GitHub: <code className="text-cyan-300">https://github.com/{safeUsername}/{targetRepoName}</code></li>
              <li>Ve a la pestaña <strong>Settings (Configuración)</strong> &rarr; <strong>Pages</strong>.</li>
              <li>En <strong>Source (Fuente)</strong>, selecciona <strong>GitHub Actions</strong> o la rama <code className="text-cyan-300">gh-pages / main / dist</code>.</li>
              <li>¡Listo! En menos de 2 minutos tu sitio estará en vivo.</li>
            </ol>
          </div>
        </div>
      )}

      {/* Tab 2: GitHub Actions Workflow */}
      {activeTab === 'workflow' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white">Workflow de GitHub Actions para Despliegue Automático</h3>
              <p className="text-xs text-slate-400">Crea el archivo <code className="text-cyan-300">.github/workflows/deploy.yml</code> en tu repositorio con este contenido:</p>
            </div>
            <button
              onClick={() => copyToClipboard(workflowYaml, 'yaml')}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold transition-colors border border-slate-700"
            >
              {copiedCode === 'yaml' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Copiado</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                  <span>Copiar YAML</span>
                </>
              )}
            </button>
          </div>

          <pre className="p-4 bg-slate-950 rounded-2xl border border-slate-800 font-mono text-[11px] text-cyan-300 overflow-x-auto max-h-96 leading-relaxed">
            {workflowYaml}
          </pre>
        </div>
      )}

      {/* Tab 3: Terminal Commands */}
      {activeTab === 'terminal' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white">Comandos para desplegar desde la terminal de tu computadora</h3>
              <p className="text-xs text-slate-400">Ejecuta estos comandos localmente después de clonar tu repositorio.</p>
            </div>
            <button
              onClick={() => copyToClipboard(terminalCommands, 'cmd')}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold transition-colors border border-slate-700"
            >
              {copiedCode === 'cmd' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Copiado</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                  <span>Copiar Comandos</span>
                </>
              )}
            </button>
          </div>

          <pre className="p-4 bg-slate-950 rounded-2xl border border-slate-800 font-mono text-[11px] text-emerald-400 overflow-x-auto leading-relaxed">
            {terminalCommands}
          </pre>
        </div>
      )}

      {/* Live Site Preview Banner */}
      <div className="p-6 bg-slate-900/80 rounded-2xl border border-slate-800 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20">
            <Globe className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-white">Tu URL Final en GitHub Pages:</h4>
            <a
              href={`https://${targetRepoName}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-cyan-400 hover:underline flex items-center gap-1 mt-0.5"
            >
              <span>https://{targetRepoName}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        <div className="hidden sm:block text-right text-xs text-slate-400">
          <p>Alojamiento ilimitado & Certificado SSL gratuito</p>
        </div>
      </div>
    </div>
  );
};
