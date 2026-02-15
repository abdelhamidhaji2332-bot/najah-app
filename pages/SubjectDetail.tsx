
import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SUBJECTS, CHAPTERS, RESOURCES as INITIAL_RESOURCES } from '../constants.tsx';
import { Filiere, LessonResource, Chapter } from '../types.ts';
import PdfViewer from '../components/PdfViewer.tsx';
import DriveExplorer from '../components/DriveExplorer.tsx';
import { generateSummary } from '../services/geminiService.ts';
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
  ChevronDown,
  ChevronUp,
  ChevronRight,
  AlertCircle,
  TrendingUp,
  LayoutGrid,
  Star,
  FolderOpen,
  Plus,
  Sparkles,
  Loader2,
  Copy,
  Check,
  ChevronLeft,
  Layout
} from 'lucide-react';

type ResourceFilter = 'all' | 'course' | 'exercise' | 'video' | 'quiz';

const SubjectDetail: React.FC = () => {
  const { subjectId } = useParams<{ subjectId: string }>();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<ResourceFilter>('all');
  
  // State for Viewers
  const [viewerResource, setViewerResource] = useState<LessonResource | null>(null);
  const [activeExplorer, setActiveExplorer] = useState<{ url: string, title: string, chapterTitle: string } | null>(null);
  
  const [expandedChapter, setExpandedChapter] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState<string | null>(null);
  
  // AI Summary State
  const [activeSummary, setActiveSummary] = useState<{ chapterId: string, text: string } | null>(null);
  const [isSummaryLoading, setIsSummaryLoading] = useState(false);
  const [hasCopied, setHasCopied] = useState(false);

  // Local Storage States
  const [customResources, setCustomResources] = useState<LessonResource[]>(() => {
    const saved = localStorage.getItem('najah_custom_resources');
    return saved ? JSON.parse(saved) : [];
  });

  const [seenLessons, setSeenLessons] = useState<string[]>(() => {
    const saved = localStorage.getItem('najah_seen_lessons');
    return saved ? JSON.parse(saved) : [];
  });

  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('najah_favorite_lessons');
    return saved ? JSON.parse(saved) : [];
  });

  const subjectData = useMemo(() => SUBJECTS.find(s => s.id === subjectId), [subjectId]);
  
  const allResources = useMemo(() => [...INITIAL_RESOURCES, ...customResources], [customResources]);

  const generalSections = useMemo(() => {
    return allResources.filter(r => 
      (r.chapterId === 'global' || r.id.includes('sec-')) && 
      (r.id.startsWith(subjectId!) || r.url.includes(subjectId!))
    );
  }, [allResources, subjectId]);

  const subjectChapters = useMemo(() => {
    if (!subjectId) return [];
    return CHAPTERS.filter(c => c.subjectId === subjectId);
  }, [subjectId]);

  const filteredChapters = useMemo(() => {
    return subjectChapters
      .map(chapter => {
        const matchingResources = allResources.filter(res => 
          res.chapterId === chapter.id && (selectedType === 'all' || res.type === selectedType)
        );
        return { ...chapter, resources: matchingResources };
      })
      .filter(chapter => {
        const matchesSearch = 
          chapter.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          chapter.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesSearch && (selectedType === 'all' || chapter.resources.length > 0);
      });
  }, [subjectChapters, searchQuery, selectedType, allResources]);

  const handleResourceClick = (res: LessonResource | { url: string, title: string, chapterTitle: string }, e: React.MouseEvent) => {
    e.stopPropagation();
    
    const isDriveFolder = res.url.includes('drive.google.com') && res.url.includes('/folders/');
    
    if (isDriveFolder) {
      setActiveExplorer({ 
        url: res.url, 
        title: res.title, 
        chapterTitle: (res as any).chapterTitle || 'Section' 
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setViewerResource(res as LessonResource);
    }
  };

  const toggleSeen = (id: string) => {
    const newSeen = seenLessons.includes(id) ? seenLessons.filter(i => i !== id) : [...seenLessons, id];
    setSeenLessons(newSeen);
    localStorage.setItem('najah_seen_lessons', JSON.stringify(newSeen));
  };

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newFavs = favorites.includes(id) ? favorites.filter(i => i !== id) : [...favorites, id];
    setFavorites(newFavs);
    localStorage.setItem('najah_favorite_lessons', JSON.stringify(newFavs));
  };

  if (!subjectData) return null;

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-20 bg-black min-h-screen">
      {/* Modals & Viewers */}
      {viewerResource && (
        <PdfViewer 
          url={viewerResource.url}
          title={viewerResource.title}
          onClose={() => setViewerResource(null)}
          subjectName={subjectData.name}
        />
      )}

      {/* Header & Controls */}
      <div className="flex flex-col gap-10">
        <div className="flex items-center gap-6">
          <button onClick={() => navigate('/library')} className="group flex items-center gap-3 text-slate-600 hover:text-blue-500 font-black text-[11px] uppercase tracking-widest transition-all">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1" />
            Bibliothèque
          </button>
          
          {activeExplorer && (
            <button 
              onClick={() => setActiveExplorer(null)}
              className="flex items-center gap-3 text-blue-500 font-black text-[11px] uppercase tracking-widest hover:text-white transition-all"
            >
              <ChevronLeft className="w-4 h-4" /> Retour aux Chapitres
            </button>
          )}
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
          <div className="flex items-center gap-8">
            <div className={`w-24 h-24 ${subjectData.color} rounded-[2.5rem] flex items-center justify-center text-white shadow-2xl border border-white/10 group-hover:rotate-6 transition-transform duration-700`}>
              <Zap className="w-12 h-12" />
            </div>
            <div>
              <h1 className="text-6xl font-black text-white tracking-tighter uppercase leading-none">{subjectData.name}</h1>
              <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.4em] mt-3">{subjectChapters.length} Chapitres Officiels</p>
            </div>
          </div>
          
          {!activeExplorer && (
            <div className="relative group w-full lg:w-96">
              <input 
                type="text" placeholder="Filtrer par titre ou concept..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900/50 border border-white/5 rounded-3xl py-6 pl-14 pr-8 text-sm focus:ring-4 focus:ring-blue-500/10 outline-none text-white transition-all shadow-inner"
              />
              <Search className="absolute left-6 top-6.5 w-5 h-5 text-slate-700 group-focus-within:text-blue-500 transition-colors" />
            </div>
          )}
        </div>
      </div>

      {/* Workspace Display */}
      {activeExplorer ? (
        <DriveExplorer 
          url={activeExplorer.url}
          title={activeExplorer.title}
          subjectName={subjectData.name}
          chapterTitle={activeExplorer.chapterTitle}
          onClose={() => setActiveExplorer(null)}
        />
      ) : (
        <div className="space-y-16">
          {/* 1. Global Sections (Books, Cours, Exams) */}
          {generalSections.length > 0 && (
            <section className="space-y-6">
              <div className="flex items-center gap-4 px-2">
                <LayoutGrid className="w-6 h-6 text-blue-500" />
                <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Espaces de Travail</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {generalSections.map(section => (
                  <button 
                    key={section.id}
                    onClick={(e) => handleResourceClick({ url: section.url, title: section.title, chapterTitle: 'Général' }, e)}
                    className="flex flex-col items-start p-10 bg-slate-950 border border-white/5 rounded-[3.5rem] hover:border-blue-500/40 transition-all group relative overflow-hidden premium-shadow"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:scale-150 transition-transform" />
                    <div className="w-16 h-16 bg-blue-600/10 text-blue-500 rounded-2xl flex items-center justify-center border border-blue-500/20 shadow-inner mb-6 group-hover:rotate-6 transition-transform">
                      <FolderOpen className="w-8 h-8" />
                    </div>
                    <div className="space-y-1 text-left relative z-10">
                      <h4 className="text-2xl font-black text-white uppercase tracking-tighter">{section.title}</h4>
                      <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Section Principale</p>
                    </div>
                    <div className="mt-8 w-full flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-blue-500">
                      <span>Ouvrir l'explorateur</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </button>
                ))}
              </div>
            </section>
          )}

          {/* 2. Chapters List */}
          <section className="space-y-8">
            <div className="flex items-center justify-between px-2">
               <div className="flex items-center gap-4">
                  <BookOpen className="w-6 h-6 text-indigo-500" />
                  <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Progression du Cours</h2>
               </div>
               <div className="flex gap-2">
                 {['all', 'course', 'exercise'].map(type => (
                   <button 
                    key={type} onClick={() => setSelectedType(type as any)}
                    className={`px-6 py-2 rounded-full text-[9px] font-black uppercase tracking-widest border transition-all ${selectedType === type ? 'bg-blue-600 border-blue-500 text-white' : 'bg-slate-950 border-white/5 text-slate-500'}`}
                   >
                     {type === 'all' ? 'Tout' : type === 'course' ? 'Cours' : 'Exercices'}
                   </button>
                 ))}
               </div>
            </div>

            <div className="space-y-6">
              {filteredChapters.map(chapter => {
                const isExpanded = expandedChapter === chapter.id;
                const isCompleted = seenLessons.includes(chapter.id);
                return (
                  <div key={chapter.id} className={`glass-card rounded-[3.5rem] border transition-all duration-700 bg-black/40 overflow-hidden ${isExpanded ? 'border-blue-600/40' : 'border-white/5'}`}>
                    <div className="p-10 flex flex-col lg:flex-row lg:items-center gap-8 cursor-pointer" onClick={() => setExpandedChapter(isExpanded ? null : chapter.id)}>
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-3">
                          <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${isCompleted ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 'bg-blue-600/10 text-blue-500 border border-blue-500/20'}`}>
                            {isCompleted ? 'Maitrisé' : chapter.difficulty}
                          </span>
                        </div>
                        <h3 className="text-3xl font-black text-white tracking-tighter uppercase leading-tight group-hover:text-blue-500 transition-colors">{chapter.title}</h3>
                      </div>
                      <div className="flex items-center gap-4">
                        <button onClick={(e) => toggleFavorite(chapter.id, e)} className={`p-4 rounded-2xl border transition-all ${favorites.includes(chapter.id) ? 'bg-amber-500/10 border-amber-500/20 text-amber-500' : 'bg-slate-950 border-white/5 text-slate-700 hover:text-white'}`}>
                          <Star className={`w-6 h-6 ${favorites.includes(chapter.id) ? 'fill-amber-500' : ''}`} />
                        </button>
                        <div className={`p-4 rounded-2xl border transition-all ${isExpanded ? 'bg-blue-600 text-white' : 'bg-slate-950 border-white/5 text-slate-700'}`}>
                          {isExpanded ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
                        </div>
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="px-10 pb-10 pt-4 animate-in slide-in-from-top-4 duration-500 space-y-10">
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {chapter.resources.map(res => (
                              <button 
                                key={res.id} onClick={(e) => handleResourceClick({ ...res, chapterTitle: chapter.title }, e)}
                                className="flex items-center justify-between p-6 bg-slate-950 border border-white/5 rounded-[2.25rem] hover:border-blue-500/40 transition-all text-left group/item"
                              >
                                <div className="flex items-center gap-4">
                                  <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-blue-500 border border-white/5 group-hover/item:scale-110 transition-transform">
                                    {res.url.includes('/folders/') ? <FolderOpen className="w-6 h-6" /> : <FileText className="w-6 h-6" />}
                                  </div>
                                  <div>
                                    <p className="font-black text-sm text-white uppercase tracking-tighter">{res.title}</p>
                                    <p className="text-[9px] text-slate-600 font-black uppercase tracking-widest">{res.provider || 'Najah'}</p>
                                  </div>
                                </div>
                                <ChevronRight className="w-5 h-5 text-slate-800 group-hover/item:translate-x-1 transition-transform" />
                              </button>
                            ))}
                         </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default SubjectDetail;
