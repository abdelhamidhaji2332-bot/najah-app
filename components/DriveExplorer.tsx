import React, { useState } from 'react';
import { 
  FolderOpen, 
  Home, 
  ExternalLink, 
  X, 
  Info, 
  ChevronRight,
  ShieldCheck,
  Globe,
  ArrowLeft,
  LayoutGrid,
  RefreshCw
} from 'lucide-react';

interface DriveExplorerProps {
  url: string;
  title: string;
  subjectName: string;
  chapterTitle: string;
  onClose: () => void;
}

const DriveExplorer: React.FC<DriveExplorerProps> = ({ 
  url, 
  title, 
  subjectName, 
  chapterTitle, 
  onClose 
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [key, setKey] = useState(0);

  const folderId = url.match(/folders\/([a-zA-Z0-9_-]+)/)?.[1];
  const embedUrl = `https://drive.google.com/embeddedfolderview?id=${folderId}#grid`;

  const resetToRoot = () => {
    setIsLoading(true);
    setKey(prev => prev + 1);
  };

  return (
    <div className="flex flex-col h-[750px] lg:h-[900px] bg-[#050505] border border-white/10 rounded-[4rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.9)] animate-in slide-in-from-bottom-6 duration-700">
      {/* High-Fidelity Browser Bar */}
      <div className="px-10 py-10 border-b border-white/5 bg-black/80 backdrop-blur-3xl flex flex-col md:flex-row md:items-center justify-between gap-10">
        <div className="flex items-center gap-6 overflow-hidden">
          <button 
            onClick={onClose}
            className="p-5 bg-white/5 hover:bg-white/10 rounded-2xl text-slate-500 hover:text-white transition-all group shrink-0"
            title="Sortir de l'espace de travail"
          >
            <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
          </button>

          <div className="flex flex-col min-w-0">
            {/* Contextual Path */}
            <nav className="flex items-center gap-2 mb-2.5 overflow-hidden text-[10px] font-black uppercase tracking-widest text-slate-600">
              <span className="truncate max-w-[100px]">{subjectName}</span>
              <ChevronRight className="w-3 h-3 text-slate-800" />
              <span className="truncate max-w-[120px]">{chapterTitle}</span>
              <ChevronRight className="w-3 h-3 text-slate-800" />
              <span className="text-blue-500">Cloud Najah</span>
            </nav>
            
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 bg-amber-600/10 rounded-2xl flex items-center justify-center text-amber-500 border border-amber-600/20 shadow-inner shrink-0">
                  <FolderOpen className="w-6 h-6" />
               </div>
               <h3 className="text-3xl font-black text-white uppercase tracking-tighter truncate leading-none">
                 {title}
               </h3>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <button 
            onClick={resetToRoot}
            className="flex items-center gap-3 px-8 py-5 bg-slate-900 border border-white/5 text-slate-400 hover:text-white rounded-[1.75rem] transition-all group hover:bg-slate-800"
          >
            <RefreshCw className={`w-5 h-5 group-hover:rotate-180 transition-transform duration-700 ${isLoading ? 'animate-spin' : ''}`} />
            <span className="text-[10px] font-black uppercase tracking-widest">Réinitialiser</span>
          </button>
          
          <a 
            href={url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-8 py-5 bg-blue-600 text-white rounded-[1.75rem] transition-all hover:bg-blue-700 shadow-glow active:scale-95"
          >
            <ExternalLink className="w-5 h-5" />
            <span className="text-[10px] font-black uppercase tracking-widest">Plein Écran</span>
          </a>

          <div className="w-[1px] h-12 bg-white/10 mx-2 hidden md:block" />

          <button 
            onClick={onClose}
            className="p-5 bg-red-600/10 border border-red-500/20 text-red-500 rounded-2xl hover:bg-red-600 hover:text-white transition-all active:scale-90"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Explorer Workspace */}
      <div className="flex-1 relative bg-white">
        {isLoading && (
          <div className="absolute inset-0 z-30 bg-black flex flex-col items-center justify-center gap-10 px-10 text-center">
            <div className="relative">
              <div className="w-36 h-36 border-4 border-blue-600/10 border-t-blue-600 rounded-full animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Globe className="w-14 h-14 text-blue-500 animate-pulse" />
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-3xl font-black text-white uppercase tracking-[0.4em] animate-pulse">Exploration Sécurisée...</p>
              <p className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.2em] max-w-sm mx-auto leading-relaxed">
                NAJAH prépare votre espace de travail. La navigation entre sous-dossiers est activée automatiquement.
              </p>
            </div>
          </div>
        )}

        <iframe 
          key={key}
          src={embedUrl}
          className={`w-full h-full border-none transition-all duration-1000 ${isLoading ? 'opacity-0 scale-98 blur-lg' : 'opacity-100 scale-100 blur-0'}`}
          onLoad={() => setIsLoading(false)}
          allow="autoplay; encrypted-media; clipboard-read; clipboard-write; fullscreen"
          sandbox="allow-forms allow-modals allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
          title={`Espace Cloud: ${title}`}
        />
      </div>

      {/* Footer Info Bar */}
      <footer className="px-12 py-8 bg-black border-t border-white/5 flex flex-wrap items-center justify-between gap-10">
        <div className="flex items-center gap-12">
          <div className="flex items-center gap-4">
            <div className="w-3 h-3 bg-emerald-500 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.8)] animate-pulse" />
            <span className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em]">Synchronisation Active</span>
          </div>
          <div className="hidden lg:flex items-center gap-4 text-slate-700">
            <Info className="w-5 h-5 text-blue-500" />
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] italic">
              Double-cliquez pour naviguer en profondeur. Utilisez les contrôles de l'application pour revenir à la racine.
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-3 text-slate-800">
             <ShieldCheck className="w-5 h-5" />
             <span className="text-[10px] font-black uppercase tracking-[0.2em]">Espace Protégé v4.8</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DriveExplorer;