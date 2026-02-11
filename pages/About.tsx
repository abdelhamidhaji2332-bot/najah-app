
import React from 'react';
import { 
  ShieldCheck, 
  Heart, 
  MessageCircle, 
  ExternalLink, 
  Globe, 
  Handshake,
  Mail,
  Award,
  Lock,
  EyeOff
} from 'lucide-react';

const About: React.FC = () => {
  const whatsappNumber = "+212601898477";
  const developerName = "Abdelhamid Haji";

  return (
    <div className="space-y-16 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-20">
      {/* Hero Mission Section */}
      <section className="text-center space-y-6 pt-10">
        <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 px-4 py-2 rounded-full border border-blue-100 dark:border-blue-800">
          <Award className="w-4 h-4 text-blue-600" />
          <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">Plateforme NAJAH 2025</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tighter max-w-4xl mx-auto leading-[1.1]">
          Le système d'exploitation de la <span className="text-blue-600">réussite au BAC</span>.
        </h1>
        <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium">
          Centraliser, organiser et optimiser la révision pour chaque étudiant marocain.
        </p>
      </section>

      {/* Integrity Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-slate-800 p-10 rounded-[2.5rem] border border-slate-100 dark:border-slate-700 space-y-6 shadow-sm">
          <div className="w-14 h-14 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 rounded-2xl flex items-center justify-center">
            <Lock className="w-7 h-7" />
          </div>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Protection du Contenu</h3>
          <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
            NAJAH utilise une visionneuse interne sécurisée. Les ressources pédagogiques restent protégées au sein de l'application pour empêcher toute redistribution non autorisée.
          </p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-10 rounded-[2.5rem] border border-slate-100 dark:border-slate-700 space-y-6 shadow-sm">
          <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-2xl flex items-center justify-center">
            <EyeOff className="w-7 h-7" />
          </div>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Zéro Distraction</h3>
          <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
            Pas de publicité, pas de réseaux sociaux intégrés. Un environnement purement académique pour maximiser la concentration et le temps de révision effectif.
          </p>
        </div>
      </div>

      {/* Partnership Intent (The Letter) */}
      <section className="bg-slate-900 rounded-[3rem] p-8 md:p-16 text-white relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full -mr-48 -mt-48 blur-[100px]" />
        
        <div className="relative z-10 flex flex-col lg:flex-row gap-16 items-start">
          <div className="flex-1 space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md">
                <Handshake className="w-6 h-6 text-blue-400" />
              </div>
              <h2 className="text-3xl font-black tracking-tight">Lettre de Collaboration</h2>
            </div>
            
            <div className="prose prose-invert max-w-none">
              <p className="text-xl text-slate-300 font-medium italic border-l-4 border-blue-600 pl-8 py-2">
                "Nous croyons en la force du collectif pour l'éducation au Maroc."
              </p>
              <div className="bg-white/5 border border-white/10 p-10 rounded-[2rem] text-slate-300 font-medium leading-relaxed mt-8 whitespace-pre-wrap text-sm italic">
                {`I’m currently developing an educational mobile app called NAJAH to help Moroccan BAC students from all filières study better and succeed.

I wanted to ask if it would be possible to use some of your lesson and exercise PDFs from AlloSchool / Moutamadris inside the app, only for educational purposes. 

The content would stay protected inside the app, with clear credit to your platform, and no unauthorized downloading or redistribution. I’m totally open to any conditions or collaboration model you prefer.`}
              </div>
            </div>
          </div>

          <div className="w-full lg:w-96 bg-white/5 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/10 flex flex-col gap-6">
            <h3 className="font-black text-xl tracking-tight">Contact Développeur</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-bold">AH</div>
                <div>
                  <p className="text-sm font-bold">{developerName}</p>
                  <p className="text-[10px] uppercase font-black text-slate-500 tracking-widest">Founder of NAJAH</p>
                </div>
              </div>
              <a 
                href={`https://wa.me/${whatsappNumber.replace('+', '')}`}
                target="_blank" 
                rel="noreferrer"
                className="flex items-center justify-center gap-3 w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold transition-all shadow-xl shadow-emerald-600/20 active:scale-95"
              >
                <MessageCircle className="w-5 h-5" /> WhatsApp Direct
              </a>
              <button className="flex items-center justify-center gap-3 w-full py-4 bg-white text-slate-900 rounded-2xl font-bold transition-all hover:bg-slate-100 active:scale-95">
                <Mail className="w-5 h-5" /> Email Professionnel
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Source Credits Section */}
      <section className="space-y-8">
        <h3 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-3">
          <ExternalLink className="w-6 h-6 text-indigo-500" />
          Remerciements & Sources
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {['AlloSchool', 'Moutamadris', 'Ministère de l\'Éducation', 'BAC Libre Maroc'].map((source) => (
            <div key={source} className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 flex items-center justify-between group cursor-pointer hover:border-indigo-500 transition-all">
              <span className="font-bold text-slate-800 dark:text-slate-200">{source}</span>
              <ExternalLink className="w-4 h-4 text-slate-300 group-hover:text-indigo-500 transition-colors" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
