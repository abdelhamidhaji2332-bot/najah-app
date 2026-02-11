
import React from 'react';
import { 
  Trophy, 
  Flame, 
  Target, 
  Activity, 
  Award,
  Clock,
  CheckCircle,
  Brain,
  ShieldAlert
} from 'lucide-react';

const Profile: React.FC = () => {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-right duration-700 pb-20">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-purple-600 text-white text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md">Analytique</span>
            <span className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">Tes Performances</span>
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">Espace Étudiant</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium max-w-xl">
            Retrouve tes statistiques d'utilisation et ton score de préparation.
          </p>
        </div>
        
        <div className="flex items-center gap-4 bg-white dark:bg-slate-800 p-6 rounded-[2.5rem] border border-slate-200 dark:border-slate-700 shadow-sm">
           <div className="text-right">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Score de Réussite</p>
              <p className="text-3xl font-black text-blue-600 tracking-tighter">72%</p>
           </div>
           <div className="w-16 h-16 rounded-full border-4 border-blue-500/20 border-t-blue-500 flex items-center justify-center">
              <Award className="w-6 h-6 text-blue-500" />
           </div>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Série Actuelle', val: `12 Jours`, icon: Flame, color: 'text-orange-500', bg: 'bg-orange-50' },
          { label: 'Focus Total', val: '42.5h', icon: Clock, color: 'text-blue-500', bg: 'bg-blue-50' },
          { label: 'Objectifs Finis', val: '24', icon: CheckCircle, color: 'text-emerald-500', bg: 'bg-emerald-50' },
          { label: 'Badges Reçus', val: '4', icon: Trophy, color: 'text-amber-500', bg: 'bg-amber-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white dark:bg-slate-800 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-700 shadow-sm">
            <div className={`w-12 h-12 ${stat.bg} dark:bg-slate-900 rounded-2xl flex items-center justify-center ${stat.color} mb-4`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
            <p className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">{stat.val}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-10 rounded-[2.5rem] border border-slate-200 dark:border-slate-700 shadow-sm">
          <h3 className="text-xl font-bold mb-10 flex items-center gap-3">
            <Activity className="w-5 h-5 text-indigo-500" /> Activité Hebdomadaire
          </h3>
          <div className="flex items-center justify-center h-48 bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-dashed border-slate-200 dark:border-slate-700">
             <p className="text-slate-400 font-medium italic">Graphique d'activité bientôt disponible</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-emerald-600 p-8 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden group">
            <Brain className="absolute top-0 right-0 w-32 h-32 opacity-10" />
            <div className="relative z-10">
              <h4 className="font-black uppercase text-xs tracking-widest mb-4">Focus IA</h4>
              <p className="text-lg font-bold leading-tight">Tes révisions sont régulières cette semaine.</p>
              <p className="text-emerald-100/70 text-sm mt-3 font-medium">L'IA suggère d'augmenter tes sessions de focus de 10 minutes.</p>
            </div>
          </div>

          <div className="bg-slate-900 dark:bg-slate-800 p-8 rounded-[2.5rem] text-white border border-white/5 relative overflow-hidden">
            <ShieldAlert className="absolute top-0 right-0 w-32 h-32 opacity-10" />
            <div className="relative z-10">
              <h4 className="font-black uppercase text-xs tracking-widest text-red-400 mb-4">Alerte</h4>
              <p className="text-lg font-bold leading-tight">N'oublie pas de vérifier tes objectifs du jour.</p>
              <button className="mt-6 w-full py-3 bg-white/5 border border-white/10 rounded-2xl font-bold text-xs">Voir le Planning</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
