
import React, { useState, useEffect, useMemo } from 'react';
import { Filiere, BacLevel, Chapter } from '../types';
import { 
  TrendingUp, 
  Clock, 
  ArrowRight,
  Calendar,
  FileText,
  ChevronDown,
  CheckCircle2,
  Bookmark,
  Zap,
  Star,
  Search
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { SUBJECTS_MAP, MOCK_CHAPTERS } from '../constants';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [filiere, setFiliere] = useState<Filiere>(() => (localStorage.getItem('filiere') as Filiere) || Filiere.PC);
  const [level, setLevel] = useState<BacLevel>(() => (localStorage.getItem('bac_level') as BacLevel) || BacLevel.BAC2);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0 });

  const stats = useMemo(() => {
    const completed = JSON.parse(localStorage.getItem('najah_seen_lessons') || '[]');
    const totalChapters = Object.values(MOCK_CHAPTERS).flat().length;
    return { completed: completed.length, total: totalChapters, percent: Math.round((completed.length / totalChapters) * 100) };
  }, []);

  const lastSeenChapterId = localStorage.getItem('najah_last_seen');
  const lastSeenChapter = useMemo(() => {
    if (!lastSeenChapterId) return null;
    return Object.values(MOCK_CHAPTERS).flat().find(c => c.id === lastSeenChapterId);
  }, [lastSeenChapterId]);

  useEffect(() => {
    const target = new Date('2025-06-10T08:00:00');
    const timer = setInterval(() => {
      const diff = target.getTime() - new Date().getTime();
      setTimeLeft({
        days: Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24))),
        hours: Math.max(0, Math.floor((diff / (1000 * 60 * 60)) % 24)),
        mins: Math.max(0, Math.floor((diff / 1000 / 60) % 60)),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-20">
      {/* Search Header */}
      <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between">
        <div className="relative flex-1 max-w-lg group">
           <Search className="absolute left-4 top-4 w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
           <input 
              type="text" 
              placeholder="Rechercher une leçon, un chapitre..." 
              className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl py-4 pl-12 pr-6 text-sm font-medium outline-none focus:ring-4 focus:ring-blue-500/10 transition-all"
           />
        </div>
        <div className="flex items-center gap-3">
           <div className="flex flex-col items-end">
              <span className="text-[10px] font-black uppercase text-slate-400">Objectif du jour</span>
              <span className="text-xs font-bold text-slate-900 dark:text-white">3h de concentration</span>
           </div>
           <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
              <Zap className="w-6 h-6" />
           </div>
        </div>
      </div>

      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md">{level}</span>
            <span className="bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md">{filiere}</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">Salam, Champion ! 🚀</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">Ton examen national approche. Prêt pour une session de réussite ?</p>
        </div>
        
        <div className="flex items-center gap-4 bg-white dark:bg-slate-800 p-3 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm shadow-slate-200/50">
          <div className="flex flex-col items-center px-6 border-r border-slate-100 dark:border-slate-700">
            <span className="text-3xl font-black text-slate-900 dark:text-white">{timeLeft.days}</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Jours</span>
          </div>
          <div className="flex flex-col items-center px-6">
            <span className="text-3xl font-black text-blue-600">{timeLeft.hours}</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Heures</span>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-2xl text-blue-600 ml-2">
            <Calendar className="w-6 h-6" />
          </div>
        </div>
      </header>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Progress Card */}
        <div className="xl:col-span-2 space-y-8">
          <div className="bg-gradient-to-br from-slate-900 to-indigo-950 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl group">
            <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full -mr-32 -mt-32 blur-[80px]" />
            <div className="relative z-10 space-y-8">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-blue-400 text-[10px] font-black uppercase tracking-widest">Progression Globale</p>
                  <h3 className="text-2xl font-bold tracking-tight">{stats.percent}% Terminé</h3>
                </div>
                <div className="w-16 h-16 rounded-full border-4 border-white/10 flex items-center justify-center">
                  <span className="font-black text-lg">{stats.completed}/{stats.total}</span>
                </div>
              </div>
              <div className="w-full h-4 bg-white/5 rounded-full overflow-hidden p-1 border border-white/10">
                <div className="h-full bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full transition-all duration-1000" style={{ width: `${stats.percent}%` }} />
              </div>
              <div className="flex flex-wrap gap-4">
                 <Link to="/subjects" className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-blue-700 transition-all flex items-center gap-2 shadow-xl shadow-blue-600/20">Continuer les cours <ArrowRight className="w-4 h-4" /></Link>
                 <Link to="/exams" className="bg-white/10 text-white px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest border border-white/10 hover:bg-white/20 transition-all">Annales Nationaux</Link>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Last Seen */}
            <div className="bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] border border-slate-200/50 dark:border-slate-700 shadow-sm group">
              <div className="flex items-center gap-4 mb-6">
                 <div className="w-12 h-12 bg-amber-50 dark:bg-amber-900/30 text-amber-600 rounded-2xl flex items-center justify-center">
                    <Clock className="w-6 h-6" />
                 </div>
                 <h4 className="font-bold text-slate-900 dark:text-white">Dernière Leçon</h4>
              </div>
              {lastSeenChapter ? (
                <div className="space-y-4">
                   <p className="text-xl font-bold text-slate-800 dark:text-slate-200 tracking-tight">{lastSeenChapter.title}</p>
                   <p className="text-sm text-slate-500 font-medium line-clamp-2">{lastSeenChapter.description}</p>
                   <button onClick={() => navigate(`/subjects/math`)} className="text-blue-600 font-black uppercase text-[10px] tracking-widest flex items-center gap-2 group-hover:gap-3 transition-all pt-2">
                     Reprendre <ArrowRight className="w-4 h-4" />
                   </button>
                </div>
              ) : (
                <p className="text-slate-400 text-sm font-medium italic">Commencez votre première leçon !</p>
              )}
            </div>

            {/* Quick Links */}
            <div className="bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] border border-slate-200/50 dark:border-slate-700 shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                 <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 rounded-2xl flex items-center justify-center">
                    <Star className="w-6 h-6" />
                 </div>
                 <h4 className="font-bold text-slate-900 dark:text-white">Accès Rapide</h4>
              </div>
              <div className="grid grid-cols-2 gap-3">
                 <Link to="/pomodoro" className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl text-center space-y-2 hover:bg-blue-50 transition-colors">
                    <Clock className="w-5 h-5 mx-auto text-blue-500" />
                    <p className="text-[10px] font-black uppercase text-slate-500">Timer</p>
                 </Link>
                 <Link to="/ai-tutor" className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl text-center space-y-2 hover:bg-indigo-50 transition-colors">
                    <Zap className="w-5 h-5 mx-auto text-indigo-500" />
                    <p className="text-[10px] font-black uppercase text-slate-500">Tuteur IA</p>
                 </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Settings / Stats */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] p-8 border border-slate-200/50 dark:border-slate-700 shadow-sm space-y-6">
            <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
               <TrendingUp className="w-5 h-5 text-emerald-500" /> Ma Configuration
            </h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Niveau</label>
                <select 
                  value={level}
                  onChange={(e) => { setLevel(e.target.value as BacLevel); localStorage.setItem('bac_level', e.target.value); }}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-700 rounded-xl py-3 px-4 text-xs font-bold outline-none"
                >
                  {Object.values(BacLevel).map(l => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Filière</label>
                <select 
                  value={filiere}
                  onChange={(e) => { setFiliere(e.target.value as Filiere); localStorage.setItem('filiere', e.target.value); }}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-700 rounded-xl py-3 px-4 text-xs font-bold outline-none"
                >
                  {Object.values(Filiere).map(f => <option key={f} value={f}>{f}</option>)}
                </select>
              </div>
            </div>
          </div>

          <div className="bg-blue-600 p-8 rounded-[2.5rem] text-white shadow-xl shadow-blue-500/20 group cursor-pointer overflow-hidden relative" onClick={() => navigate('/planner')}>
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
            <h4 className="font-black uppercase text-[10px] tracking-widest text-blue-100 mb-4">Planning du Jour</h4>
            <p className="text-2xl font-bold tracking-tight leading-tight">Tu as 4 tâches à compléter aujourd'hui !</p>
            <div className="mt-8 flex items-center gap-2 text-xs font-bold group-hover:gap-4 transition-all">
               Voir le planning <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
