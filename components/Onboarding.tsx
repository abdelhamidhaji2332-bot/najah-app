
import React, { useState } from 'react';
import { Filiere, BacLevel, Language } from '../types.ts';
import { 
  ChevronRight, 
  ChevronLeft, 
  Globe, 
  GraduationCap, 
  BookOpen,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

interface OnboardingProps {
  onComplete: () => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [config, setConfig] = useState({
    lang: 'FR' as Language,
    level: BacLevel.BAC2,
    filiere: Filiere.PC
  });

  const next = () => setStep(s => s + 1);
  const prev = () => setStep(s => s - 1);

  const saveAndFinish = () => {
    localStorage.setItem('najah_lang', config.lang);
    localStorage.setItem('bac_level', config.level);
    localStorage.setItem('filiere', config.filiere);
    localStorage.setItem('najah_onboarded', 'true');
    onComplete();
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-10 animate-in slide-in-from-right duration-500">
            <div className="text-center space-y-4">
              <div className="w-24 h-24 bg-blue-600/20 rounded-[2.5rem] flex items-center justify-center text-blue-500 mx-auto shadow-[0_0_40px_rgba(37,99,235,0.2)] mb-10 border border-blue-500/30">
                <Globe className="w-12 h-12" />
              </div>
              <h1 className="text-5xl font-black text-white tracking-tighter">Choisissez votre langue</h1>
              <p className="text-slate-400 font-medium text-lg">Pour une expérience de révision immersive.</p>
            </div>
            <div className="grid gap-4 max-w-sm mx-auto">
              {['FR', 'AR', 'EN'].map((l) => (
                <button
                  key={l}
                  onClick={() => { setConfig({...config, lang: l as Language}); next(); }}
                  className={`p-6 rounded-[2rem] border transition-all flex items-center justify-between group ${config.lang === l ? 'border-blue-600 bg-blue-600/10' : 'border-white/5 bg-slate-900/40 hover:border-white/20'}`}
                >
                  <span className="font-bold text-lg text-white">{l === 'FR' ? 'Français' : l === 'AR' ? 'العربية' : 'English'}</span>
                  <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors ${config.lang === l ? 'border-blue-600 bg-blue-600 text-white' : 'border-white/10'}`}>
                    {config.lang === l && <CheckCircle2 className="w-5 h-5" />}
                  </div>
                </button>
              ))}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-10 animate-in slide-in-from-right duration-500">
            <div className="text-center space-y-4">
              <div className="w-24 h-24 bg-indigo-600/20 rounded-[2.5rem] flex items-center justify-center text-indigo-500 mx-auto shadow-[0_0_40px_rgba(79,70,229,0.2)] mb-10 border border-indigo-500/30">
                <GraduationCap className="w-12 h-12" />
              </div>
              <h1 className="text-5xl font-black text-white tracking-tighter">Votre Niveau Bac</h1>
              <p className="text-slate-400 font-medium text-lg">Nous adaptons le programme officiel pour vous.</p>
            </div>
            <div className="grid gap-4 max-w-sm mx-auto">
              {Object.values(BacLevel).map((l) => (
                <button
                  key={l}
                  onClick={() => { setConfig({...config, level: l}); next(); }}
                  className={`p-6 rounded-[2rem] border transition-all flex items-center justify-between group ${config.level === l ? 'border-indigo-600 bg-indigo-600/10' : 'border-white/5 bg-slate-900/40 hover:border-white/20'}`}
                >
                  <span className="font-bold text-lg text-white">{l}</span>
                  <ChevronRight className={`w-6 h-6 transition-transform group-hover:translate-x-1 ${config.level === l ? 'text-indigo-600' : 'text-slate-600'}`} />
                </button>
              ))}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-10 animate-in slide-in-from-right duration-500">
            <div className="text-center space-y-4">
              <div className="w-24 h-24 bg-emerald-600/20 rounded-[2.5rem] flex items-center justify-center text-emerald-500 mx-auto shadow-[0_0_40px_rgba(16,185,129,0.2)] mb-10 border border-emerald-500/30">
                <BookOpen className="w-12 h-12" />
              </div>
              <h1 className="text-5xl font-black text-white tracking-tighter">Quelle est votre filière ?</h1>
              <p className="text-slate-400 font-medium text-lg">Concentrez-vous sur vos matières spécifiques.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto overflow-y-auto max-h-[40vh] px-4 custom-scrollbar no-scrollbar">
              {Object.values(Filiere).map((f) => (
                <button
                  key={f}
                  onClick={() => setConfig({...config, filiere: f})}
                  className={`p-6 rounded-[2rem] border transition-all text-left group ${config.filiere === f ? 'border-emerald-600 bg-emerald-600/10' : 'border-white/5 bg-slate-900/40 hover:border-white/20'}`}
                >
                  <span className="font-bold text-sm leading-tight block text-white">{f}</span>
                </button>
              ))}
            </div>
            <button 
              onClick={saveAndFinish}
              className="w-full max-w-sm mx-auto flex items-center justify-center gap-4 bg-blue-600 text-white py-6 rounded-[2rem] font-black uppercase text-xs tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 active:scale-95"
            >
              Lancer NAJAH <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 lg:p-12 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[10%] left-[10%] w-[40%] h-[40%] bg-blue-600/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[10%] right-[10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[150px] rounded-full" />
      </div>
      
      <div className="max-w-4xl w-full relative z-10">
        <div className="flex items-center justify-between mb-16">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-sm shadow-[0_0_20px_rgba(37,99,235,0.4)]">N</div>
             <span className="font-black text-2xl tracking-tighter text-white uppercase">NAJAH<span className="text-blue-600">.</span></span>
          </div>
          {step > 1 && (
            <button onClick={prev} className="flex items-center gap-2 text-slate-500 font-bold text-sm hover:text-white transition-colors">
              <ChevronLeft className="w-5 h-5" /> Retour
            </button>
          )}
        </div>
        {renderStep()}
        <div className="flex justify-center gap-3 mt-16">
          {[1, 2, 3].map(i => (
            <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${step === i ? 'w-12 bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.6)]' : 'w-3 bg-slate-800'}`} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
