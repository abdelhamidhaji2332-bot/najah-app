
import React, { useState } from 'react';
// Fix: Change SUBJECTS to SUBJECTS_MAP as it is the correct exported member
import { MOCK_EXAMS, SUBJECTS_MAP } from '../constants';
import { Filiere, Exam } from '../types';
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

  // Fix: Use SUBJECTS_MAP instead of SUBJECTS
  const subjects = SUBJECTS_MAP[selectedFiliere];

  const openExam = (url: string, title: string) => {
    setViewerUrl({ url, title });
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">
      {/* In-App PDF Viewer Modal */}
      {viewerUrl && (
        <div className="fixed inset-0 z-[200] bg-slate-950/95 backdrop-blur-xl flex flex-col animate-in fade-in duration-300">
          <div className="flex items-center justify-between p-4 lg:p-6 border-b border-white/10 bg-slate-900 shadow-2xl">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                <FileText className="w-5 h-5" />
              </div>
              <div className="max-w-[200px] lg:max-w-md">
                <h2 className="text-white font-black tracking-tight truncate">{viewerUrl.title}</h2>
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Visionneuse In-App NAJAH</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 lg:gap-4">
              <a 
                href={viewerUrl.url} 
                target="_blank" 
                rel="noreferrer"
                className="p-3 bg-white/5 text-white hover:bg-white/10 rounded-xl transition-all hidden sm:flex items-center gap-2 text-xs font-bold"
              >
                <ExternalLink className="w-4 h-4" /> Ouvrir
              </a>
              <button 
                onClick={() => setViewerUrl(null)} 
                className="p-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all shadow-lg shadow-red-600/20"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>
          
          <div className="flex-1 bg-white dark:bg-slate-950 relative">
             <iframe 
                src={`https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(viewerUrl.url)}`}
                className="w-full h-full border-none bg-white"
                title="Sujet d'Examen"
              />
          </div>
          
          <div className="p-4 bg-slate-900 border-t border-white/5 flex items-center justify-center gap-6">
             <div className="flex items-center gap-3">
               <button className="p-2 text-slate-500 cursor-not-allowed"><ChevronLeft className="w-5 h-5" /></button>
               <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Document National Officiel</span>
               <button className="p-2 text-slate-500 cursor-not-allowed"><ChevronRight className="w-5 h-5" /></button>
             </div>
          </div>
        </div>
      )}

      <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md">Archives Nationales</span>
            <span className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">Sujets & Corrections</span>
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">Examens Nationaux (MVP)</h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 font-medium max-w-2xl">
            Accédez directement à tous les sujets et corrections officiels sans quitter l'application.
          </p>
        </div>
        
        <div className="relative w-full lg:w-96 group">
          <input
            type="text"
            placeholder="Chercher une année (ex: 2024)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-[1.5rem] pl-12 pr-6 py-4 text-sm font-medium focus:ring-4 focus:ring-blue-500/10 outline-none shadow-sm transition-all"
          />
          <Search className="absolute left-4 top-4.5 w-5 h-5 text-slate-400 group-focus-within:text-blue-500" />
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
            <div key={subject.id} className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-700 pb-4">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 ${subject.color} rounded-2xl flex items-center justify-center text-white shadow-lg`}>
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-slate-800 dark:text-slate-200">{subject.name}</h3>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{subjectExams.length} Documents Disponibles</p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {subjectExams.map(exam => (
                  <div key={exam.id} className="group bg-white dark:bg-slate-800 p-6 rounded-[2rem] border border-slate-200/50 dark:border-slate-700 shadow-sm hover:shadow-2xl transition-all duration-300">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <span className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">{exam.year}</span>
                        <div className={`px-2 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-widest w-fit mt-1 ${exam.session === 'Normal' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'}`}>
                          Session {exam.session}
                        </div>
                      </div>
                      <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/30 text-blue-600 rounded-xl flex items-center justify-center">
                        <Award className="w-5 h-5" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <button 
                        onClick={() => openExam(exam.pdfUrl, `${subject.name} - ${exam.year} (${exam.session}) - Sujet`)}
                        className="py-3 bg-slate-100 dark:bg-slate-900/50 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-black uppercase tracking-tighter hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center gap-2"
                      >
                        <Maximize2 className="w-3 h-3" /> Sujet
                      </button>
                      <button 
                        onClick={() => openExam(exam.solutionUrl || exam.pdfUrl, `${subject.name} - ${exam.year} (${exam.session}) - Correction`)}
                        className="py-3 bg-blue-600 text-white rounded-xl text-xs font-black uppercase tracking-tighter hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center gap-2"
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