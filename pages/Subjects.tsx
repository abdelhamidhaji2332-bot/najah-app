
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { SUBJECTS_MAP } from '../constants';
import { Filiere, BacLevel } from '../types';
import { 
  BookOpen, 
  ChevronRight,
  Layers,
  Search,
  Sparkles
} from 'lucide-react';

const Subjects: React.FC = () => {
  const navigate = useNavigate();
  const [selectedFiliere, setSelectedFiliere] = useState<Filiere>(() => 
    (localStorage.getItem('filiere') as Filiere) || Filiere.PC
  );
  
  const [level] = useState<BacLevel>(() => {
    return (localStorage.getItem('bac_level') as BacLevel) || BacLevel.BAC2;
  });

  const subjects = SUBJECTS_MAP[selectedFiliere] || [];
  const completedList = useMemo(() => JSON.parse(localStorage.getItem('najah_seen_lessons') || '[]'), []);

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <header className="space-y-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full border border-indigo-600/20">Curriculum Officiel</span>
            </div>
            <h1 className="text-5xl font-black text-slate-900 dark:text-white tracking-tight">Programme & <span className="text-blue-600">Cours</span></h1>
            <p className="text-lg text-slate-500 dark:text-slate-400 font-medium max-w-xl italic">
              Exploration complète des leçons officielles pour le {level}.
            </p>
          </div>

          <div className="relative group">
            <Search className="absolute left-5 top-5 w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
            <input 
              type="text" placeholder="Filtrer les matières..." 
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl py-4.5 pl-14 pr-6 text-sm font-medium outline-none focus:ring-4 focus:ring-blue-500/10 shadow-sm transition-all w-full lg:w-80"
            />
          </div>
        </div>

        {/* Filiere Selector Slider */}
        <div className="flex overflow-x-auto pb-4 gap-3 no-scrollbar">
          {Object.values(Filiere).map((f) => (
            <button
              key={f}
              onClick={() => { setSelectedFiliere(f); localStorage.setItem('filiere', f); }}
              className={`
                flex-shrink-0 flex items-center gap-3 px-8 py-4 rounded-2xl border transition-all duration-300 active:scale-95
                ${selectedFiliere === f 
                  ? 'bg-blue-600 border-blue-600 text-white shadow-xl shadow-blue-500/25 ring-2 ring-blue-500/20' 
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-500 hover:border-blue-300 dark:hover:border-slate-700'}
              `}
            >
              <Layers className={`w-4.5 h-4.5 ${selectedFiliere === f ? 'text-white' : 'text-slate-400'}`} />
              <span className="font-black text-[10px] uppercase tracking-[0.15em] whitespace-nowrap">{f}</span>
            </button>
          ))}
        </div>
      </header>

      {/* Subjects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {subjects.map((sub) => {
          const completedCount = completedList.filter((id: string) => id.startsWith(sub.id)).length;
          const progress = Math.min(100, Math.round((completedCount / (sub.lessonCount || 10)) * 100));

          return (
            <button
              key={sub.id}
              onClick={() => navigate(`/subjects/${sub.id}`)}
              className="group relative glass-card p-10 rounded-[2.75rem] premium-shadow hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 text-left overflow-hidden border border-slate-200/50 dark:border-slate-800/50"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-slate-100 dark:bg-slate-800/50 rounded-full -mr-16 -mt-16 group-hover:bg-blue-500/5 transition-colors" />
              
              <div className={`w-16 h-16 ${sub.color} rounded-2xl flex items-center justify-center text-white shadow-2xl shadow-current/15 mb-8 group-hover:rotate-6 transition-transform duration-500`}>
                <BookOpen className="w-8 h-8" />
              </div>

              <div className="space-y-6 relative z-10">
                <div className="space-y-1">
                  <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">{sub.name}</h3>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{sub.lessonCount || 12} Chapitres officiels</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-[9px] font-black text-slate-400 uppercase tracking-widest">
                    <span>Maitrise du programme</span>
                    <span className="text-blue-600 dark:text-blue-400">{progress}%</span>
                  </div>
                  <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden border border-slate-200/20 dark:border-slate-700/50">
                    <div 
                      className={`h-full ${sub.color} transition-all duration-[1500ms] shadow-[0_0_10px_rgba(59,130,246,0.3)]`} 
                      style={{ width: `${progress}%` }} 
                    />
                  </div>
                </div>
              </div>

              <div className="mt-12 flex items-center justify-between">
                <div className="flex -space-x-2">
                   {[1, 2, 3].map(i => <div key={i} className="w-8 h-8 rounded-xl border-2 border-white dark:border-slate-900 bg-slate-100 dark:bg-slate-800" />)}
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="bg-slate-900 dark:bg-indigo-950/20 rounded-[3rem] p-12 text-white flex flex-col md:flex-row items-center gap-12 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-full bg-blue-600/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
        <div className="w-24 h-24 bg-white/10 rounded-[2rem] flex items-center justify-center flex-shrink-0 border border-white/10 backdrop-blur-md shadow-2xl group-hover:scale-110 transition-transform">
          <Sparkles className="w-10 h-10 text-blue-400" />
        </div>
        <div className="flex-1 space-y-3">
          <h4 className="text-3xl font-black tracking-tighter">Réussite Accélérée</h4>
          <p className="text-slate-400 font-medium text-lg leading-relaxed max-w-2xl">
            Nous avons regroupé le meilleur de <span className="text-blue-400">AlloSchool</span> et <span className="text-blue-400">Moutamadris</span> pour que tu n'aies plus à chercher. Concentre-toi sur l'essentiel.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Subjects;
