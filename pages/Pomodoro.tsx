
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
    <div className="flex flex-col items-center justify-center space-y-8 animate-in zoom-in duration-500 py-12">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Timer Pomodoro</h1>
        <p className="text-slate-500 dark:text-slate-400">Reste concentré sur tes révisions, une session à la fois.</p>
      </div>

      <div className={`
        relative w-72 h-72 sm:w-80 sm:h-80 rounded-full flex items-center justify-center border-8 transition-colors duration-500
        ${mode === 'work' ? 'border-blue-500 shadow-lg shadow-blue-500/20' : 'border-emerald-500 shadow-lg shadow-emerald-500/20'}
        bg-white dark:bg-slate-800
      `}>
        <div className="text-center">
          <p className="text-6xl sm:text-7xl font-mono font-bold text-slate-900 dark:text-white">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </p>
          <p className={`text-sm font-bold uppercase tracking-widest mt-2 ${mode === 'work' ? 'text-blue-500' : 'text-emerald-500'}`}>
            {mode === 'work' ? 'Concentration' : 'Pause'}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button 
          onClick={setWorkMode}
          className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all ${mode === 'work' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/40' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
        >
          <Brain className="w-4 h-4" /> Focus
        </button>
        <button 
          onClick={setBreakMode}
          className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all ${mode === 'break' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
        >
          <Coffee className="w-4 h-4" /> Pause
        </button>
      </div>

      <div className="flex items-center gap-6">
        <button 
          onClick={resetTimer}
          className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
        >
          <RotateCcw className="w-6 h-6" />
        </button>
        <button 
          onClick={toggleTimer}
          className={`
            w-20 h-20 rounded-full flex items-center justify-center text-white shadow-xl transition-all hover:scale-105 active:scale-95
            ${isActive ? 'bg-slate-900 dark:bg-slate-700' : 'bg-blue-600'}
          `}
        >
          {isActive ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
        </button>
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
          <p className="text-xs text-slate-400 font-bold uppercase mb-1">Sessions</p>
          <p className="text-xl font-bold text-slate-900 dark:text-white text-center">{totalSessions}</p>
        </div>
      </div>

      <div className="max-w-md w-full bg-blue-50 dark:bg-blue-900/20 p-6 rounded-2xl border border-blue-100 dark:border-blue-900/30">
        <div className="flex gap-4">
          <div className="w-10 h-10 bg-blue-100 dark:bg-blue-800 rounded-lg flex items-center justify-center flex-shrink-0">
            <Bell className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h4 className="font-bold text-blue-900 dark:text-blue-200">Conseil NAJAH</h4>
            <p className="text-sm text-blue-700/80 dark:text-blue-300/70">
              La méthode Pomodoro aide à lutter contre la procrastination en découpant le travail en blocs gérables de 25 minutes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pomodoro;
