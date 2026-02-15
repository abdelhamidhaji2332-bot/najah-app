
import React, { useState, useMemo } from 'react';
import { MOCK_EXAMS, SUBJECTS, FILIERE_SUBJECTS } from '../constants.tsx';
import { Filiere, Exam } from '../types.ts';
import PdfViewer from '../components/PdfViewer.tsx';
import { 
  FileText, 
  Search, 
  X, 
  Award,
  ExternalLink,
  Maximize2,
  Calendar,
  AlertCircle
} from 'lucide-react';

const Exams: React.FC = () => {
  const [selectedFiliere] = useState<Filiere>(() => (localStorage.getItem('filiere') as Filiere) || Filiere.PC);
  const [search, setSearch] = useState('');
  const [viewerUrl, setViewerUrl] = useState<{url: string, title: string} | null>(null);

  const filiereSubjects = useMemo(() => {
    const ids = FILIERE_SUBJECTS[selectedFiliere] || [];
    return SUBJECTS.filter(s => ids.includes(s.id));
  }, [selectedFiliere]);

  const openExam = (url: string, title: string) => {
    setViewerUrl({ url, title });
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20 bg-black min-h-screen">
      {/* Premium Reusable PDF Viewer */}
      {viewerUrl && (
        <PdfViewer 
          url={viewerUrl.url}
          title={viewerUrl.title}
          onClose={() => setViewerUrl(null)}
        />
      )}

      <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="bg-amber-600/10 text-amber-500 text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full border border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.15)]">Préparation Finale</span>
          </div>
          <h1 className="text-5xl font-black text-white tracking-tighter uppercase">Examens <span className="text-blue-500 text-glow">Nationaux</span></h1>
          <p className="text-lg text-slate-400 font-medium italic max-w-xl">Archives officielles 2008 - 2024 pour garantir ton 20/20.</p>
        </div>
        
        <div className="relative w-full lg:w-96 group">
          <input 
            type="text" 
            placeholder="Rechercher par année (ex: 2024)..." 
            value={search} 
            onChange={(e) => setSearch(e.target.value)} 
            className="w-full bg-slate-900/50 border border-white/5 rounded-2xl py-4.5 pl-14 pr-6 text-sm outline-none focus:ring-4 focus:ring-blue-500/10 transition-all text-white font-medium placeholder-slate-600 shadow-sm" 
          />
          <Search className="absolute left-5 top-5 w-5 h-5 text-slate-600 group-focus-within:text-blue-500 transition-colors" />
        </div>
      </header>

      <div className="space-y-16">
        {filiereSubjects.map(subject => {
          const subjectExams = MOCK_EXAMS.filter(e => 
            e.subjectId === subject.id && 
            (e.year.toString().includes(search) || subject.name.toLowerCase().includes(search.toLowerCase()))
          );
          if (subjectExams.length === 0) return null;
          
          return (
            <div key={subject.id} className="space-y-10 animate-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center justify-between border-b border-white/5 pb-6">
                <div className="flex items-center gap-5">
                  <div className={`w-14 h-14 ${subject.color} rounded-2xl flex items-center justify-center text-white shadow-2xl border border-white/10 group-hover:rotate-6 transition-transform`}>
                    <FileText className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-black text-white tracking-tighter uppercase">{subject.name}</h3>
                    <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">{subjectExams.length} Documents Disponibles</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {subjectExams.map(exam => (
                  <div key={exam.id} className="group glass-card p-8 rounded-[2.5rem] border border-white/5 bg-black/40 hover:border-blue-500/30 transition-all duration-500 premium-shadow relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-blue-600/5 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-700" />
                    
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="flex items-center justify-between mb-8">
                        <span className="text-5xl font-black text-white tracking-tighter group-hover:text-blue-500 transition-colors">{exam.year}</span>
                        <div className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${exam.session === 'Normal' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}`}>
                          {exam.session}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-3 mt-auto">
                         <button 
                           onClick={() => openExam(exam.pdfUrl, `${subject.name} - BAC ${exam.year} (${exam.session})`)} 
                           className="flex items-center justify-center gap-3 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest border border-white/5 transition-all active:scale-95"
                         >
                           <FileText className="w-4 h-4" /> Sujet PDF
                         </button>
                         <button 
                           onClick={() => openExam(exam.solutionUrl || exam.pdfUrl, `Correction: ${subject.name} - ${exam.year}`)} 
                           className="flex items-center justify-center gap-3 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-blue-500/20 transition-all active:scale-95"
                         >
                           <Award className="w-4 h-4" /> Corrigé
                         </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {filiereSubjects.every(s => MOCK_EXAMS.filter(e => e.subjectId === s.id && e.year.toString().includes(search)).length === 0) && (
           <div className="py-32 text-center glass-card rounded-[3rem] border border-dashed border-white/5">
              <AlertCircle className="w-16 h-16 text-slate-800 mx-auto mb-6" />
              <h3 className="text-2xl font-black text-slate-500 uppercase tracking-tighter">Aucun examen trouvé</h3>
              <p className="text-slate-600 font-medium italic mt-2">Essayez une autre année ou une autre matière.</p>
           </div>
        )}
      </div>

      {/* Preparation Tip */}
      <div className="mt-20 p-12 bg-slate-900 border border-white/5 rounded-[3.5rem] relative overflow-hidden group shadow-2xl">
         <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/5 rounded-full -mr-32 -mt-32 blur-[100px]" />
         <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
            <div className="w-20 h-20 bg-blue-600/10 rounded-[2rem] flex items-center justify-center border border-blue-500/20 shadow-inner">
               <Calendar className="w-10 h-10 text-blue-500" />
            </div>
            <div className="space-y-4 text-center md:text-left">
               <h4 className="text-3xl font-black text-white tracking-tight uppercase">Le Secret du National</h4>
               <p className="text-slate-400 text-lg font-medium leading-relaxed italic max-w-2xl">
                 Les examens se ressemblent souvent. En faisant les sessions des 5 dernières années, tu couvres 80% des questions types du jour J.
               </p>
            </div>
         </div>
      </div>
    </div>
  );
};

export default Exams;
