
import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Database, 
  Plus, 
  Trash2, 
  Edit, 
  Power, 
  Lock, 
  MessageSquare, 
  Copy, 
  CheckCircle2,
  Handshake,
  X,
  Link as LinkIcon,
  ExternalLink,
  Search,
  Save,
  FileText,
  Filter,
  MoreVertical,
  Calendar
} from 'lucide-react';
import { Filiere, Subject } from '../types';
// Fix: Change SUBJECTS to SUBJECTS_MAP
import { SUBJECTS_MAP } from '../constants';

interface DriveResource {
  id: string;
  title: string;
  type: 'Course' | 'Exercise' | 'Exam' | 'Video' | 'Quiz';
  status: 'Active' | 'Inactive';
  link: string;
  provider: string;
  subjectId: string;
  filiere: Filiere | 'Toutes';
  year?: string;
}

const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'content' | 'outreach'>('content');
  const [showModal, setShowModal] = useState<{show: boolean, mode: 'add' | 'edit'}>({show: false, mode: 'add'});
  const [searchQuery, setSearchQuery] = useState('');
  const [subjectFilter, setSubjectFilter] = useState<string>('All');
  
  const [resources, setResources] = useState<DriveResource[]>(() => {
    const saved = localStorage.getItem('najah_admin_resources_v2');
    return saved ? JSON.parse(saved) : [
      { id: '1', title: 'Fiche 01: Étude des fonctions', type: 'Course', status: 'Active', link: 'https://drive.google.com/file/d/1', provider: 'Prof Fayssal', subjectId: 'math', filiere: Filiere.PC },
      { id: '2', title: 'Correction National 2024 PC', type: 'Exam', status: 'Active', link: 'https://drive.google.com/file/d/2', provider: 'Moutamadris', subjectId: 'pc', filiere: Filiere.PC, year: '2024' },
      // Fix: Change Filiere.SM to Filiere.SM_A
      { id: '3', title: 'Résumé Ondes Mécaniques', type: 'Exercise', status: 'Inactive', link: 'https://drive.google.com/file/d/3', provider: 'AlloSchool', subjectId: 'pc', filiere: Filiere.SM_A },
    ];
  });

  const [formResource, setFormResource] = useState<Partial<DriveResource>>({ 
    title: '', 
    type: 'Course', 
    link: '', 
    provider: 'NAJAH',
    subjectId: 'math',
    filiere: Filiere.PC,
    year: ''
  });
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);
  const [urlCopiedId, setUrlCopiedId] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('najah_admin_resources_v2', JSON.stringify(resources));
  }, [resources]);

  const handleCopyPitch = () => {
    const pitch = `I’m currently developing an educational mobile app called NAJAH to help Moroccan BAC students from all filières study better and succeed. 
    I wanted to ask if it would be possible to use some of your lesson and exercise PDFs...`;
    navigator.clipboard.writeText(pitch);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const copyUrl = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setUrlCopiedId(id);
    setTimeout(() => setUrlCopiedId(null), 2000);
  };

  const toggleStatus = (id: string) => {
    setResources(prev => prev.map(r => 
      r.id === id ? { ...r, status: r.status === 'Active' ? 'Inactive' : 'Active' } : r
    ));
  };

  const deleteResource = (id: string) => {
    if (window.confirm("Supprimer définitivement cette ressource ?")) {
      setResources(prev => prev.filter(r => r.id !== id));
    }
  };

  const handleSaveResource = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formResource.title || !formResource.link) return;
    
    if (showModal.mode === 'add') {
      const newRes: DriveResource = {
        ...formResource as DriveResource,
        id: Date.now().toString(),
        status: 'Active'
      };
      setResources([newRes, ...resources]);
    } else {
      setResources(prev => prev.map(r => r.id === editingId ? { ...r, ...formResource } as DriveResource : r));
    }

    setFormResource({ title: '', type: 'Course', link: '', provider: 'NAJAH', subjectId: 'math', filiere: Filiere.PC });
    setShowModal({ show: false, mode: 'add' });
    setEditingId(null);
  };

  const startEdit = (res: DriveResource) => {
    setEditingId(res.id);
    setFormResource(res);
    setShowModal({ show: true, mode: 'edit' });
  };

  const filteredResources = resources.filter(r => {
    const matchesSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase()) || r.provider.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = subjectFilter === 'All' || r.subjectId === subjectFilter;
    return matchesSearch && matchesSubject;
  });

  if (!isAdmin) {
    return (
      <div className="max-w-md mx-auto py-20 animate-in fade-in zoom-in duration-500">
        <div className="bg-white dark:bg-slate-800 p-10 rounded-[2.5rem] border border-slate-200 dark:border-slate-700 shadow-2xl text-center">
          <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-inner">
            <ShieldCheck className="w-10 h-10 text-blue-600 dark:text-blue-400" />
          </div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Accès Restreint</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-10 text-sm font-medium">Authentifiez-vous pour gérer les ressources NAJAH.</p>
          
          <div className="relative mb-6">
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (password === 'f008f008' ? setIsAdmin(true) : alert('Code incorrect'))}
              placeholder="••••••••"
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl px-6 py-5 outline-none focus:ring-4 focus:ring-blue-500/10 dark:text-white transition-all text-center font-mono text-xl tracking-widest"
            />
            <Lock className="absolute right-5 top-5.5 w-5 h-5 text-slate-300" />
          </div>
          <button 
            onClick={() => password === 'f008f008' ? setIsAdmin(true) : alert('Code incorrect')}
            className="w-full bg-slate-900 dark:bg-blue-600 text-white py-5 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-slate-800 dark:hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 active:scale-[0.98]"
          >
            Se Connecter
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in slide-in-from-right duration-500 pb-20">
      {/* Dynamic Form Modal */}
      {showModal.show && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200 p-4">
          <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden border border-slate-100 dark:border-slate-800">
            <div className="p-10 border-b border-slate-50 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50">
              <div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                  {showModal.mode === 'edit' ? 'Modifier la ressource' : 'Ajouter un nouveau PDF'}
                </h3>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Gestionnaire Drive Sync</p>
              </div>
              <button onClick={() => setShowModal({show: false, mode: 'add'})} className="p-3 bg-white dark:bg-slate-800 rounded-2xl text-slate-400 hover:text-red-500 shadow-sm transition-all hover:rotate-90">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleSaveResource} className="p-10 space-y-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] px-1">Titre du document</label>
                  <input 
                    type="text" 
                    value={formResource.title}
                    onChange={(e) => setFormResource({...formResource, title: e.target.value})}
                    className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-2xl px-6 py-4 outline-none focus:ring-4 focus:ring-blue-500/10 transition-all font-bold"
                    placeholder="Ex: Fiche 04: Primitives"
                    required
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] px-1">Type de contenu</label>
                  <select 
                    value={formResource.type}
                    onChange={(e) => setFormResource({...formResource, type: e.target.value as any})}
                    className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-2xl px-6 py-4 outline-none focus:ring-4 focus:ring-blue-500/10 font-bold"
                  >
                    <option value="Course">Cours (PDF)</option>
                    <option value="Exercise">Exercice</option>
                    <option value="Exam">Examen National</option>
                    <option value="Video">Vidéo</option>
                    <option value="Quiz">Quiz Interactif</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] px-1">Matière</label>
                  <select 
                    value={formResource.subjectId}
                    onChange={(e) => setFormResource({...formResource, subjectId: e.target.value})}
                    className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-2xl px-6 py-4 outline-none font-bold"
                  >
                    {/* Unique subjects from all filieres. Fix: Cast Object.values to Subject[][] for correct flat() inference */}
                    {Array.from(new Set((Object.values(SUBJECTS_MAP) as Subject[][]).flat().map(s => s.id))).map((id) => (
                      <option key={id} value={id}>{id.toUpperCase()}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] px-1">Filière Cible</label>
                  <select 
                    value={formResource.filiere}
                    onChange={(e) => setFormResource({...formResource, filiere: e.target.value as Filiere})}
                    className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-2xl px-6 py-4 outline-none font-bold"
                  >
                    <option value="Toutes">Toutes les filières</option>
                    {Object.values(Filiere).map(f => <option key={f} value={f}>{f}</option>)}
                  </select>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] px-1">Année (Optionnel)</label>
                  <input 
                    type="text" 
                    value={formResource.year}
                    onChange={(e) => setFormResource({...formResource, year: e.target.value})}
                    className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-2xl px-6 py-4 outline-none font-bold text-center"
                    placeholder="Ex: 2024"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] px-1">Lien Google Drive</label>
                <div className="relative">
                  <input 
                    type="url" 
                    value={formResource.link}
                    onChange={(e) => setFormResource({...formResource, link: e.target.value})}
                    className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-2xl pl-14 pr-6 py-5 outline-none focus:ring-4 focus:ring-blue-500/10 transition-all font-medium text-blue-600 dark:text-blue-400"
                    placeholder="https://drive.google.com/..."
                    required
                  />
                  <LinkIcon className="absolute left-5 top-5 w-6 h-6 text-slate-300" />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] px-1">Source / Plateforme</label>
                <input 
                  type="text" 
                  value={formResource.provider}
                  onChange={(e) => setFormResource({...formResource, provider: e.target.value})}
                  className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-2xl px-6 py-4 outline-none font-bold" 
                  placeholder="Ex: Prof Fayssal, AlloSchool..." 
                />
              </div>

              <div className="pt-6">
                <button type="submit" className="w-full bg-blue-600 text-white py-6 rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-2xl shadow-blue-500/30 hover:bg-blue-700 hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center gap-4">
                  {showModal.mode === 'edit' ? <Save className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                  {showModal.mode === 'edit' ? 'Mettre à jour la base' : 'Enregistrer dans le curriculum'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Main Header */}
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-blue-600 text-white rounded-2xl shadow-xl shadow-blue-500/20">
              <Database className="w-8 h-8" />
            </div>
            <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              Gestion du Curriculum
            </h1>
          </div>
          <p className="text-slate-500 dark:text-slate-400 font-medium italic text-lg leading-relaxed">Centralisez vos PDF, corrections et vidéos en un seul endroit.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
           <div className="relative group">
              <input 
                type="text"
                placeholder="Rechercher..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-64 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl pl-12 pr-4 py-5 text-sm outline-none focus:ring-4 focus:ring-blue-500/10 shadow-sm transition-all"
              />
              <Search className="absolute left-4 top-5 w-5 h-5 text-slate-400 group-focus-within:text-blue-500" />
           </div>
           <button 
            onClick={() => { setFormResource({ title: '', type: 'Course', link: '', provider: 'NAJAH', subjectId: 'math', filiere: Filiere.PC }); setShowModal({show: true, mode: 'add'}); }}
            className="bg-blue-600 text-white px-8 py-5 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-blue-700 transition-all flex items-center justify-center gap-3 shadow-2xl shadow-blue-500/20 active:scale-95"
          >
            <Plus className="w-5 h-5" /> Ajouter Ressource
          </button>
        </div>
      </header>

      {/* Tabs & Filters */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-3 bg-slate-100 dark:bg-slate-900 p-2 rounded-2xl">
          <button 
            onClick={() => setActiveTab('content')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${activeTab === 'content' ? 'bg-white dark:bg-slate-800 shadow-xl text-blue-600 dark:text-white' : 'text-slate-500'}`}
          >
            Curriculum ({resources.length})
          </button>
          <button 
            onClick={() => setActiveTab('outreach')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${activeTab === 'outreach' ? 'bg-white dark:bg-slate-800 shadow-xl text-blue-600 dark:text-white' : 'text-slate-500'}`}
          >
            Partenariats
          </button>
        </div>

        {activeTab === 'content' && (
          <div className="flex items-center gap-3">
            <Filter className="w-4 h-4 text-slate-400" />
            <select 
              value={subjectFilter}
              onChange={(e) => setSubjectFilter(e.target.value)}
              className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2 text-xs font-bold outline-none"
            >
              <option value="All">Toutes les matières</option>
              {Array.from(new Set(resources.map(r => r.subjectId))).map((sub: string) => (
                <option key={sub} value={sub}>{sub.toUpperCase()}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      {activeTab === 'content' ? (
        <div className="bg-white dark:bg-slate-800 rounded-[3rem] border border-slate-200 dark:border-slate-700 shadow-2xl shadow-slate-200/50 dark:shadow-none overflow-hidden animate-in fade-in duration-500">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/80 dark:bg-slate-900/50 backdrop-blur-md">
                  <th className="px-10 py-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Document & Filière</th>
                  <th className="px-10 py-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Lien Drive</th>
                  <th className="px-10 py-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Statut</th>
                  <th className="px-10 py-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                {filteredResources.length > 0 ? filteredResources.map((res) => (
                  <tr key={res.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/50 transition-colors group/row">
                    <td className="px-10 py-8">
                      <div className="flex items-center gap-5">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover/row:scale-110 ${res.type === 'Course' ? 'bg-indigo-50 text-indigo-600' : 'bg-blue-50 text-blue-600'}`}>
                          {res.type === 'Video' ? <PlayCircle className="w-7 h-7" /> : <FileText className="w-7 h-7" />}
                        </div>
                        <div>
                          <p className="font-black text-slate-900 dark:text-slate-200 text-xl tracking-tight mb-1">{res.title}</p>
                          <div className="flex items-center gap-2">
                             <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest bg-slate-100 dark:bg-slate-900 px-2 py-0.5 rounded-md">
                                {res.subjectId.toUpperCase()}
                             </span>
                             <span className="text-[10px] text-blue-500 font-black uppercase tracking-widest">
                                {res.filiere} {res.year && `• ${res.year}`}
                             </span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-10 py-8">
                      <div className="flex items-center gap-3 max-w-[250px]">
                        <button 
                          onClick={() => copyUrl(res.id, res.link)}
                          className={`p-3 rounded-xl transition-all ${urlCopiedId === res.id ? 'bg-emerald-500 text-white' : 'bg-slate-100 dark:bg-slate-900 text-slate-400 hover:text-blue-600'}`}
                        >
                          {urlCopiedId === res.id ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </button>
                        <span className="text-xs font-mono text-slate-400 truncate opacity-50 group-hover/row:opacity-100 transition-opacity">
                          {res.link}
                        </span>
                        <a href={res.link} target="_blank" rel="noreferrer" className="p-3 text-slate-300 hover:text-blue-600 transition-colors bg-white dark:bg-slate-800 rounded-xl shadow-sm">
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </td>
                    <td className="px-10 py-8">
                      <button 
                        onClick={() => toggleStatus(res.id)}
                        className={`
                          inline-flex items-center gap-3 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all
                          ${res.status === 'Active' ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100' : 'bg-red-50 text-red-600 hover:bg-red-100'}
                        `}
                      >
                        <div className={`w-2 h-2 rounded-full ${res.status === 'Active' ? 'bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-red-500'}`} />
                        {res.status}
                      </button>
                    </td>
                    <td className="px-10 py-8 text-right">
                      <div className="flex items-center justify-end gap-3 opacity-0 group-hover/row:opacity-100 transition-opacity translate-x-4 group-hover/row:translate-x-0">
                        <button 
                          onClick={() => startEdit(res)}
                          className="p-4 bg-slate-50 dark:bg-slate-700 text-slate-400 hover:text-indigo-600 rounded-2xl transition-all hover:shadow-lg"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button 
                          onClick={() => deleteResource(res.id)}
                          className="p-4 bg-red-50 dark:bg-red-900/20 text-red-400 hover:text-red-600 rounded-2xl transition-all hover:shadow-lg"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={4} className="px-10 py-32 text-center">
                      <div className="max-w-xs mx-auto space-y-6">
                        <div className="w-20 h-20 bg-slate-50 dark:bg-slate-900 rounded-[2rem] flex items-center justify-center mx-auto">
                           <Search className="w-10 h-10 text-slate-200" />
                        </div>
                        <h4 className="text-slate-400 font-bold text-xl italic tracking-tight">Aucun document trouvé pour ces filtres.</h4>
                        <button onClick={() => { setSearchQuery(''); setSubjectFilter('All'); }} className="text-blue-600 text-xs font-black uppercase tracking-widest bg-blue-50 px-6 py-3 rounded-full hover:bg-blue-100 transition-all">Réinitialiser les filtres</button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 animate-in slide-in-from-bottom-8 duration-500">
          <div className="bg-white dark:bg-slate-800 p-12 rounded-[3.5rem] border border-slate-200 dark:border-slate-700 shadow-2xl flex flex-col gap-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-indigo-500 text-white rounded-2xl flex items-center justify-center">
                    <MessageSquare className="w-6 h-6" />
                 </div>
                 <h3 className="text-2xl font-black tracking-tight">Template de Pitch</h3>
              </div>
              <button 
                onClick={handleCopyPitch}
                className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${copied ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-200'}`}
              >
                {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copié !' : 'Copier Pitch'}
              </button>
            </div>
            <textarea 
              readOnly
              value={`I’m currently developing an educational mobile app called NAJAH to help Moroccan BAC students from all filières study better and succeed.
              
I wanted to ask if it would be possible to use some of your lesson and exercise PDFs from AlloSchool / Moutamadris inside the app, only for educational purposes. The content would stay protected inside the app, with clear credit to your platform, and no unauthorized downloading or redistribution.`}
              className="flex-1 bg-slate-50 dark:bg-slate-900 p-8 rounded-[2rem] text-sm font-medium leading-relaxed text-slate-500 dark:text-slate-400 min-h-[350px] border border-slate-100 dark:border-slate-800 focus:outline-none resize-none shadow-inner"
            />
          </div>

          <div className="space-y-8">
            <div className="bg-indigo-600 p-12 rounded-[3.5rem] text-white shadow-2xl shadow-indigo-500/30 flex flex-col justify-between h-full relative overflow-hidden group">
               <div className="absolute -right-20 -top-20 w-80 h-80 bg-white/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700" />
               <div className="relative z-10">
                  <Handshake className="w-16 h-16 mb-8 text-indigo-200" />
                  <h3 className="text-3xl font-black mb-6 tracking-tight leading-tight">Pourquoi collaborer ?</h3>
                  <ul className="space-y-6">
                    <li className="flex gap-4 items-start">
                      <div className="bg-white/20 p-1 rounded-full flex-shrink-0 mt-1"><CheckCircle2 className="w-4 h-4 text-white" /></div>
                      <p className="font-bold text-indigo-50 text-lg">Impact social gratuit pour +50,000 bacheliers.</p>
                    </li>
                    <li className="flex gap-4 items-start">
                      <div className="bg-white/20 p-1 rounded-full flex-shrink-0 mt-1"><CheckCircle2 className="w-4 h-4 text-white" /></div>
                      <p className="font-bold text-indigo-50 text-lg">Protection IP via visionneuse in-app sécurisée.</p>
                    </li>
                    <li className="flex gap-4 items-start">
                      <div className="bg-white/20 p-1 rounded-full flex-shrink-0 mt-1"><CheckCircle2 className="w-4 h-4 text-white" /></div>
                      <p className="font-bold text-indigo-50 text-lg">Exposition maximale de leur marque éducative.</p>
                    </li>
                  </ul>
               </div>
               <div className="mt-12 bg-white/10 p-8 rounded-[2.5rem] border border-white/10 backdrop-blur-md">
                 <p className="text-[10px] font-black uppercase tracking-widest text-indigo-200 mb-2">Network Expansion</p>
                 <div className="flex justify-between items-center">
                   <span className="font-black text-3xl tracking-tighter">2/10 Partenaires</span>
                   <span className="bg-emerald-400 text-emerald-950 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest animate-pulse shadow-lg shadow-emerald-400/20">Phase 1</span>
                 </div>
               </div>
            </div>
          </div>
        </div>
      )}

      {/* Sync Banner */}
      <div className="p-12 bg-slate-900 rounded-[3.5rem] text-white border border-white/5 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full -mr-48 -mt-48 blur-[100px] group-hover:bg-blue-600/20 transition-all duration-700" />
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
           <div className="w-24 h-24 bg-white/5 rounded-[2rem] flex items-center justify-center border border-white/10 backdrop-blur-md flex-shrink-0">
              <Calendar className="w-10 h-10 text-blue-400" />
           </div>
           <div>
              <h3 className="text-2xl font-black mb-3 flex items-center gap-3 tracking-tight">
                 Système de Déploiement Cloud
              </h3>
              <p className="text-lg text-slate-400 font-medium leading-relaxed max-w-3xl italic">
                "Les modifications apportées ici sont persistantes dans votre navigateur. Pour une mise à jour globale de la plateforme pour tous les utilisateurs, les données doivent être poussées vers le serveur de production NAJAH par le développeur."
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

// SVG Helpers
const PlayCircle = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/>
  </svg>
);

export default Admin;