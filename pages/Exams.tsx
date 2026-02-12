
import React, { useState } from 'react';
import { MOCK_EXAMS, SUBJECTS_MAP } from '../constants.tsx';
import { Filiere, Exam } from '../types.ts';
import { 
  FileText, 
  Search, 
  X, 
  Download,
  ExternalLink,
  Award,
  ChevronLeft,
  ChevronRight,
  Maximize2
} from 'lucide-react';

const Exams: React.FC = () => {
  const [selectedFiliere] = useState<Filiere>(() => (localStorage.getItem('filiere') as Filiere) || Filiere.PC);
  const [search, setSearch] = useState('');
  const [viewerUrl, setViewerUrl] = useState<{url: string, title: string} | null>(null);

  const subjects = SUBJECTS_MAP[selectedFiliere];

  const openExam = (url: string, title: string) => {
    setViewerUrl({ url, title });
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">
      {/* In-App PDF Viewer Modal */}
      {viewerUrl && (
        <div className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-3xl flex flex-col animate-in fade-in duration-300">
          <div className="flex items-center justify-between p-4 lg:p-6 border-b border-white/5 bg-black/50">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-[0_0_20px_rgba(37,99,235,0.4)]">
                <FileText className="w-5 h-5" />
              </div>
              <div className="max-w-[200px] lg:max-w-md">
                <h2 className="text-white font-black tracking-tight truncate">{viewerUrl.title}</h2>
                <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Visionneuse NAJAH</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <a 
                href={viewerUrl.url} 
                target="_blank" 
                rel="noreferrer"
                className="p-3 bg-white/5 text-white hover:bg-white/10 rounded-xl transition-all hidden sm:flex items-center gap-2 text-xs font-bold border border-white/5"
              >
                <ExternalLink className="w-4 h-4" /> Ouvrir
              </a>
              <button 
                onClick={() => setViewerUrl(null)} 
                className="p-3 bg-red-600/20 text-red-500 rounded-xl hover:bg-red-600 hover:text-white transition-all border border-red-500/20"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>
          
          <div className="flex-1 bg-white relative">
             <iframe 
                src={`https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(viewerUrl.url)}`}
                className="w-full h-full border-none"
                title="Sujet d'Examen"
              />
          </div>
        </div>
      )}

      <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-blue-600/20 text-blue-400 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-blue-500/20 shadow-[0_0_15px_rgba(37,99,235,0.2)]">Archives Nationales</span>
          </div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight">Examens <span className="text-blue-500">Nationaux</span></h1>
          <p className="text-lg text-slate-400 font-medium max-w-2xl italic">
            Archives complètes des sujets et corrections officiels pour préparer ton BAC.
          </p>
        </div>
        
        <div className="relative w-full lg:w-96 group">
          <input
            type="text"
            placeholder="Année (ex: 2024)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-900/50 border border-white/5 rounded-2xl pl-12 pr-6 py-4 text-sm font-medium focus:ring-4 focus:ring-blue-500/10 outline-none shadow-sm transition-all text-white placeholder-slate-600"
          />
          <Search className="absolute left-4 top-4.5 w-5 h-5 text-slate-600 group-focus-within:text-blue-500 transition-colors" />
        </div>
      </header>

      <div className="space-y-12">
        {subjects.map(subject => {
          const subjectExams = (MOCK_EXAMS[subject.id] || []).filter(e => 
            e.year.toString().includes(search) || 
            subject.name.toLowerCase().includes(search.toLowerCase())
          );
          if (subjectExams.length === 0) return null;
          
          return (
            <div key={subject.id} className="space-y-8">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 ${subject.color} rounded-2xl flex items-center justify-center text-white shadow-xl shadow-current/20 border border-white/10`}>
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white tracking-tight">{subject.name}</h3>
                  <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">{subjectExams.length} Archives</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {subjectExams.map(exam => (
                  <div key={exam.id} className="group glass-card p-6 rounded-[2rem] border border-white/5 hover:border-blue-500/30 transition-all duration-500">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <span className="text-3xl font-black text-white tracking-tighter group-hover:text-blue-400 transition-colors">{exam.year}</span>
                        <div className={`px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-widest w-fit mt-1 border ${exam.session === 'Normal' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-purple-500/10 text-purple-400 border-purple-500/20'}`}>
                          Session {exam.session}
                        </div>
                      </div>
                      <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center border border-white/5 shadow-inner">
                        <Award className="w-5 h-5 text-slate-500 group-hover:text-blue-500 transition-colors" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <button 
                        onClick={() => openExam(exam.pdfUrl, `${subject.name} - ${exam.year} - Sujet`)}
                        className="py-3 bg-slate-900 text-slate-400 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center justify-center gap-2 border border-white/5"
                      >
                        <Maximize2 className="w-3 h-3" /> Sujet
                      </button>
                      <button 
                        onClick={() => openExam(exam.solutionUrl || exam.pdfUrl, `${subject.name} - ${exam.year} - Corrigé`)}
                        className="py-3 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
                      >
                        <FileText className="w-3 h-3" /> Corrigé
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Exams;
