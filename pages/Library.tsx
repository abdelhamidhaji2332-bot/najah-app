
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { SUBJECTS, FILIERE_SUBJECTS } from '../constants.tsx';
import { Filiere, BacLevel } from '../types.ts';
import { 
  Cloud, 
  ChevronRight,
  Layers,
  Search,
  Zap,
  FolderLock
} from 'lucide-react';

const Library: React.FC = () => {
  const navigate = useNavigate();
  const [selectedFiliere, setSelectedFiliere] = useState<Filiere>(() => 
    (localStorage.getItem('filiere') as Filiere) || Filiere.PC
  );
  
  const [level] = useState<BacLevel>(() => {
    return (localStorage.getItem('bac_level') as BacLevel) || BacLevel.BAC2;
  });

  const subjects = useMemo(() => {
    const subjectIds = FILIERE_SUBJECTS[selectedFiliere] || [];
    return SUBJECTS.filter(s => subjectIds.includes(s.id));
  }, [selectedFiliere]);

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700 bg-black min-h-screen">
      <header className="space-y-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="bg-blue-600/10 text-blue-400 text-[10px] font-black uppercase tracking-[0.3em] px-5 py-2 rounded-full border border-blue-500/20 shadow-glow">Cloud Library v4.5</span>
            </div>
            <h1 className="text-6xl font-black text-white tracking-tighter uppercase leading-none">Bibliothèque <span className="text-blue-500 text-glow">Cloud</span></h1>
            <p className="text-xl text-slate-500 font-medium max-w-2xl italic leading-relaxed">
              Accédez directement aux archives Drive de votre filière pour le {level}.
            </p>
          </div>

          <div className="relative group w-full lg:w-96">
            <Search className="absolute left-6 top-6 w-5 h-5 text-slate-600 group-focus-within:text-blue-500 transition-colors" />
            <input 
              type="text" placeholder="Trouver une ressource..." 
              className="bg-slate-900/50 border border-white/5 rounded-[2rem] py-6 pl-16 pr-8 text-sm font-medium outline-none focus:ring-4 focus:ring-blue-500/10 shadow-inner transition-all w-full text-white placeholder-slate-600"
            />
          </div>
        </div>

        {/* Featured Card */}
        <div className="p-12 bg-indigo-600/10 border border-indigo-500/20 rounded-[4rem] flex flex-col lg:flex-row items-center justify-between gap-10 relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-600/20 rounded-full blur-[100px] -mr-40 -mt-40 transition-transform duration-[3s] group-hover:scale-150" />
           <div className="flex items-center gap-8 relative z-10">
              <div className="w-24 h-24 bg-indigo-600 rounded-[2.5rem] flex items-center justify-center text-white shadow-glow group-hover:rotate-[15deg] transition-transform">
                 <Cloud className="w-12 h-12" />
              </div>
              <div className="space-y-1">
                 <h4 className="text-4xl font-black text-white tracking-tighter uppercase leading-none">Espace Cloud Najah</h4>
                 <p className="text-slate-400 font-medium text-lg italic">Fichiers PDF, Vidéos et Séries d'exercices synchronisés.</p>
              </div>
           </div>
           <div className="flex items-center gap-4 relative z-10">
              <div className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400">
                <FolderLock className="w-4 h-4 text-indigo-500" /> Sécurisé
              </div>
           </div>
        </div>

        {/* Filiere Selector */}
        <div className="flex overflow-x-auto pb-6 gap-4 no-scrollbar -mx-2 px-2">
          {Object.values(Filiere).map((f) => (
            <button
              key={f}
              onClick={() => { setSelectedFiliere(f); localStorage.setItem('filiere', f); }}
              className={`
                flex-shrink-0 flex items-center gap-4 px-10 py-5 rounded-[2rem] border transition-all duration-500 active:scale-95 shadow-2xl
                ${selectedFiliere === f 
                  ? 'bg-blue-600 border-blue-500 text-white shadow-[0_15px_30px_-5px_rgba(37,99,235,0.4)]' 
                  : 'bg-slate-900/50 border-white/5 text-slate-600 hover:border-slate-700 hover:text-slate-400'}
              `}
            >
              <Layers className={`w-5 h-5 ${selectedFiliere === f ? 'text-white' : 'text-slate-700'}`} />
              <span className="font-black text-[11px] uppercase tracking-[0.2em] whitespace-nowrap">{f}</span>
            </button>
          ))}
        </div>
      </header>

      {/* Grid of Subjects/Volumes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {subjects.map((sub) => (
          <button
            key={sub.id}
            onClick={() => navigate(`/library/${sub.id}`)}
            className="group relative glass-card p-12 rounded-[3.5rem] border border-white/5 hover:border-blue-500/40 transition-all duration-700 text-left overflow-hidden bg-black/40 premium-shadow"
          >
            <div className={`absolute top-0 right-0 w-48 h-48 ${sub.color.replace('bg-', 'bg-')}/10 rounded-full -mr-24 -mt-24 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000`} />
            
            <div className={`w-16 h-16 ${sub.color} rounded-[1.75rem] flex items-center justify-center text-white shadow-2xl mb-10 group-hover:rotate-[8deg] group-hover:scale-110 transition-transform duration-700 border border-white/10`}>
              <Zap className="w-8 h-8" />
            </div>

            <div className="space-y-4 relative z-10">
              <h3 className="text-4xl font-black text-white tracking-tighter group-hover:text-blue-400 transition-colors uppercase leading-tight">{sub.name}</h3>
              <p className="text-[11px] font-black text-slate-500 uppercase tracking-[0.3em]">Volume de Ressources Cloud</p>
            </div>

            <div className="mt-12 flex items-center justify-between">
              <div className="flex items-center gap-3">
                 <div className="px-3 py-1 bg-white/5 rounded-lg border border-white/5 text-[9px] font-black uppercase text-slate-500">PDF</div>
                 <div className="px-3 py-1 bg-white/5 rounded-lg border border-white/5 text-[9px] font-black uppercase text-slate-500">DOCS</div>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-white/5 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center transition-all duration-500 shadow-inner group-hover:shadow-[0_10px_20px_rgba(37,99,235,0.3)]">
                <ChevronRight className="w-7 h-7 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Library;
