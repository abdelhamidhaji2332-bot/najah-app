import React, { useState, useEffect, useMemo } from 'react';
import { X, ExternalLink, FileText, ChevronLeft, Globe, AlertCircle } from 'lucide-react';

interface PdfViewerProps {
  url: string;
  title: string;
  onClose: () => void;
  isCompleted?: boolean;
  onToggleComplete?: () => void;
  chapterTitle?: string;
  subjectName?: string;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ 
  url, 
  title, 
  onClose, 
  isCompleted, 
  onToggleComplete,
  chapterTitle,
  subjectName 
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const driveInfo = useMemo(() => {
    const fileMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    const isDriveFile = url.includes('drive.google.com') && !!fileMatch;
    const fileId = fileMatch ? fileMatch[1] : null;
    return { isDriveFile, fileId };
  }, [url]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const getEmbedUrl = () => {
    if (driveInfo.isDriveFile && driveInfo.fileId) {
      return `https://drive.google.com/file/d/${driveInfo.fileId}/preview`;
    }
    if (url.endsWith('.pdf')) {
      return `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(url)}`;
    }
    return url;
  };

  const finalUrl = getEmbedUrl();

  return (
    <div className="fixed inset-0 z-[600] flex flex-col bg-black animate-in fade-in duration-300">
      <header className="flex items-center justify-between px-8 lg:px-12 h-24 border-b border-white/5 bg-black/90 backdrop-blur-3xl">
        <div className="flex items-center gap-6 overflow-hidden">
          <button 
            onClick={onClose}
            className="flex items-center gap-3 text-slate-500 hover:text-white transition-all group shrink-0"
          >
            <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
            <span className="hidden md:inline text-[10px] font-black uppercase tracking-widest">Retour</span>
          </button>

          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[9px] font-black text-blue-500 uppercase tracking-widest">{subjectName || 'NAJAH'}</span>
              <span className="text-[9px] text-slate-800">/</span>
              <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest truncate">{chapterTitle || 'Document'}</span>
            </div>
            <div className="flex items-center gap-3">
               <FileText className="w-5 h-5 text-blue-500" />
               <h3 className="text-white font-black text-lg tracking-tighter truncate uppercase leading-none">{title}</h3>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <a 
            href={url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="px-6 py-3 bg-white/5 border border-white/10 text-slate-400 hover:text-white rounded-xl transition-all flex items-center gap-3 group"
          >
            <ExternalLink className="w-4 h-4" />
            <span className="hidden sm:inline text-[9px] font-black uppercase tracking-widest">Ouvrir</span>
          </a>
          <button 
            onClick={onClose} 
            className="p-3.5 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all shadow-xl active:scale-90"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </header>

      <main className="flex-1 relative bg-black overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center space-y-6 z-10 bg-black">
             <div className="w-20 h-20 border-4 border-blue-600/10 border-t-blue-600 rounded-full animate-spin" />
             <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em] animate-pulse">Chargement du document...</p>
          </div>
        )}

        <iframe 
          src={finalUrl}
          className={`w-full h-full border-none transition-all duration-700 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
          onLoad={() => setIsLoading(false)}
          onError={() => { setIsLoading(false); setHasError(true); }}
          title={title}
        />
        
        {hasError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center space-y-8 bg-black p-12 text-center">
             <AlertCircle className="w-16 h-16 text-red-500 mb-2" />
             <div className="space-y-4">
                <h4 className="text-3xl font-black text-white uppercase tracking-tighter">Échec de l'affichage</h4>
                <p className="text-slate-500 max-w-sm mx-auto font-medium italic">Ce document ne peut pas être affiché ici pour le moment.</p>
             </div>
             <a href={url} target="_blank" rel="noopener noreferrer" className="px-10 py-5 bg-blue-600 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest">Ouvrir Source</a>
          </div>
        )}
      </main>
    </div>
  );
};

export default PdfViewer;