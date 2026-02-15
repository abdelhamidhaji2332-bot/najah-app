import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { SUBJECTS, FILIERE_SUBJECTS, CHAPTERS, ALLOSCHOOL_BAC2 } from '../constants.tsx';
import { Filiere, BacLevel } from '../types.ts';
import PdfViewer from '../components/PdfViewer.tsx';
import { 
  BookOpen, 
  ChevronRight,
  Layers,
  Search,
  Sparkles,
  Zap,
  Globe,
  ExternalLink
} from 'lucide-react';

const Subjects: React.FC = () => {
  const navigate = useNavigate();
  const [selectedFiliere, setSelectedFiliere] = useState<Filiere>(() => 
    (localStorage.getItem('filiere') as Filiere) || Filiere.PC
  );
  
  const [level] = useState<BacLevel>(() => {
    return (localStorage.getItem('bac_level') as BacLevel) || BacLevel.BAC2;
  });

  const [viewerUrl, setViewerUrl] = useState<{url: string, title: string} | null>(null);

  const subjects = useMemo(() => {
    const subjectIds = FILIERE_SUBJECTS[selectedFiliere] || [];
    return SUBJECTS.filter(s => subjectIds.includes(s.id));
  }, [selectedFiliere]);

  const completedList = useMemo(() => JSON.parse(localStorage.getItem('najah_seen_lessons') || '[]'), []);

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700 bg-black min-h-screen">
      {viewerUrl && (
        <PdfViewer 
          url={viewerUrl.url}
          title={viewerUrl.title}
          onClose={() => setViewerUrl(null)}
        />
      )}

      <header className="space-y-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="bg-blue-600/10 text-blue-400 text-[10px] font-black uppercase tracking-[0.3em] px-5 py-2 rounded-full border border-blue-500/20 shadow-glow">Curriculum Officiel 2025</span>
            </div>
            <h1 className="text-6xl font-black text-white tracking-tighter uppercase leading-none">Cours & <span className="text-blue-500 text-glow">Programmes</span></h1>
            <p className="text-xl text-slate-500 font-medium max-w-2xl italic leading-relaxed">
              Exploration exhaustive du programme ministériel pour le {level}.
            </p>
          </div>

          <div className="relative group w-full lg:w-96">
            <Search className="absolute left-6 top-6 w-5 h-5 text-slate-600 group-focus-within:text-blue-500 transition-colors" />
            <input 
              type="text" placeholder="Chercher une matière..." 
              className="bg-slate-900/50 border border-white/5 rounded-[2rem] py-6 pl-16 pr-8 text-sm font-medium outline-none focus:ring-4 focus:ring-blue-500/10 shadow-inner transition-all w-full text-white placeholder-slate-600"
            />
          </div>
        </div>

        {/* Featured Resource: AlloSchool */}
        <div className="p-8 lg:p-12 bg-blue-600/5 border border-blue-500/20 rounded-[3.5rem] flex flex-col lg:flex-row items-center justify-between gap-10 relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[80px] -mr-32 -mt-32 transition-transform duration-1000 group-hover:scale-125" />
           <div className="flex items-center gap-8 relative z-10">
              <div className="w-20 h-20 bg-blue-600 rounded-[2rem] flex items-center justify-center text-white shadow-glow group-hover:rotate-6 transition-transform">
                 <Globe className="w-10 h-10" />
              </div>
              <div>
                 <h4 className="text-3xl font-black text-white tracking-tighter uppercase">Bibliothèque AlloSchool</h4>
                 <p className="text-slate-400 font-medium text-lg italic mt-1">Accès direct aux ressources de la 2ème année du Baccalauréat.</p>
              </div>
           </div>
           <button 
            onClick={() => setViewerUrl({ url: ALLOSCHOOL_BAC2, title: "AlloSchool: 2ème Année Bac" })}
            className="w-full lg:w-auto px-10 py-5 bg-white text-black rounded-[1.75rem] font-black uppercase text-xs tracking-widest flex items-center justify-center gap-4 hover:scale-105 transition-all shadow-xl relative z-10"
           >
              Explorer la source <ExternalLink className="w-5 h-5" />
           </button>
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

      {/* Subjects Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {subjects.map((sub) => {
          const subChapters = CHAPTERS.filter(c => c.subjectId === sub.id);
          const completedCount = completedList.filter((id: string) => 
            subChapters.some(ch => ch.id === id)
          ).length;
          const progress = Math.min(100, Math.round((completedCount / (subChapters.length || 1)) * 100));

          return (
            <button
              key={sub.id}
              onClick={() => navigate(`/subjects/${sub.id}`)}
              className="group relative glass-card p-12 rounded-[3.5rem] border border-white/5 hover:border-blue-500/40 transition-all duration-700 text-left overflow-hidden bg-black/40 premium-shadow"
            >
              <div className={`absolute top-0 right-0 w-48 h-48 ${sub.color.replace('bg-', 'bg-')}/5 rounded-full -mr-24 -mt-24 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000`} />
              
              <div className={`w-16 h-16 ${sub.color} rounded-[1.75rem] flex items-center justify-center text-white shadow-2xl mb-10 group-hover:rotate-[8deg] group-hover:scale-110 transition-transform duration-700 border border-white/10`}>
                <Zap className="w-8 h-8" />
              </div>

              <div className="space-y-8 relative z-10">
                <div className="space-y-2">
                  <h3 className="text-4xl font-black text-white tracking-tighter group-hover:text-blue-400 transition-colors uppercase leading-tight">{sub.name}</h3>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">{subChapters.length} Chapitres Complets</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between text-[11px] font-black text-slate-600 uppercase tracking-widest px-1">
                    <span>Avancement</span>
                    <span className="text-blue-500 font-black">{progress}%</span>
                  </div>
                  <div className="h-2.5 bg-slate-900/80 rounded-full overflow-hidden border border-white/5 p-0.5">
                    <div 
                      className={`h-full ${sub.color} transition-all duration-[2000ms] ease-out rounded-full shadow-[0_0_15px_rgba(59,130,246,0.3)]`} 
                      style={{ width: `${progress}%` }} 
                    />
                  </div>
                </div>
              </div>

              <div className="mt-12 flex items-center justify-between">
                <div className="flex -space-x-2.5">
                   {[1, 2, 3].map(i => (
                     <div key={i} className="w-10 h-10 rounded-2xl border-4 border-black bg-slate-900 flex items-center justify-center text-[10px] font-black text-slate-600">
                        {i}
                     </div>
                   ))}
                </div>
                <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-white/5 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center transition-all duration-500 shadow-inner group-hover:shadow-[0_10px_20px_rgba(37,99,235,0.3)]">
                  <ChevronRight className="w-7 h-7 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Source Banner */}
      <div className="bg-[#050A15] rounded-[4rem] p-16 text-white flex flex-col md:flex-row items-center gap-16 border border-white/5 relative overflow-hidden group premium-shadow">
        <div className="absolute top-0 left-0 w-full h-full bg-blue-600/5 blur-[120px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
        <div className="w-28 h-28 bg-white/5 rounded-[3rem] flex items-center justify-center flex-shrink-0 border border-white/10 backdrop-blur-md shadow-inner group-hover:scale-110 group-hover:rotate-6 transition-all duration-700">
          <Sparkles className="w-12 h-12 text-blue-500" />
        </div>
        <div className="flex-1 space-y-4">
          <h4 className="text-4xl font-black tracking-tighter uppercase">Intelligence Pédagogique</h4>
          <p className="text-slate-400 font-medium text-xl leading-relaxed max-w-3xl italic">
            Toutes les leçons sont synchronisées avec les bases de données <span className="text-blue-500 font-black">AlloSchool</span> et <span className="text-blue-500 font-black">Moutamadris</span>. Une couverture 100% officielle.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Subjects;