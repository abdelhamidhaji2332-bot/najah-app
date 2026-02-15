
import React, { useState } from 'react';
import { Plus, CheckCircle2, Trash2, Calendar as CalendarIcon, Clock } from 'lucide-react';
import { Task } from '../types.ts';

const Planner: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', text: 'Réviser les bases théoriques', completed: false, dueDate: '2024-10-25' },
    { id: '2', text: 'Compléter la série d\'exercices 04', completed: true, dueDate: '2024-10-24' },
    { id: '3', text: 'Lecture approfondie du prochain module', completed: false, dueDate: '2024-10-26' },
  ]);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (!newTask.trim()) return;
    const task: Task = {
      id: Date.now().toString(),
      text: newTask,
      completed: false,
      dueDate: new Date().toISOString().split('T')[0]
    };
    setTasks([task, ...tasks]);
    setNewTask('');
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-in slide-in-from-bottom-8 duration-700 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight uppercase">Planning <span className="text-blue-600">Personnel</span></h1>
          <p className="text-slate-500 font-medium italic mt-1">"Une journée organisée est une journée victorieuse."</p>
        </div>
        <div className="flex items-center gap-3 bg-blue-600/10 px-6 py-3 rounded-2xl text-blue-400 border border-blue-600/20 shadow-inner">
          <CalendarIcon className="w-5 h-5" />
          <span className="font-black uppercase text-[10px] tracking-widest">{new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}</span>
        </div>
      </div>

      <div className="glass-card p-10 rounded-[3rem] border border-white/5 space-y-10">
        <div className="flex gap-4">
          <div className="flex-1 relative group">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addTask()}
              placeholder="Ajouter une tâche (ex: Apprendre le nouveau cours)..."
              className="w-full bg-slate-900 border border-white/5 rounded-[1.5rem] px-8 py-5 text-sm font-medium focus:ring-4 focus:ring-blue-500/10 outline-none text-white shadow-inner placeholder-slate-600"
            />
          </div>
          <button 
            onClick={addTask}
            className="bg-blue-600 text-white px-10 py-5 rounded-[1.5rem] hover:bg-blue-700 transition-all flex items-center gap-3 font-black uppercase text-[10px] tracking-widest shadow-xl shadow-blue-500/20 active:scale-95 flex-shrink-0"
          >
            <Plus className="w-6 h-6" /> Ajouter
          </button>
        </div>

        <div className="space-y-4">
          {tasks.length === 0 ? (
            <div className="text-center py-20 bg-slate-900/50 rounded-[2.5rem] border border-dashed border-white/5">
              <CheckCircle2 className="w-16 h-16 mx-auto mb-6 text-slate-800" />
              <p className="text-slate-500 font-bold text-lg italic">Tout est à jour pour aujourd'hui !</p>
            </div>
          ) : (
            tasks.map(task => (
              <div 
                key={task.id}
                className={`
                  flex items-center justify-between p-6 rounded-[2rem] border transition-all duration-300 group
                  ${task.completed 
                    ? 'bg-slate-900/30 border-white/5 opacity-50' 
                    : 'bg-slate-900/60 border-white/5 hover:border-blue-500/30 hover:bg-slate-900/80'}
                `}
              >
                <div className="flex items-center gap-6">
                  <button onClick={() => toggleTask(task.id)} className="transition-transform active:scale-90">
                    {task.completed 
                      ? <div className="w-8 h-8 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-lg shadow-emerald-600/20"><CheckCircle2 className="w-5 h-5" /></div> 
                      : <div className="w-8 h-8 rounded-xl border-2 border-slate-700 hover:border-blue-600 transition-colors" />
                    }
                  </button>
                  <div>
                    <p className={`font-black text-lg tracking-tight ${task.completed ? 'line-through text-slate-600' : 'text-white'}`}>
                      {task.text}
                    </p>
                    <div className="flex items-center gap-3 mt-1.5">
                      <span className="flex items-center gap-2 text-[9px] uppercase font-black tracking-widest text-slate-500">
                        <Clock className="w-3.5 h-3.5" /> Aujourd'hui
                      </span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => deleteTask(task.id)}
                  className="p-4 text-slate-700 hover:text-red-500 hover:bg-red-500/10 rounded-2xl transition-all opacity-0 group-hover:opacity-100"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-150 transition-transform duration-700" />
          <h3 className="text-xl font-black uppercase tracking-widest mb-2 text-blue-200">Progression</h3>
          <div className="flex items-end gap-3 mb-6">
            <span className="text-6xl font-black tracking-tighter">14</span>
            <span className="text-blue-100 font-bold uppercase text-[10px] tracking-widest pb-3">tâches cette semaine</span>
          </div>
          <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden border border-white/10 shadow-inner">
            <div className="bg-white h-full rounded-full shadow-[0_0_10px_rgba(255,255,255,0.6)] transition-all duration-1000" style={{ width: '70%' }} />
          </div>
        </div>
        
        <div className="glass-card p-10 rounded-[3rem] border border-white/5 flex flex-col justify-center text-center">
          <p className="text-slate-400 font-medium text-lg leading-relaxed italic mb-4">
            "Le succès n'est pas final, l'échec n'est pas fatal : c'est le courage de continuer qui compte."
          </p>
          <p className="text-blue-500 font-black uppercase text-[10px] tracking-[0.2em]">— Winston Churchill</p>
        </div>
      </div>
    </div>
  );
};

export default Planner;
