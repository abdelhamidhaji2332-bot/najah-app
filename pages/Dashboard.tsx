
import React, { useState, useEffect, useMemo } from 'react';
import { Filiere, BacLevel } from '../types.ts';
import { 
  ArrowRight,
  Calendar,
  Zap,
  Target,
  Trophy,
  Flame,
  Brain,
  ChevronRight,
  MousePointer2,
  Clock,
  Sparkles,
  Cloud
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { CHAPTERS } from '../constants.tsx';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [filiere] = useState<Filiere>(() => (localStorage.getItem('filiere') as Filiere) || Filiere.PC);
  const [level] = useState<BacLevel>(() => (localStorage.getItem('bac_level') as BacLevel) || BacLevel.BAC2);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0 });

  const stats = useMemo(() => {
    const completed = JSON.parse(localStorage.getItem('najah_seen_lessons') || '[]');
    const totalChapters = CHAPTERS.length;
    const percent = Math.round((completed.length / (totalChapters || 1)) * 100);
    
    let rank = "Novice Najah";
    let rankColor = "text-slate-400";
    if (percent > 85) { rank = "Légende BAC"; rankColor = "text-amber-500"; }
    else if (percent > 60) { rank = "Major de Promo"; rankColor = "text-indigo-400"; }
    else if (percent > 30) { rank = "Érudit Actif"; rankColor = "text-blue-400"; }
    else if (percent > 10) { rank = "Apprenti"; rankColor = "text-emerald-400"; }

    return { completed: completed.length, total: totalChapters, percent, rank, rankColor };
  }, []);

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
    <div className="space-y-8 animate-in fade-in duration-1000 pb-20">
      {/* Dynamic Top Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="px-3 py-1 bg-blue-600/10 text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] rounded-full border border-blue-500/20 shadow-glow">
              {level} • {filiere}
            </span>
            <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] font-black uppercase tracking-widest rounded-full border border-emerald-500/20 animate-pulse-subtle">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
              Sync Online
            </div>
          </div>
          <h1 className="text-4xl lg:text-6xl font-black text-white tracking-tighter uppercase leading-[0.9]">
            Marhba, <span className="text-blue-500 text-glow">Futur Major</span> 🌟
          </h1>
        </div>

        <div className="flex items-center gap-4 bg-slate-900/40 p-2 rounded-3xl border border-white/5 shadow-2xl backdrop-blur-xl">
           <div className="flex flex-col items-center px-6 py-2">
             <span className="text-3xl font-black text-white tracking-tighter">{timeLeft.days}</span>
             <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Jours</span>
           </div>
           <div className="w-[1px] h-10 bg-white/10" />
           <div className="flex flex-col items-center px-6 py-2">
             <span className="text-3xl font-black text-blue-400 tracking-tighter">{timeLeft.hours}</span>
             <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Heures</span>
           </div>
           <div className="w-14 h-14 bg-blue-600/20 rounded-2xl flex items-center justify-center text-blue-500 border border-blue-500/20 shadow-inner">
             <Calendar className="w-6 h-6" />
           </div>
        </div>
      </div>

      {/* High-Density Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 gap-6 min-h-[620px]">
        
        {/* Main Progression Engine (Large 2x2) */}
        <div className="lg:col-span-2 lg:row-span-2 glass-card rounded-[3.5rem] p-10 flex flex-col justify-between group relative overflow-hidden">
           <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full -mr-48 -mt-48 blur-[100px] transition-transform duration-1000 group-hover:scale-150" />
           <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-600/5 rounded-full -ml-32 -mb-32 blur-[80px]" />
           
           <div className="relative z-10">
             <div className="flex items-center gap-5 mb-12">
                <div className="w-16 h-16 bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-500 border border-blue-500/20 shadow-inner group-hover:rotate-12 transition-all duration-500">
                   <Target className="w-8 h-8" />
                </div>
                <div>
                   <h3 className="text-3xl font-black text-white tracking-tighter uppercase leading-none">Statut Global</h3>
                   <p className={`text-[10px] font-black uppercase tracking-[0.2em] mt-2 ${stats.rankColor}`}>{stats.rank}</p>
                </div>
             </div>

             <div className="space-y-10">
                <div className="flex items-end gap-3">
                   <span className="text-[12rem] font-black text-white tracking-tighter leading-[0.7]">{stats.percent}</span>
                   <span className="text-4xl font-black text-blue-500 mb-6">%</span>
                </div>
                <div className="space-y-4">
                   <div className="flex justify-between text-[11px] font-black uppercase text-slate-500 tracking-[0.3em] px-2">
                      <span>Progression de Révision</span>
                      <span>Total 100%</span>
                   </div>
                   <div className="h-4 w-full bg-white/5 rounded-full overflow-hidden border border-white/10 p-1 backdrop-blur-md">
                      <div className="h-full bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-400 rounded-full transition-all duration-[2500ms] ease-out shadow-glow" style={{ width: `${stats.percent}%` }} />
                   </div>
                </div>
             </div>
           </div>

           <div className="relative z-10 flex flex-wrap gap-4 mt-12 lg:mt-0">
              <Link to="/planner" className="flex-1 px-8 py-6 bg-white text-black rounded-3xl font-black uppercase text-xs tracking-widest hover:bg-blue-600 hover:text-white transition-all shadow-2xl flex items-center justify-center gap-3 group/btn">
                 Planning <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />
              </Link>
              <Link to="/library" className="flex-1 px-8 py-6 bg-slate-900 border border-white/5 text-white rounded-3xl font-black uppercase text-xs tracking-widest hover:bg-blue-600 transition-all shadow-2xl flex items-center justify-center gap-3 group/lib">
                 Bibliothèque <Cloud className="w-5 h-5 group-hover/lib:scale-125 transition-transform" />
              </Link>
           </div>
        </div>

        {/* AI Tutor Card (Medium 2x1) */}
        <div className="lg:col-span-2 glass-card rounded-[3.5rem] p-10 flex flex-col justify-between group hover:border-indigo-500/50 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 rounded-full -mr-32 -mt-32 blur-[60px]" />
           <div className="flex items-center justify-between mb-8">
              <div className="w-14 h-14 bg-indigo-500/10 text-indigo-400 rounded-2xl flex items-center justify-center border border-indigo-500/20 shadow-inner group-hover:scale-110 transition-transform">
                 <Brain className="w-7 h-7" />
              </div>
              <div className="px-4 py-1 bg-emerald-500/10 rounded-full border border-emerald-500/20 text-[10px] font-black text-emerald-500 uppercase tracking-widest">IA Najah Pro</div>
           </div>
           <div className="space-y-4">
              <h4 className="text-4xl font-black text-white tracking-tighter leading-tight uppercase">Expert {filiere}</h4>
              <p className="text-lg text-slate-400 font-medium leading-relaxed italic max-w-sm">"Explique-moi n'importe quel concept complexe étape par étape."</p>
           </div>
           <Link to="/ai-tutor" className="mt-8 flex items-center justify-between p-5 bg-indigo-600/10 rounded-[2rem] group/btn hover:bg-indigo-600 transition-all">
              <span className="text-xs font-black uppercase tracking-widest text-indigo-400 group-hover/btn:text-white ml-5">Demander à l'IA</span>
              <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white group-hover/btn:bg-white group-hover/btn:text-indigo-600 transition-all shadow-xl">
                 <Zap className="w-6 h-6" />
              </div>
           </Link>
        </div>

        {/* Action Blocks */}
        <div className="glass-card rounded-[3rem] p-8 flex flex-col items-center justify-center text-center gap-6 group hover:border-blue-500/40 cursor-pointer" onClick={() => navigate('/pomodoro')}>
           <div className="w-20 h-20 bg-blue-500/10 text-blue-400 rounded-[2.5rem] flex items-center justify-center border border-blue-500/20 shadow-inner group-hover:scale-110 transition-all duration-500">
              <Clock className="w-10 h-10" />
           </div>
           <div className="space-y-1">
              <p className="text-2xl font-black text-white tracking-tighter uppercase">Focus Mode</p>
              <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Technique Pomodoro</p>
           </div>
        </div>

        <div className="glass-card rounded-[3rem] p-8 flex flex-col items-center justify-center text-center gap-6 group hover:border-amber-500/40">
           <div className="w-20 h-20 bg-amber-500/10 text-amber-500 rounded-[2.5rem] flex items-center justify-center border border-amber-500/20 shadow-inner group-hover:scale-110 transition-all duration-500">
              <Trophy className="w-10 h-10" />
           </div>
           <div className="space-y-1">
              <p className="text-2xl font-black text-white tracking-tighter uppercase">Succès</p>
              <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Badges de Réussite</p>
           </div>
        </div>

      </div>

      {/* History Area */}
      <section className="space-y-6 pt-12">
         <div className="flex items-center justify-between px-4">
            <h3 className="text-3xl font-black text-white uppercase tracking-tighter flex items-center gap-4">
               <Clock className="w-8 h-8 text-blue-500" /> État du Système
            </h3>
         </div>
         
         <div className="p-20 text-center glass-card rounded-[4rem] border border-dashed border-white/10 opacity-70">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8 border border-white/10">
               <Sparkles className="w-10 h-10 text-slate-700" />
            </div>
            <p className="text-slate-500 font-bold text-2xl italic tracking-tight mb-8">Accédez à votre bibliothèque cloud pour retrouver vos ressources Drive.</p>
            <button onClick={() => navigate('/library')} className="px-12 py-5 bg-blue-600 text-white rounded-3xl font-black uppercase text-xs tracking-widest shadow-glow hover:scale-110 transition-all">Ouvrir la Bibliothèque</button>
         </div>
      </section>
    </div>
  );
};

export default Dashboard;
