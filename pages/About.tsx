
import React from 'react';
import { 
  ShieldCheck, 
  MessageCircle, 
  ExternalLink, 
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
    <div className="space-y-20 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-20">
      {/* Hero Mission Section */}
      <section className="text-center space-y-10 pt-16">
        <div className="inline-flex items-center gap-3 bg-blue-600/10 px-6 py-2.5 rounded-full border border-blue-600/20 shadow-[0_0_20px_rgba(37,99,235,0.2)]">
          <Award className="w-5 h-5 text-blue-500" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400">NAJAH Vision 2025</span>
        </div>
        <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter max-w-5xl mx-auto leading-[1] uppercase">
          La <span className="text-blue-600 text-glow">Réussite</span> par l'excellence logicielle.
        </h1>
        <p className="text-2xl text-slate-400 max-w-3xl mx-auto font-medium italic">
          "Centraliser les meilleures ressources du BAC Marocain pour donner une chance égale à chaque bachelier."
        </p>
      </section>

      {/* Integrity Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="glass-card p-12 rounded-[3.5rem] border border-white/5 space-y-8 shadow-2xl group hover:border-blue-500/30 transition-all duration-500">
          <div className="w-16 h-16 bg-indigo-600/10 text-indigo-500 rounded-[1.75rem] flex items-center justify-center border border-indigo-500/20 shadow-inner group-hover:scale-110 transition-transform">
            <Lock className="w-8 h-8" />
          </div>
          <div className="space-y-4">
             <h3 className="text-3xl font-black text-white tracking-tight uppercase">Protection IP</h3>
             <p className="text-slate-400 font-medium leading-relaxed text-lg italic">
               Les PDF et ressources pédagogiques sont sécurisés dans l'application. Pas de téléchargement sauvage, juste du savoir.
             </p>
          </div>
        </div>
        <div className="glass-card p-12 rounded-[3.5rem] border border-white/5 space-y-8 shadow-2xl group hover:border-emerald-500/30 transition-all duration-500">
          <div className="w-16 h-16 bg-emerald-600/10 text-emerald-500 rounded-[1.75rem] flex items-center justify-center border border-emerald-500/20 shadow-inner group-hover:scale-110 transition-transform">
            <EyeOff className="w-8 h-8" />
          </div>
          <div className="space-y-4">
             <h3 className="text-3xl font-black text-white tracking-tight uppercase">Focus Total</h3>
             <p className="text-slate-400 font-medium leading-relaxed text-lg italic">
               Un environnement sans publicité ni distractions sociales. Ta seule priorité : ton diplôme.
             </p>
          </div>
        </div>
      </div>

      {/* Partnership Intent (The Letter) */}
      <section className="bg-slate-900 rounded-[4rem] p-12 md:p-24 text-white relative overflow-hidden shadow-2xl border border-white/5">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full -mr-64 -mt-64 blur-[120px]" />
        
        <div className="relative z-10 flex flex-col lg:flex-row gap-24 items-start">
          <div className="flex-1 space-y-12">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-white/5 rounded-[2rem] flex items-center justify-center border border-white/10 backdrop-blur-md shadow-inner">
                <Handshake className="w-8 h-8 text-blue-400" />
              </div>
              <h2 className="text-5xl font-black tracking-tighter uppercase">Manifeste de Collaboration</h2>
            </div>
            
            <div className="space-y-10">
              <p className="text-3xl text-slate-300 font-black tracking-tight leading-tight italic border-l-8 border-blue-600 pl-10">
                "Bâtissons l'école numérique marocaine, ensemble."
              </p>
              <div className="bg-black/50 border border-white/5 p-12 rounded-[3rem] text-slate-400 font-medium leading-relaxed whitespace-pre-wrap text-lg italic shadow-inner">
                {`I’m currently developing an educational mobile app called NAJAH to help Moroccan BAC students from all filières study better and succeed.

I wanted to ask if it would be possible to use some of your lesson and exercise PDFs from AlloSchool / Moutamadris inside the app, only for educational purposes. 

The content would stay protected inside the app, with clear credit to your platform, and no unauthorized downloading or redistribution.`}
              </div>
            </div>
          </div>

          <div className="w-full lg:w-96 glass-card p-10 rounded-[3.5rem] border border-white/10 flex flex-col gap-10 shadow-2xl">
            <h3 className="font-black text-2xl tracking-tight uppercase">Contact Direct</h3>
            <div className="space-y-6">
              <div className="flex items-center gap-6 p-6 bg-white/5 rounded-[2rem] border border-white/5">
                <div className="w-14 h-14 bg-blue-600 rounded-[1.25rem] flex items-center justify-center font-black text-white shadow-lg">AH</div>
                <div>
                  <p className="text-lg font-black tracking-tight">{developerName}</p>
                  <p className="text-[10px] uppercase font-black text-slate-500 tracking-widest mt-0.5">Founder & Dev</p>
                </div>
              </div>
              <a 
                href={`https://wa.me/${whatsappNumber.replace('+', '')}`}
                target="_blank" 
                rel="noreferrer"
                className="flex items-center justify-center gap-4 w-full py-6 bg-emerald-600 hover:bg-emerald-700 text-white rounded-[2rem] font-black uppercase text-xs tracking-widest transition-all shadow-xl shadow-emerald-600/30 active:scale-95"
              >
                <MessageCircle className="w-6 h-6" /> WhatsApp Support
              </a>
              <button className="flex items-center justify-center gap-4 w-full py-6 bg-white text-black rounded-[2rem] font-black uppercase text-xs tracking-widest transition-all hover:bg-slate-100 active:scale-95 shadow-xl">
                <Mail className="w-6 h-6" /> Email Pro
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Source Credits Section */}
      <section className="space-y-12 pb-20">
        <div className="flex items-center gap-4">
           <div className="p-3 bg-indigo-600/10 rounded-xl border border-indigo-500/20"><ShieldCheck className="w-6 h-6 text-indigo-500" /></div>
           <h3 className="text-3xl font-black text-white uppercase tracking-tight">Partenaires du Savoir</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {['AlloSchool', 'Moutamadris', 'Ministère de l\'Éducation', 'Soutien Maroc'].map((source) => (
            <div key={source} className="glass-card p-8 rounded-[2.5rem] border border-white/5 flex items-center justify-between group cursor-pointer hover:border-indigo-600/50 transition-all shadow-xl">
              <span className="font-black text-white uppercase tracking-widest text-[10px]">{source}</span>
              <ExternalLink className="w-5 h-5 text-slate-700 group-hover:text-indigo-500 transition-colors" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
