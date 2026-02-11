
import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SUBJECTS_MAP, MOCK_CHAPTERS } from '../constants';
import { Filiere, LessonResource, Chapter } from '../types';
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
    // Try to find the exact subject in the current filiere
    return SUBJECTS_MAP[selectedFiliere].find(s => s.id === subjectId);
  }, [selectedFiliere, subjectId]);

  const chapters = useMemo(() => {
    if (!subjectId) return [];
    // Directly pull from the expanded MOCK_CHAPTERS database using the subject ID
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
  };

  if (!subjectData) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="bg-red-100 p-6 rounded-full mb-6">
          <BookOpen className="w-12 h-12 text-red-600" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Sujet non trouvé</h2>
        <p className="text-slate-500 mt-2 mb-8">La matière que vous recherchez n'est pas répertoriée pour votre filière.</p>
        <button onClick={() => navigate('/subjects')} className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold">Retour aux cours</button>
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
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      {/* Enhanced PDF Viewer */}
      {viewerResource && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/95 backdrop-blur-xl p-0 lg:p-6">
          <div className="w-full h-full max-w-7xl bg-white dark:bg-slate-900 rounded-none lg:rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col">
            <div className="flex items-center gap-4 p-4 lg:p-6 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
              <div className="flex items-center gap-4 flex-1">
                <div className={`w-10 h-10 ${subjectData.color} text-white rounded-xl flex items-center justify-center`}><FileText className="w-5 h-5" /></div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white truncate max-w-[200px]">{viewerResource.title}</h3>
                  <p className="text-[10px] font-black uppercase text-slate-400">{viewerResource.provider || 'Source AlloSchool'}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <a 
                  href={viewerResource.url} 
                  target="_blank" 
                  rel="noreferrer"
                  className="p-3 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded-xl hover:text-blue-600"
                >
                  <ExternalLink className="w-5 h-5" />
                </a>
                <button onClick={() => setViewerResource(null)} className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-all"><X className="w-5 h-5" /></button>
              </div>
            </div>
            <div className="flex-1 bg-white">
               <iframe src={`https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(viewerResource.url)}`} className="w-full h-full border-none" title="Aperçu" />
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col gap-6">
        <button onClick={() => navigate('/subjects')} className="group flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold w-fit transition-colors">
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1" />
          Toutes les matières
        </button>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className={`w-16 h-16 ${subjectData.color} rounded-3xl flex items-center justify-center text-white shadow-2xl shadow-current/20`}>
              <Zap className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">{subjectData.name}</h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-blue-600 font-bold uppercase tracking-widest text-[10px]">{seenLessons.filter(id => chapters.some(c => c.id === id)).length} / {chapters.length} Chapitres Terminés</span>
              </div>
            </div>
          </div>
          
          <div className="relative group">
            <input 
              type="text" placeholder="Chercher un chapitre..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-72 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl py-4 px-12 text-sm focus:ring-4 focus:ring-blue-500/10 outline-none"
            />
            <Search className="absolute left-4 top-4 w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 pt-2">
          {filterOptions.map((opt) => (
            <button key={opt.id} onClick={() => setSelectedType(opt.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${selectedType === opt.id ? 'bg-blue-600 text-white shadow-lg' : 'bg-white dark:bg-slate-800 text-slate-500 border border-slate-100 dark:border-slate-700'}`}
            >
              <opt.icon className="w-4 h-4" /> {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chapters Grid */}
      <div className="space-y-6">
        {filteredData.length > 0 ? filteredData.map((chapter) => {
          const isSeen = seenLessons.includes(chapter.id);
          const isFav = favorites.includes(chapter.id);
          const isExpanded = expandedChapter === chapter.id;
          
          return (
            <div key={chapter.id} 
              className={`bg-white dark:bg-slate-800 rounded-[2.5rem] border transition-all p-8 shadow-sm hover:shadow-xl group border-l-8 ${isSeen ? 'border-l-emerald-500' : 'border-l-blue-600'}`}
              onClick={() => setExpandedChapter(isExpanded ? null : chapter.id)}
            >
              <div className="flex flex-col lg:flex-row lg:items-center gap-8 cursor-pointer">
                <div className="flex-1 space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full ${chapter.difficulty === 'Difficile' ? 'bg-red-100 text-red-600' : chapter.difficulty === 'Moyen' ? 'bg-amber-100 text-amber-600' : 'bg-emerald-100 text-emerald-600'}`}>
                      {chapter.difficulty}
                    </span>
                    {chapter.examWeight >= 4 && (
                      <span className="bg-purple-100 text-purple-600 text-[10px] font-black uppercase px-3 py-1 rounded-full flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" /> Prioritaire au National
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <h3 className={`text-2xl font-bold tracking-tight ${isSeen ? 'text-slate-500' : 'text-slate-900 dark:text-white'}`}>{chapter.title}</h3>
                    <div className="flex items-center gap-2">
                       <button onClick={(e) => toggleFavorite(chapter.id, e)} className={`p-2 rounded-xl transition-all ${isFav ? 'bg-amber-100 text-amber-600 shadow-inner' : 'text-slate-300 hover:text-amber-500'}`}>
                        <Star className={`w-5 h-5 ${isFav ? 'fill-amber-500' : ''}`} />
                      </button>
                      <button onClick={(e) => toggleSeen(chapter.id, e)} className={`p-2 rounded-xl transition-all ${isSeen ? 'bg-emerald-100 text-emerald-600 shadow-inner' : 'text-slate-300 hover:text-emerald-500'}`}>
                        <Eye className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <p className="text-slate-500 text-sm font-medium leading-relaxed">{chapter.description}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                   {chapter.resources.map((res, i) => (
                    <button key={i} onClick={(e) => openViewer(res, e)}
                      className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl hover:bg-blue-600 hover:text-white transition-all text-center flex flex-col items-center gap-1 min-w-[80px]"
                    >
                      {res.type === 'course' && <FileText className="w-5 h-5" />}
                      {res.type === 'exercise' && <CheckCircle2 className="w-5 h-5" />}
                      {res.type === 'video' && <PlayCircle className="w-5 h-5" />}
                      <span className="text-[10px] font-black uppercase tracking-widest">{res.type}</span>
                    </button>
                  ))}
                  <button className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-700 text-slate-400 group-hover:bg-slate-200 transition-colors">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {isExpanded && (
                <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-700 grid grid-cols-1 md:grid-cols-2 gap-8 animate-in slide-in-from-top-4">
                  <div className="space-y-4">
                    <h4 className="flex items-center gap-2 font-black text-[10px] uppercase tracking-widest text-blue-600"><Zap className="w-4 h-4" /> Concepts Clés</h4>
                    <ul className="space-y-2">
                      {chapter.keyConcepts.map(c => (
                        <li key={c} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 font-medium">
                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" /> {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h4 className="flex items-center gap-2 font-black text-[10px] uppercase tracking-widest text-indigo-600"><LayoutGrid className="w-4 h-4" /> Plan du Cours</h4>
                    <ul className="space-y-2">
                      {chapter.outline.map((o, idx) => (
                        <li key={idx} className="text-sm text-slate-600 dark:text-slate-400 font-medium flex items-center gap-3">
                          <span className="text-[10px] font-black text-slate-300">0{idx+1}</span> {o}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          );
        }) : (
          <div className="text-center py-20 bg-slate-50 rounded-[2.5rem] border border-dashed border-slate-200">
            <AlertCircle className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-400 font-bold uppercase text-xs tracking-widest">Bientôt disponible</p>
            <p className="text-slate-500 mt-2">Nous indexons actuellement les leçons de cette matière.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubjectDetail;
