
import React, { useState } from 'react';
import { Filiere, BacLevel, Language } from '../types';
import { 
  ChevronRight, 
  ChevronLeft, 
  Sparkles, 
  CheckCircle2, 
  Globe, 
  GraduationCap, 
  BookOpen,
  ArrowRight
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
    onComplete();
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-8 animate-in slide-in-from-right duration-500">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-blue-600 rounded-[2.5rem] flex items-center justify-center text-white mx-auto shadow-2xl shadow-blue-500/30 mb-8">
                <Globe className="w-10 h-10" />
              </div>
              <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Choisissez votre langue</h1>
              <p className="text-slate-500 font-medium">Pour une expérience personnalisée de révision.</p>
            </div>
            <div className="grid gap-4 max-w-sm mx-auto">
              {['FR', 'AR', 'EN'].map((l) => (
                <button
                  key={l}
                  onClick={() => { setConfig({...config, lang: l as Language}); next(); }}
                  className={`p-6 rounded-3xl border-2 transition-all flex items-center justify-between group ${config.lang === l ? 'border-blue-600 bg-blue-50' : 'border-slate-100 bg-white hover:border-blue-200'}`}
                >
                  <span className="font-bold text-lg">{l === 'FR' ? 'Français' : l === 'AR' ? 'العربية' : 'English'}</span>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${config.lang === l ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-200'}`}>
                    {config.lang === l && <CheckCircle2 className="w-4 h-4" />}
                  </div>
                </button>
              ))}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-8 animate-in slide-in-from-right duration-500">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-indigo-600 rounded-[2.5rem] flex items-center justify-center text-white mx-auto shadow-2xl shadow-indigo-500/30 mb-8">
                <GraduationCap className="w-10 h-10" />
              </div>
              <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Votre Niveau Bac</h1>
              <p className="text-slate-500 font-medium">Nous adapterons le programme officiel.</p>
            </div>
            <div className="grid gap-4 max-w-sm mx-auto">
              {Object.values(BacLevel).map((l) => (
                <button
                  key={l}
                  onClick={() => { setConfig({...config, level: l}); next(); }}
                  className={`p-6 rounded-3xl border-2 transition-all flex items-center justify-between group ${config.level === l ? 'border-indigo-600 bg-indigo-50' : 'border-slate-100 bg-white hover:border-indigo-200'}`}
                >
                  <span className="font-bold text-lg">{l}</span>
                  <ChevronRight className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${config.level === l ? 'text-indigo-600' : 'text-slate-300'}`} />
                </button>
              ))}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-8 animate-in slide-in-from-right duration-500">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-emerald-600 rounded-[2.5rem] flex items-center justify-center text-white mx-auto shadow-2xl shadow-emerald-500/30 mb-8">
                <BookOpen className="w-10 h-10" />
              </div>
              <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Quelle est votre filière ?</h1>
              <p className="text-slate-500 font-medium">Pour filtrer les matières spécifiques.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto overflow-y-auto max-h-[50vh] px-2 custom-scrollbar">
              {Object.values(Filiere).map((f) => (
                <button
                  key={f}
                  onClick={() => setConfig({...config, filiere: f})}
                  className={`p-6 rounded-3xl border-2 transition-all text-left group ${config.filiere === f ? 'border-emerald-600 bg-emerald-50' : 'border-slate-100 bg-white hover:border-emerald-200'}`}
                >
                  <span className="font-bold text-sm leading-tight block">{f}</span>
                </button>
              ))}
            </div>
            <button 
              onClick={saveAndFinish}
              className="w-full max-w-sm mx-auto flex items-center justify-center gap-3 bg-slate-900 text-white py-6 rounded-3xl font-black uppercase text-xs tracking-widest hover:bg-black transition-all shadow-xl active:scale-95"
            >
              C'est parti ! <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 lg:p-12 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100 rounded-full blur-[120px] -ml-48 -mt-48 opacity-60" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-100 rounded-full blur-[120px] -mr-48 -mb-48 opacity-60" />
      
      <div className="max-w-4xl w-full relative z-10">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white font-black text-xs">N</div>
             <span className="font-black text-xl tracking-tighter">NAJAH<span className="text-blue-600">.</span></span>
          </div>
          {step > 1 && (
            <button onClick={prev} className="flex items-center gap-2 text-slate-400 font-bold text-sm hover:text-slate-600 transition-colors">
              <ChevronLeft className="w-5 h-5" /> Retour
            </button>
          )}
        </div>
        {renderStep()}
        <div className="flex justify-center gap-2 mt-12">
          {[1, 2, 3].map(i => (
            <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${step === i ? 'w-8 bg-blue-600' : 'w-2 bg-slate-200'}`} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
