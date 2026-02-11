
import React, { useState } from 'react';
import { Plus, CheckCircle2, Circle, Trash2, Calendar as CalendarIcon, Clock } from 'lucide-react';
import { Task } from '../types';

const Planner: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', text: 'Réviser les limites - Math', completed: false, dueDate: '2024-10-25' },
    { id: '2', text: 'Faire l\'exercice 4 - Physique', completed: true, dueDate: '2024-10-24' },
    { id: '3', text: 'Lire le chapitre sur la Radioactivité', completed: false, dueDate: '2024-10-26' },
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
    <div className="max-w-3xl mx-auto space-y-8 animate-in slide-in-from-bottom-8 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-1">Planning d'Étude</h1>
          <p className="text-slate-500 dark:text-slate-400">Gère tes tâches et reste discipliné.</p>
        </div>
        <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-xl text-blue-600 dark:text-blue-400">
          <CalendarIcon className="w-5 h-5" />
          <span className="font-bold">{new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}</span>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="flex gap-2 mb-8">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTask()}
            placeholder="Ajouter une tâche (ex: Apprendre l'Arabe)..."
            className="flex-1 bg-slate-50 dark:bg-slate-700 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none dark:text-white"
          />
          <button 
            onClick={addTask}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            <span className="hidden sm:inline">Ajouter</span>
          </button>
        </div>

        <div className="space-y-3">
          {tasks.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <CheckCircle2 className="w-12 h-12 mx-auto mb-3 opacity-20" />
              <p>Aucune tâche pour le moment. Félicitations !</p>
            </div>
          ) : (
            tasks.map(task => (
              <div 
                key={task.id}
                className={`
                  flex items-center justify-between p-4 rounded-xl border transition-all
                  ${task.completed 
                    ? 'bg-slate-50 dark:bg-slate-700/30 border-slate-100 dark:border-slate-700 opacity-60' 
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:shadow-md'}
                `}
              >
                <div className="flex items-center gap-4">
                  <button onClick={() => toggleTask(task.id)} className="text-blue-600 dark:text-blue-400">
                    {task.completed ? <CheckCircle2 className="w-6 h-6" /> : <Circle className="w-6 h-6" />}
                  </button>
                  <div>
                    <p className={`font-medium ${task.completed ? 'line-through text-slate-500' : 'text-slate-800 dark:text-slate-200'}`}>
                      {task.text}
                    </p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="flex items-center gap-1 text-[10px] uppercase font-bold text-slate-400">
                        <Clock className="w-3 h-3" /> Aujourd'hui
                      </span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => deleteTask(task.id)}
                  className="p-2 text-slate-300 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-6 rounded-2xl text-white">
          <h3 className="text-lg font-bold mb-2">Statistiques Hebdo</h3>
          <div className="flex items-end gap-2 mb-4">
            <span className="text-4xl font-bold">14</span>
            <span className="text-blue-100 pb-1">tâches finies</span>
          </div>
          <div className="w-full bg-white/20 h-2 rounded-full">
            <div className="bg-white h-full rounded-full" style={{ width: '70%' }} />
          </div>
        </div>
        <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 italic">Citation Success</h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
            "Le succès n'est pas final, l'échec n'est pas fatal : c'est le courage de continuer qui compte."
          </p>
          <p className="text-blue-600 dark:text-blue-400 font-bold mt-2 text-sm text-right">— Winston Churchill</p>
        </div>
      </div>
    </div>
  );
};

export default Planner;
