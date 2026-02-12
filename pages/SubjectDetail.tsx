
import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SUBJECTS_MAP, MOCK_CHAPTERS } from '../constants.tsx';
import { Filiere, LessonResource, Chapter } from '../types.ts';
import { 
  ArrowLeft, 
  PlayCircle, 
  FileText, 
  CheckCircle2, 
  Clock, 
  Search,
  Zap,
  BookOpen,
  X,
  ExternalLink,
  ChevronRight,
  Filter,
  LayoutGrid,
  Star,
  Eye,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  TrendingUp
} from 'lucide-react';

type ResourceFilter = 'all' | 'course' | 'exercise' | 'video' | 'quiz';

const SubjectDetail: React.FC = () => {
  const { subjectId } = useParams<{ subjectId: string }>();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<ResourceFilter>('all');
  const [viewerResource, setViewerResource] = useState<LessonResource | null>(null);
  const [expandedChapter, setExpandedChapter] = useState<string | null>(null);

  const [seenLessons, setSeenLessons] = useState<string[]>(() => {
    const saved = localStorage.getItem('najah_seen_lessons');
    return saved ? JSON.parse(saved) : [];
  });

  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('najah_favorite_lessons');
    return saved ? JSON.parse(saved) : [];
  });

  const selectedFiliere = (localStorage.getItem('filiere') as Filiere) || Filiere.PC;
  
  const subjectData = useMemo(() => {
    return SUBJECTS_MAP[selectedFiliere].find(s => s.id === subjectId);
  }, [selectedFiliere, subjectId]);

  const chapters = useMemo(() => {
    if (!subjectId) return [];
    return MOCK_CHAPTERS[subjectId] || [];
  }, [subjectId]);

  const filteredData = useMemo(() => {
    return chapters
      .map(chapter => {
        const matchingResources = chapter.resources.filter(res => 
          selectedType === 'all' || res.type === selectedType
        );
        return { ...chapter, resources: matchingResources };
      })
      .filter(chapter => {
        const matchesSearch = 
          chapter.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          chapter.description.toLowerCase().includes(searchQuery.toLowerCase());
        const hasResources = chapter.resources.length > 0;
        return matchesSearch && (selectedType === 'all' ? true : hasResources);
      });
  }, [chapters, searchQuery, selectedType]);

  const toggleSeen = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newSeen = seenLessons.includes(id) 
      ? seenLessons.filter(i => i !== id) 
      : [...seenLessons, id];
    setSeenLessons(newSeen);
    localStorage.setItem('najah_seen_lessons', JSON.stringify(newSeen));
  };

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newFavs = favorites.includes(id) 
      ? favorites.filter(i => i !== id) 
      : [...favorites, id];
    setFavorites(newFavs);
    localStorage.setItem('najah_favorite_lessons', JSON.stringify(newFavs));
  };

  const openViewer = (res: LessonResource, e: React.MouseEvent) => {
    e.stopPropagation();
    if (res.status !== 'available') return;
    setViewerResource(res);
    localStorage.setItem('najah_last_seen', res.id);
  };

  if (!subjectData) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center animate-in zoom-in duration-500">
        <div className="bg-red-500/10 p-10 rounded-[3rem] border border-red-500/20 mb-8 shadow-[0_0_30px_rgba(239,68,68,0.1)]">
          <BookOpen className="w-16 h-16 text-red-500" />
        </div>
        <h2 className="text-3xl font-black text-white tracking-tight">Matière introuvable</h2>
        <p className="text-slate-500 mt-3 mb-10 max-w-sm italic">Elle n'est pas encore disponible dans ta filière actuelle.</p>
        <button onClick={() => navigate('/subjects')} className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-2xl shadow-blue-500/20 active:scale-95 transition-all">Retour aux cours</button>
      </div>
    );
  }

  const filterOptions: { id: ResourceFilter; label: string; icon: React.ElementType }[] = [
    { id: 'all', label: 'Tout', icon: LayoutGrid },
    { id: 'course', label: 'Cours', icon: FileText },
    { id: 'exercise', label: 'Exercices', icon: CheckCircle2 },
    { id: 'video', label: 'Vidéos', icon: PlayCircle },
    { id: 'quiz', label: 'Quizz', icon: Clock },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-20">
      {/* Enhanced PDF Viewer */}
      {viewerResource && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-3xl p-0 lg:p-6 animate-in fade-in duration-300">
          <div className="w-full h-full max-w-7xl bg-white rounded-none lg:rounded-[3rem] shadow-2xl overflow-hidden flex flex-col border border-white/5">
            <div className="flex items-center gap-4 p-4 lg:p-6 border-b border-slate-100 bg-white">
              <div className="flex items-center gap-4 flex-1">
                <div className={`w-12 h-12 ${subjectData.color} text-white rounded-2xl flex items-center justify-center shadow-lg border border-white/10`}><FileText className="w-6 h-6" /></div>
                <div>
                  <h3 className="font-black text-slate-900 truncate max-w-[200px] lg:max-w-md tracking-tight">{viewerResource.title}</h3>
                  <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{viewerResource.provider || 'Source Officielle'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <a 
                  href={viewerResource.url} 
                  target="_blank" 
                  rel="noreferrer"
                  className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:text-blue-600 transition-all border border-slate-100"
                >
                  <ExternalLink className="w-5 h-5" />
                </a>
                <button onClick={() => setViewerResource(null)} className="p-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all shadow-lg shadow-red-500/20"><X className="w-5 h-5" /></button>
              </div>
            </div>
            <div className="flex-1 bg-white">
               <iframe src={`https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(viewerResource.url)}`} className="w-full h-full border-none" title="Aperçu" />
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col gap-8">
        <button onClick={() => navigate('/subjects')} className="group flex items-center gap-2 text-slate-500 hover:text-blue-500 font-black text-[10px] uppercase tracking-widest w-fit transition-all">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1" />
          Retour au programme
        </button>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-10">
          <div className="flex items-center gap-6">
            <div className={`w-20 h-20 ${subjectData.color} rounded-[2rem] flex items-center justify-center text-white shadow-2xl shadow-current/20 border border-white/10`}>
              <Zap className="w-10 h-10" />
            </div>
            <div>
              <h1 className="text-5xl font-black text-white tracking-tighter">{subjectData.name}</h1>
              <div className="flex items-center gap-3 mt-2">
                <div className="h-1.5 w-32 bg-slate-900 rounded-full overflow-hidden border border-white/5">
                   <div 
                    className={`h-full ${subjectData.color} transition-all duration-1000 shadow-[0_0_10px_rgba(59,130,246,0.5)]`}
                    style={{ width: `${Math.round((seenLessons.filter(id => chapters.some(c => c.id === id)).length / (chapters.length || 1)) * 100)}%` }}
                   />
                </div>
                <span className="text-blue-500 font-black uppercase tracking-widest text-[9px]">{seenLessons.filter(id => chapters.some(c => c.id === id)).length} / {chapters.length} Finis</span>
              </div>
            </div>
          </div>
          
          <div className="relative group">
            <input 
              type="text" placeholder="Chapitre..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-80 bg-slate-900/50 border border-white/5 rounded-2xl py-4.5 pl-14 pr-6 text-sm font-medium focus:ring-4 focus:ring-blue-500/10 outline-none text-white placeholder-slate-600"
            />
            <Search className="absolute left-5 top-5 w-5 h-5 text-slate-600 group-focus-within:text-blue-500 transition-colors" />
          </div>
        </div>

        <div className="flex flex-wrap gap-2.5 pt-2">
          {filterOptions.map((opt) => (
            <button key={opt.id} onClick={() => setSelectedType(opt.id)}
              className={`flex items-center gap-3 px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 ${selectedType === opt.id ? 'bg-blue-600 text-white shadow-[0_10px_30px_-5px_rgba(37,99,235,0.4)] ring-1 ring-white/10' : 'bg-slate-900 text-slate-500 border border-white/5 hover:border-slate-700'}`}
            >
              <opt.icon className={`w-4 h-4 ${selectedType === opt.id ? 'text-white' : 'text-slate-600'}`} /> {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chapters Grid */}
      <div className="space-y-8">
        {filteredData.length > 0 ? filteredData.map((chapter) => {
          const isSeen = seenLessons.includes(chapter.id);
          const isFav = favorites.includes(chapter.id);
          const isExpanded = expandedChapter === chapter.id;
          
          return (
            <div key={chapter.id} 
              className={`glass-card rounded-[3rem] border transition-all duration-500 premium-shadow group border-l-[12px] ${isSeen ? 'border-l-emerald-600/50' : 'border-l-blue-600/50'} ${isExpanded ? 'ring-2 ring-blue-500/20 scale-[1.01]' : ''}`}
            >
              <div className="p-10 flex flex-col lg:flex-row lg:items-center gap-10 cursor-pointer" onClick={() => setExpandedChapter(isExpanded ? null : chapter.id)}>
                <div className="flex-1 space-y-5">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className={`text-[9px] font-black uppercase px-3 py-1.5 rounded-lg border ${chapter.difficulty === 'Difficile' ? 'bg-red-500/10 text-red-500 border-red-500/20' : chapter.difficulty === 'Moyen' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' : 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'}`}>
                      {chapter.difficulty}
                    </span>
                    {chapter.examWeight >= 4 && (
                      <span className="bg-purple-500/10 text-purple-400 text-[9px] font-black uppercase px-3 py-1.5 rounded-lg border border-purple-500/20 flex items-center gap-2 shadow-[0_0_15px_rgba(168,85,247,0.15)]">
                        <TrendingUp className="w-3.5 h-3.5" /> Majeur au National
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <h3 className={`text-3xl font-black tracking-tighter ${isSeen ? 'text-slate-500 line-through' : 'text-white group-hover:text-blue-400 transition-colors'}`}>{chapter.title}</h3>
                    <div className="flex items-center gap-2 flex-shrink-0">
                       <button onClick={(e) => toggleFavorite(chapter.id, e)} className={`p-4 rounded-2xl transition-all active:scale-90 ${isFav ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20' : 'bg-slate-900 text-slate-600 hover:text-amber-500 border border-white/5'}`}>
                        <Star className={`w-5 h-5 ${isFav ? 'fill-current' : ''}`} />
                      </button>
                      <button onClick={(e) => toggleSeen(chapter.id, e)} className={`p-4 rounded-2xl transition-all active:scale-90 ${isSeen ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20' : 'bg-slate-900 text-slate-600 hover:text-emerald-500 border border-white/5'}`}>
                        <Eye className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <p className="text-slate-400 text-lg font-medium leading-relaxed max-w-3xl italic">"{chapter.description}"</p>
                </div>

                <div className="flex flex-wrap lg:flex-nowrap gap-4 items-center">
                   {chapter.resources.map((res, i) => (
                    <button key={i} onClick={(e) => openViewer(res, e)}
                      className="group/res p-6 bg-slate-900/50 rounded-[2rem] hover:bg-blue-600 hover:text-white transition-all text-center flex flex-col items-center gap-3 min-w-[100px] border border-white/5 shadow-inner"
                    >
                      {res.type === 'course' && <FileText className="w-6 h-6 text-blue-500 group-hover/res:text-white" />}
                      {res.type === 'exercise' && <CheckCircle2 className="w-6 h-6 text-emerald-500 group-hover/res:text-white" />}
                      {res.type === 'video' && <PlayCircle className="w-6 h-6 text-red-500 group-hover/res:text-white" />}
                      <span className="text-[9px] font-black uppercase tracking-[0.2em]">{res.type}</span>
                    </button>
                  ))}
                  <div className="p-4 rounded-2xl bg-white/5 text-slate-500 group-hover:bg-white/10 transition-colors border border-white/5">
                    {isExpanded ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
                  </div>
                </div>
              </div>

              {isExpanded && (
                <div className="px-10 pb-10 pt-10 border-t border-white/5 grid grid-cols-1 md:grid-cols-2 gap-12 animate-in slide-in-from-top-6 duration-500">
                  <div className="space-y-6">
                    <h4 className="flex items-center gap-3 font-black text-[11px] uppercase tracking-[0.2em] text-blue-500"><Zap className="w-5 h-5" /> Concepts Fondamentaux</h4>
                    <div className="grid grid-cols-1 gap-3">
                      {chapter.keyConcepts.map(c => (
                        <div key={c} className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5 text-sm font-medium text-slate-300">
                          <div className="w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.6)]" /> {c}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-6">
                    <h4 className="flex items-center gap-3 font-black text-[11px] uppercase tracking-[0.2em] text-indigo-500"><LayoutGrid className="w-5 h-5" /> Structure de l'étude</h4>
                    <div className="space-y-3">
                      {chapter.outline.map((o, idx) => (
                        <div key={idx} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 group/line">
                          <span className="text-sm text-slate-300 font-medium"> <span className="text-slate-600 font-black mr-4 text-xs tracking-widest">PARTIE 0{idx+1}</span> {o}</span>
                          <CheckCircle2 className="w-4 h-4 text-slate-800 group-hover/line:text-blue-500/50 transition-colors" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        }) : (
          <div className="text-center py-32 bg-slate-950/50 rounded-[3rem] border border-dashed border-white/5 shadow-inner">
            <div className="w-20 h-20 bg-slate-900 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 border border-white/5">
               <AlertCircle className="w-10 h-10 text-slate-600" />
            </div>
            <p className="text-slate-600 font-black uppercase text-xs tracking-widest mb-2">Indexation en cours</p>
            <p className="text-slate-400 font-medium text-lg italic max-w-sm mx-auto">Nous préparons les archives de cette matière pour toi.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubjectDetail;
