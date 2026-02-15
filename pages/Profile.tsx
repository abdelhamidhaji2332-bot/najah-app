
import React from 'react';
import { 
  Trophy, 
  Flame, 
  Activity, 
  Award,
  Clock,
  CheckCircle,
  Brain,
  ShieldAlert
} from 'lucide-react';

const Profile: React.FC = () => {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-right duration-700 pb-20">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-10">
        <div className="space-y-3">
          <div className="flex items-center gap-3 mb-2">
            <span className="bg-blue-600/20 text-blue-400 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-blue-500/20">Analytics Engine</span>
          </div>
          <h1 className="text-5xl font-black text-white tracking-tighter uppercase">Profil <span className="text-blue-600">Étudiant</span></h1>
          <p className="text-slate-400 font-medium italic text-lg">
            "Ce qui est mesuré peut être amélioré."
          </p>
        </div>
        
        <div className="flex items-center gap-6 glass-card p-8 rounded-[3rem] border border-white/5 shadow-2xl relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-24 h-24 bg-blue-600/10 rounded-full blur-2xl" />
           <div className="text-right">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">Prêt pour le National</p>
              <p className="text-5xl font-black text-blue-500 tracking-tighter text-glow">72%</p>
           </div>
           <div className="w-16 h-16 rounded-3xl bg-blue-600/10 flex items-center justify-center border border-blue-500/20 shadow-inner group-hover:scale-110 transition-transform">
              <Award className="w-8 h-8 text-blue-500" />
           </div>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { label: 'Série Actuelle', val: `12 Jours`, icon: Flame, color: 'text-orange-500', bg: 'bg-orange-500/10' },
          { label: 'Focus Total', val: '42.5h', icon: Clock, color: 'text-blue-500', bg: 'bg-blue-500/10' },
          { label: 'Objectifs Finis', val: '24', icon: CheckCircle, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
          { label: 'Badges Reçus', val: '4', icon: Trophy, color: 'text-amber-500', bg: 'bg-amber-500/10' },
        ].map((stat, i) => (
          <div key={i} className="glass-card p-10 rounded-[3rem] border border-white/5 group hover:border-white/20 transition-all shadow-2xl">
            <div className={`w-14 h-14 ${stat.bg} rounded-[1.5rem] flex items-center justify-center ${stat.color} mb-8 border border-current/20 shadow-inner group-hover:rotate-6 transition-transform`}>
              <stat.icon className="w-7 h-7" />
            </div>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">{stat.label}</p>
            <p className="text-3xl font-black text-white tracking-tight">{stat.val}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 glass-card p-12 rounded-[3.5rem] border border-white/5 relative overflow-hidden">
          <div className="flex items-center justify-between mb-12">
            <h3 className="text-2xl font-black tracking-tight flex items-center gap-4 text-white">
              <Activity className="w-6 h-6 text-indigo-500" /> Activité Hebdomadaire
            </h3>
            <div className="flex gap-2">
               {[1, 2, 3, 4, 5, 6, 7].map(i => <div key={i} className={`w-4 h-12 bg-slate-900 rounded-full relative overflow-hidden ${i > 4 ? 'h-24' : ''}`}>
                  <div className={`absolute bottom-0 w-full bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.5)]`} style={{ height: `${i * 12}%` }} />
               </div>)}
            </div>
          </div>
          <div className="flex items-center justify-center h-48 bg-black rounded-3xl border border-dashed border-white/5">
             <p className="text-slate-600 font-bold text-lg italic tracking-tight">Analyse des données en cours...</p>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-gradient-to-br from-indigo-700 to-blue-800 p-10 rounded-[3.5rem] text-white shadow-2xl relative overflow-hidden group border border-white/10">
            <Brain className="absolute -top-10 -right-10 w-48 h-48 opacity-10 group-hover:rotate-12 transition-transform duration-1000" />
            <div className="relative z-10 space-y-4">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20 shadow-inner"><Brain className="w-6 h-6 text-white" /></div>
              <h4 className="font-black uppercase text-[10px] tracking-widest text-blue-200">Recommandation IA</h4>
              <p className="text-2xl font-bold leading-tight tracking-tight">Ta concentration est optimale le matin.</p>
              <p className="text-blue-100/70 text-sm font-medium leading-relaxed italic">"Nous te suggérons de réviser les chapitres de Physique entre 08:00 et 10:00."</p>
            </div>
          </div>

          <div className="glass-card p-10 rounded-[3.5rem] border border-white/5 relative overflow-hidden group">
            <ShieldAlert className="absolute -bottom-10 -left-10 w-48 h-48 opacity-5" />
            <div className="relative z-10 space-y-6">
              <h4 className="font-black uppercase text-[10px] tracking-widest text-red-400">Objectifs Manqués</h4>
              <p className="text-xl font-bold leading-tight text-white tracking-tight">N'oublie pas tes fiches d'Arabe aujourd'hui.</p>
              <button className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl font-black uppercase text-[10px] tracking-widest text-white hover:bg-white/10 transition-all active:scale-95">Voir les tâches</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
