
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { SUBJECTS_MAP } from '../constants';
import { Filiere, BacLevel } from '../types';
import { 
  BookOpen, 
  ChevronRight,
  GraduationCap,
  Layers,
  Search,
  Filter,
  CheckCircle
} from 'lucide-react';

const Subjects: React.FC = () => {
  const navigate = useNavigate();
  const [selectedFiliere, setSelectedFiliere] = useState<Filiere>(() => 
    (localStorage.getItem('filiere') as Filiere) || Filiere.PC
  );
  
  const [level, setLevel] = useState<BacLevel>(() => {
    return (localStorage.getItem('bac_level') as BacLevel) || BacLevel.BAC2;
  });

  const subjects = SUBJECTS_MAP[selectedFiliere] || [];
  const completedList = useMemo(() => JSON.parse(localStorage.getItem('najah_seen_lessons') || '[]'), []);

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">
      <header className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md">Curriculum</span>
              <span className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">Bac Marocain</span>
            </div>
            <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">Programme & Cours</h1>
            <p className="text-lg text-slate-500 dark:text-slate-400 font-medium max-w-xl">
              Index des leçons officielles pour le {level}.
            </p>
          </div>

          <div className="flex items-center gap-4">
             <div className="relative group">
               <Search className="absolute left-4 top-3.5 w-4 h-4 text-slate-400 group-focus-within:text-indigo-500" />
               <input 
                type="text" placeholder="Filtrer..." 
                className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl py-3 pl-10 pr-4 text-xs font-bold outline-none"
               />
             </div>
          </div>
        </div>

        {/* Filiere Selector Slider */}
        <div className="flex overflow-x-auto pb-4 gap-3 no-scrollbar custom-scrollbar">
          {Object.values(Filiere).map((f) => (
            <button
              key={f}
              onClick={() => { setSelectedFiliere(f); localStorage.setItem('filiere', f); }}
              className={`
                flex-shrink-0 flex items-center gap-3 px-6 py-4 rounded-2xl border-2 transition-all duration-300
                ${selectedFiliere === f 
                  ? 'bg-indigo-600 border-indigo-600 text-white shadow-xl shadow-indigo-500/20' 
                  : 'bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 text-slate-500 hover:border-indigo-200'}
              `}
            >
              <Layers className="w-4 h-4" />
              <span className="font-bold text-xs tracking-tight whitespace-nowrap">{f}</span>
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
              className="group relative bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] border border-slate-200/60 dark:border-slate-700 shadow-sm hover:shadow-2xl transition-all duration-500 text-left"
            >
              <div className={`w-14 h-14 ${sub.color} rounded-2xl flex items-center justify-center text-white shadow-xl shadow-current/10 mb-6 group-hover:rotate-6 transition-transform`}>
                <BookOpen className="w-7 h-7" />
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">{sub.name}</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <span>Progression</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div className={`h-full ${sub.color} transition-all duration-1000`} style={{ width: `${progress}%` }} />
                  </div>
                </div>
              </div>

              <div className="mt-10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                   <div className="flex -space-x-2">
                      {[1, 2, 3].map(i => <div key={i} className="w-6 h-6 rounded-full border-2 border-white dark:border-slate-800 bg-slate-100 dark:bg-slate-700" />)}
                   </div>
                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{sub.lessonCount || 12} Chapitres</span>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                  <ChevronRight className="w-5 h-5" />
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="bg-slate-900 rounded-[3rem] p-10 text-white flex flex-col md:flex-row items-center gap-10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full -mr-40 -mt-40 blur-[80px]" />
        <div className="w-20 h-20 bg-blue-600/20 rounded-3xl flex items-center justify-center flex-shrink-0 border border-blue-500/20">
          <GraduationCap className="w-10 h-10 text-blue-400" />
        </div>
        <div className="flex-1">
          <h4 className="text-2xl font-black tracking-tight mb-2">Suivi AlloSchool & Moutamadris</h4>
          <p className="text-slate-400 font-medium leading-relaxed">
            Les ressources sont indexées directement depuis les plateformes officielles. Marquez vos leçons comme terminées pour suivre votre état de préparation.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Subjects;
