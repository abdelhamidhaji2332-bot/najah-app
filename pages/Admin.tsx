
import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Database, 
  Plus, 
  Trash2, 
  Edit, 
  Lock, 
  Copy, 
  CheckCircle2,
  X,
  Link as LinkIcon,
  ExternalLink,
  Search,
  Save,
  FileText,
  Filter,
} from 'lucide-react';
import { Filiere, Subject, ResourceType } from '../types.ts';
import { SUBJECTS, CHAPTERS } from '../constants.tsx';

interface AdminResource {
  id: string;
  chapterId: string;
  title: string;
  type: ResourceType;
  status: 'available' | 'locked';
  url: string;
  provider: string;
}

const Admin: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState('');
  const [resources, setResources] = useState<AdminResource[]>(() => {
    const saved = localStorage.getItem('najah_admin_resources_v3');
    return saved ? JSON.parse(saved) : [
      { id: '1', chapterId: 'ch-math-1', title: 'Fiche 01: Limites', type: 'course', status: 'available', url: 'https://drive.google.com/file/d/1', provider: 'Prof Fayssal' },
    ];
  });

  const [showModal, setShowModal] = useState(false);
  const [formResource, setFormResource] = useState<Partial<AdminResource>>({
    title: '',
    type: 'course',
    url: '',
    provider: 'NAJAH',
    chapterId: CHAPTERS[0]?.id || '',
    status: 'available'
  });

  useEffect(() => {
    localStorage.setItem('najah_admin_resources_v3', JSON.stringify(resources));
  }, [resources]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const newRes = { ...formResource, id: Date.now().toString() } as AdminResource;
    setResources([newRes, ...resources]);
    setShowModal(false);
  };

  if (!isAdmin) {
    return (
      <div className="max-w-md mx-auto py-20 animate-in fade-in zoom-in duration-500 bg-black">
        <div className="bg-slate-900/50 p-10 rounded-[2.5rem] border border-white/5 shadow-2xl text-center">
          <div className="w-20 h-20 bg-blue-600/10 rounded-[2rem] flex items-center justify-center mx-auto mb-8 border border-blue-500/20 shadow-inner">
            <ShieldCheck className="w-10 h-10 text-blue-500" />
          </div>
          <h2 className="text-3xl font-black text-white mb-2 uppercase tracking-tighter">Admin <span className="text-blue-600">Secure</span></h2>
          <div className="relative mb-6 mt-8">
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Code"
              className="w-full bg-black border border-white/10 rounded-2xl px-6 py-5 outline-none focus:ring-4 focus:ring-blue-500/10 text-white transition-all text-center font-mono text-xl tracking-widest"
            />
          </div>
          <button 
            onClick={() => password === 'f008f008' ? setIsAdmin(true) : alert('Code incorrect')}
            className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20"
          >
            Se Connecter
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in slide-in-from-right duration-500 pb-20 bg-black min-h-screen">
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-blue-600 text-white rounded-2xl shadow-xl shadow-blue-500/20">
              <Database className="w-8 h-8" />
            </div>
            <h1 className="text-4xl font-black text-white tracking-tight uppercase">Curriculum <span className="text-blue-600">Manager</span></h1>
          </div>
        </div>
        <button onClick={() => setShowModal(true)} className="bg-blue-600 text-white px-8 py-5 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-blue-700 transition-all flex items-center justify-center gap-3">
          <Plus className="w-5 h-5" /> Ajouter
        </button>
      </header>

      {showModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="bg-slate-900 w-full max-w-2xl rounded-[3rem] border border-white/10 overflow-hidden shadow-2xl">
            <div className="p-10 border-b border-white/5 bg-black/40 flex justify-between items-center">
              <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Nouveau Ressource</h3>
              <button onClick={() => setShowModal(false)} className="p-3 bg-black rounded-2xl text-slate-500 border border-white/5"><X className="w-6 h-6" /></button>
            </div>
            <form onSubmit={handleSave} className="p-10 space-y-6">
               <input 
                 type="text" placeholder="Titre" className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-white" 
                 value={formResource.title} onChange={e => setFormResource({...formResource, title: e.target.value})} 
               />
               <select className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-white" value={formResource.chapterId} onChange={e => setFormResource({...formResource, chapterId: e.target.value})}>
                 {CHAPTERS.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
               </select>
               <input type="url" placeholder="URL Drive" className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-white" value={formResource.url} onChange={e => setFormResource({...formResource, url: e.target.value})} />
               <button type="submit" className="w-full bg-blue-600 text-white py-6 rounded-2xl font-black uppercase text-xs tracking-widest">Enregistrer</button>
            </form>
          </div>
        </div>
      )}

      <div className="bg-black/40 rounded-[3rem] border border-white/5 shadow-2xl overflow-hidden">
        <table className="w-full text-left">
           <thead>
              <tr className="bg-black/60 border-b border-white/5">
                 <th className="px-10 py-8 text-[10px] font-black text-slate-500 uppercase tracking-widest">Titre</th>
                 <th className="px-10 py-8 text-[10px] font-black text-slate-500 uppercase tracking-widest">Chapitre</th>
                 <th className="px-10 py-8 text-[10px] font-black text-slate-500 uppercase tracking-widest text-right">Actions</th>
              </tr>
           </thead>
           <tbody className="divide-y divide-white/5">
              {resources.map(res => (
                <tr key={res.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-4">
                      <FileText className="w-6 h-6 text-blue-500" />
                      <span className="font-black text-white">{res.title}</span>
                    </div>
                  </td>
                  <td className="px-10 py-8 text-slate-400 font-medium">
                    {CHAPTERS.find(c => c.id === res.chapterId)?.title || 'Inconnu'}
                  </td>
                  <td className="px-10 py-8 text-right">
                    <button onClick={() => setResources(resources.filter(r => r.id !== res.id))} className="p-3 bg-red-950/20 text-red-500 rounded-xl"><Trash2 className="w-5 h-5" /></button>
                  </td>
                </tr>
              ))}
           </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;
