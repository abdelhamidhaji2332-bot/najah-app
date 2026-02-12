
import React, { useState, useEffect, useMemo } from 'react';
import { Filiere, BacLevel } from '../types.ts';
import { 
  TrendingUp, 
  Clock, 
  ArrowRight,
  Calendar,
  CheckCircle2,
  Zap,
  Star,
  BookOpen,
  Target
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { MOCK_CHAPTERS } from '../constants.tsx';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [filiere] = useState<Filiere>(() => (localStorage.getItem('filiere') as Filiere) || Filiere.PC);
  const [level] = useState<BacLevel>(() => (localStorage.getItem('bac_level') as BacLevel) || BacLevel.BAC2);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0 });

  const stats = useMemo(() => {
    const completed = JSON.parse(localStorage.getItem('najah_seen_lessons') || '[]');
    const totalChapters = Object.values(MOCK_CHAPTERS).flat().length;
    return { 
      completed: completed.length, 
      total: totalChapters, 
      percent: Math.round((completed.length / (totalChapters || 1)) * 100) 
    };
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
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-1000">
      {/* Top Welcome Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="bg-blue-500/10 text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full border border-blue-500/20">
              {level} • {filiere}
            </span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-black text-white tracking-tight">
            Salam, <span className="text-blue-500 text-glow">Champion</span> ! 🚀
          </h1>
          <p className="text-slate-400 font-medium text-lg italic">"Chaque minute de révision est un pas vers ton avenir."</p>
        </div>
        
        <div className="flex items-center gap-1.5 glass-card p-2 rounded-[2rem] border border-white/5 shadow-2xl">
           <div className="flex flex-col items-center px-6 py-2 bg-slate-900 rounded-[1.5rem] shadow-inner border border-white/5">
             <span className="text-2xl font-black text-white leading-tight">{timeLeft.days}</span>
             <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Jours</span>
           </div>
           <div className="flex flex-col items-center px-6 py-2">
             <span className="text-2xl font-black text-blue-400 leading-tight">{timeLeft.hours}</span>
             <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Heures</span>
           </div>
           <div className="w-12 h-12 bg-blue-600 rounded-[1.5rem] flex items-center justify-center text-white shadow-[0_0_20px_rgba(37,99,235,0.4)]">
             <Calendar className="w-5 h-5" />
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* Main Progress Hub */}
        <div className="xl:col-span-8 space-y-8">
          <div className="relative bg-[#0A0F1D] rounded-[2.5rem] p-10 text-white overflow-hidden shadow-2xl border border-white/5 group">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full -mr-32 -mt-32 blur-[100px] transition-transform duration-1000 group-hover:scale-125" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-600/5 rounded-full -ml-32 -mb-32 blur-[80px]" />
            
            <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-10">
              <div className="space-y-6 flex-1">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center backdrop-blur-md border border-white/10 shadow-inner">
                      <Target className="w-5 h-5 text-blue-400" />
                   </div>
                   <p className="text-blue-400 text-xs font-black uppercase tracking-[0.2em]">Etat de Préparation</p>
                </div>
                <div>
                   <h3 className="text-6xl font-black tracking-tighter mb-2">{stats.percent}<span className="text-blue-500 text-glow">%</span></h3>
                   <p className="text-slate-400 text-sm font-medium">Progression calculée sur le programme officiel du BAC Marocain.</p>
                </div>
                <div className="space-y-3">
                   <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                     <span className="text-slate-500">{stats.completed} Chapitres Validés</span>
                     <span className="text-blue-500">{stats.total} Total</span>
                   </div>
                   <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                     <div 
                       className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-[2000ms] ease-out shadow-[0_0_15px_rgba(59,130,246,0.6)]" 
                       style={{ width: `${stats.percent}%` }} 
                     />
                   </div>
                </div>
              </div>
              
              <div className="flex flex-col gap-3">
                 <Link to="/subjects" className="px-8 py-4 bg-white text-black rounded-2xl font-black uppercase text-[10px] tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl text-center">
                    Continuer le programme
                 </Link>
                 <Link to="/exams" className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-white/10 transition-all text-center">
                    Pratiquer les examens
                 </Link>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Resumption Widget */}
            <div className="glass-card p-8 rounded-[2.5rem] premium-shadow group hover:border-blue-500/30 transition-all duration-500">
               <div className="flex items-center justify-between mb-8">
                  <div className="w-12 h-12 bg-blue-500/10 text-blue-400 rounded-2xl flex items-center justify-center shadow-inner border border-blue-500/20">
                    <Clock className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">En cours</span>
               </div>
               <div className="space-y-4">
                  <h4 className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Dernier chapitre</h4>
                  {lastSeenChapter ? (
                    <>
                      <h3 className="text-2xl font-black text-white tracking-tight leading-tight">{lastSeenChapter.title}</h3>
                      <button onClick={() => navigate('/subjects')} className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-500 group-hover:text-blue-400 transition-colors">
                        Reprendre <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </>
                  ) : (
                    <p className="text-slate-500 text-sm font-medium italic">Commence ta première leçon aujourd'hui.</p>
                  )}
               </div>
            </div>

            {/* Quick Links Widget */}
            <div className="glass-card p-8 rounded-[2.5rem] premium-shadow">
               <div className="flex items-center justify-between mb-8">
                  <div className="w-12 h-12 bg-amber-500/10 text-amber-500 rounded-2xl flex items-center justify-center shadow-inner border border-amber-500/20">
                    <Star className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Focus</span>
               </div>
               <div className="grid grid-cols-2 gap-3">
                  <Link to="/pomodoro" className="p-4 bg-slate-900/50 rounded-[1.5rem] text-center hover:bg-blue-500/10 transition-all group shadow-sm border border-white/5">
                     <Clock className="w-5 h-5 mx-auto text-blue-500 mb-2 group-hover:scale-110 transition-transform" />
                     <p className="text-[9px] font-black uppercase tracking-widest text-slate-500">Timer</p>
                  </Link>
                  <Link to="/ai-tutor" className="p-4 bg-slate-900/50 rounded-[1.5rem] text-center hover:bg-indigo-500/10 transition-all group shadow-sm border border-white/5">
                     <Zap className="w-5 h-5 mx-auto text-indigo-500 mb-2 group-hover:scale-110 transition-transform" />
                     <p className="text-[9px] font-black uppercase tracking-widest text-slate-500">Tuteur IA</p>
                  </Link>
               </div>
            </div>
          </div>
        </div>

        {/* Sidebar Widgets */}
        <div className="xl:col-span-4 space-y-8">
          <div className="glass-card rounded-[2.5rem] p-8 premium-shadow space-y-6">
            <h3 className="font-black text-white text-sm uppercase tracking-widest flex items-center gap-2">
               <TrendingUp className="w-4 h-4 text-emerald-500" /> Activité Récente
            </h3>
            <div className="space-y-6">
               {[1, 2].map(i => (
                 <div key={i} className="flex gap-4 group">
                    <div className="w-1.5 h-12 bg-slate-800 rounded-full relative overflow-hidden">
                       <div className="absolute top-0 w-full h-1/2 bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                    </div>
                    <div className="flex-1">
                       <p className="text-xs font-black text-white mb-1">Session {i === 1 ? 'Focus' : 'Cours'}</p>
                       <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Il y a {i * 2} heures</p>
                    </div>
                 </div>
               ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-700 to-blue-800 p-8 rounded-[2.5rem] text-white shadow-2xl premium-shadow group cursor-pointer relative overflow-hidden border border-white/10" onClick={() => navigate('/planner')}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-150 transition-transform duration-700" />
            <div className="relative z-10 space-y-6">
               <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md shadow-inner border border-white/20">
                  <CheckCircle2 className="w-6 h-6 text-white" />
               </div>
               <div className="space-y-2">
                 <h4 className="font-black uppercase text-[10px] tracking-widest text-blue-200">Planning du jour</h4>
                 <p className="text-2xl font-bold leading-tight tracking-tight">Tu as des tâches importantes à finir !</p>
               </div>
               <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest group-hover:gap-4 transition-all">
                  Voir la liste <ArrowRight className="w-4 h-4" />
               </div>
            </div>
          </div>
          
          <div className="glass-card p-8 rounded-[2.5rem] border border-white/5 text-center space-y-3">
             <div className="w-14 h-14 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner border border-white/5">
                <BookOpen className="w-6 h-6 text-slate-600" />
             </div>
             <p className="text-xs font-bold text-slate-400 italic leading-relaxed">"Le succès est la somme de petits efforts, répétés jour après jour."</p>
             <p className="text-[9px] font-black uppercase tracking-widest text-slate-600">Robert Collier</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
