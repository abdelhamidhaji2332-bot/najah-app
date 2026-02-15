
import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Coffee, Brain, Bell } from 'lucide-react';

const Pomodoro: React.FC = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<'work' | 'break'>('work');
  const [totalSessions, setTotalSessions] = useState(0);

  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (isActive) {
      timerRef.current = window.setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            handleTimerComplete();
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, minutes, seconds]);

  const handleTimerComplete = () => {
    setIsActive(false);
    if (timerRef.current) clearInterval(timerRef.current);
    
    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
    audio.play().catch(e => console.log('Audio error', e));

    if (mode === 'work') {
      setTotalSessions(prev => prev + 1);
      setMode('break');
      setMinutes(5);
    } else {
      setMode('work');
      setMinutes(25);
    }
    alert(mode === 'work' ? "C'est l'heure d'une pause !" : "C'est reparti pour une session focus !");
  };

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = () => {
    setIsActive(false);
    setMode('work');
    setMinutes(25);
    setSeconds(0);
  };

  const setWorkMode = () => {
    setIsActive(false);
    setMode('work');
    setMinutes(25);
    setSeconds(0);
  };

  const setBreakMode = () => {
    setIsActive(false);
    setMode('break');
    setMinutes(5);
    setSeconds(0);
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-12 animate-in zoom-in duration-700 py-12">
      <div className="text-center space-y-3">
        <h1 className="text-4xl font-black text-white tracking-tight uppercase">Focus <span className="text-blue-600">Timer</span></h1>
        <p className="text-slate-500 font-medium italic">"Une session focalisée vaut une heure de distraction."</p>
      </div>

      <div className={`
        relative w-80 h-80 sm:w-96 sm:h-96 rounded-full flex items-center justify-center border-4 transition-all duration-700 glass-card
        ${mode === 'work' ? 'border-blue-600/30 shadow-[0_0_50px_rgba(37,99,235,0.15)]' : 'border-emerald-600/30 shadow-[0_0_50px_rgba(16,185,129,0.15)]'}
      `}>
        {/* Animated Ring */}
        <div className={`absolute inset-0 rounded-full border-t-4 animate-[spin_10s_linear_infinite] ${mode === 'work' ? 'border-blue-500' : 'border-emerald-500'}`} />
        
        <div className="text-center relative z-10">
          <p className="text-7xl sm:text-8xl font-black font-mono text-white tracking-tighter text-glow">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </p>
          <div className="mt-4 flex flex-col items-center">
             <div className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${mode === 'work' ? 'bg-blue-600/10 text-blue-400' : 'bg-emerald-600/10 text-emerald-400'}`}>
                {mode === 'work' ? 'Deep Work' : 'Break Time'}
             </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 bg-slate-900/50 p-2 rounded-[2.5rem] border border-white/5">
        <button 
          onClick={setWorkMode}
          className={`flex items-center gap-3 px-8 py-3.5 rounded-3xl font-black uppercase text-[10px] tracking-widest transition-all ${mode === 'work' ? 'bg-blue-600 text-white shadow-xl' : 'text-slate-500 hover:text-white'}`}
        >
          <Brain className="w-4 h-4" /> Focus
        </button>
        <button 
          onClick={setBreakMode}
          className={`flex items-center gap-3 px-8 py-3.5 rounded-3xl font-black uppercase text-[10px] tracking-widest transition-all ${mode === 'break' ? 'bg-emerald-600 text-white shadow-xl' : 'text-slate-500 hover:text-white'}`}
        >
          <Coffee className="w-4 h-4" /> Pause
        </button>
      </div>

      <div className="flex items-center gap-8">
        <button 
          onClick={resetTimer}
          className="p-5 rounded-[2rem] bg-slate-900 border border-white/5 text-slate-500 hover:text-white transition-all active:scale-90"
        >
          <RotateCcw className="w-7 h-7" />
        </button>
        <button 
          onClick={toggleTimer}
          className={`
            w-24 h-24 rounded-[2.5rem] flex items-center justify-center text-white shadow-2xl transition-all hover:scale-105 active:scale-95 border border-white/10
            ${isActive ? 'bg-slate-800' : 'bg-blue-600 shadow-[0_0_30px_rgba(37,99,235,0.4)]'}
          `}
        >
          {isActive ? <Pause className="w-10 h-10" /> : <Play className="w-10 h-10 ml-1.5" />}
        </button>
        <div className="p-5 rounded-[2rem] bg-slate-900 border border-white/5 text-center min-w-[100px]">
          <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest mb-1">Cycles</p>
          <p className="text-2xl font-black text-white">{totalSessions}</p>
        </div>
      </div>

      <div className="max-w-md w-full glass-card p-8 rounded-[2.5rem] relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-24 h-24 bg-blue-600/5 rounded-full -mr-12 -mt-12 blur-2xl" />
        <div className="flex gap-6 items-start relative z-10">
          <div className="w-12 h-12 bg-blue-600/10 rounded-2xl flex items-center justify-center flex-shrink-0 border border-blue-600/20 shadow-inner">
            <Bell className="w-6 h-6 text-blue-500" />
          </div>
          <div>
            <h4 className="font-black uppercase text-xs tracking-widest text-blue-400 mb-2">Conseil Najah</h4>
            <p className="text-sm text-slate-400 font-medium leading-relaxed italic">
              "L'important n'est pas de travailler plus, mais de travailler mieux. La technique Pomodoro protège ta clarté mentale."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pomodoro;
