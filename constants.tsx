import { Subject, Filiere, Exam, Chapter, LessonResource } from './types';

// Official External Repositories
export const ALLOSCHOOL_BAC2 = "https://www.alloschool.com/category/2nd-degree";
export const ALLOSCHOOL_BAC1 = "https://www.alloschool.com/category/1st-degree";
export const MOUTAMADRIS_LINK = "https://moutamadris.ma/";

// Root Drive Folders
const MATH_ROOT = "https://drive.google.com/drive/folders/1RTDpvPx20lUXRv9cv8b4Fm_a_-YvzBda";
const PHYSICS_ROOT = "https://drive.google.com/drive/folders/1icnv9xSxXWFUUczO1iTsm8IGm0y5N3zb";
const ENGLISH_ROOT = "https://drive.google.com/drive/folders/1vUwCHcDNuSz4eFu3KPeH1Yyq5Rec14-E";

const SAMPLE_PDF = "https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf";

export const SUBJECTS: Subject[] = [
  { id: 'math', name: 'Mathématiques', icon: 'Calculator', color: 'bg-indigo-600' },
  { id: 'pc', name: 'Physique-Chimie', icon: 'Zap', color: 'bg-blue-600' },
  { id: 'svt', name: 'SVT', icon: 'Database', color: 'bg-emerald-600' },
  { id: 'phil', name: 'Philosophie', icon: 'PenTool', color: 'bg-amber-600' },
  { id: 'eng', name: 'Anglais', icon: 'Globe', color: 'bg-purple-600' },
  { id: 'arab-let', name: 'Langue Arabe', icon: 'BookOpen', color: 'bg-red-700' },
  { id: 'hist-geo', name: 'Histoire-Géo', icon: 'Map', color: 'bg-cyan-700' },
];

export const FILIERE_SUBJECTS: Record<Filiere, string[]> = {
  [Filiere.PC]: ['math', 'pc', 'phil', 'eng', 'svt'],
  [Filiere.SVT]: ['math', 'pc', 'svt', 'phil', 'eng'],
  [Filiere.SM_A]: ['math', 'pc', 'phil', 'eng', 'svt'],
  [Filiere.SM_B]: ['math', 'pc', 'phil', 'eng'],
  [Filiere.ECO]: ['math', 'phil', 'eng'],
  [Filiere.SGC]: ['math', 'phil'],
  [Filiere.LET]: ['arab-let', 'hist-geo', 'phil', 'eng'],
  [Filiere.SHU]: ['hist-geo', 'arab-let', 'phil', 'eng'],
  [Filiere.STE]: ['math', 'pc', 'phil'],
  [Filiere.STM]: ['math', 'pc', 'phil'],
};

export const CHAPTERS: Chapter[] = [
  {
    id: 'ch-math-1',
    subjectId: 'math',
    title: 'Limites et Continuité',
    description: 'Le pilier de l\'analyse mathématique pour le BAC.',
    difficulty: 'Moyen',
    examWeight: 5,
    keyConcepts: ['Limites usuelles', 'TVI', 'Continuité'],
    outline: ['Définition', 'Opérations', 'Théorèmes']
  },
  {
    id: 'ch-pc-1',
    subjectId: 'pc',
    title: 'Ondes Mécaniques',
    description: 'Comprendre la propagation des signaux.',
    difficulty: 'Facile',
    examWeight: 3,
    keyConcepts: ['Célérité', 'Retard', 'Périodicité'],
    outline: ['Ondes transversales', 'Ondes longitudinales']
  },
  {
    id: 'ch-eng-1',
    subjectId: 'eng',
    title: 'Formal & Informal Letters',
    description: 'Master the art of written communication.',
    difficulty: 'Facile',
    examWeight: 2,
    keyConcepts: ['Salutations', 'Structure', 'Vocabulary'],
    outline: ['Formal business letter', 'Informal friend letter']
  }
];

export const RESOURCES: LessonResource[] = [
  // General Subject Resources (Sections)
  // Fix: Added missing 'status' property to satisfy LessonResource interface requirement
  { id: 'math-sec-books', chapterId: 'global', title: 'Livres & Manuels', type: 'course', url: MATH_ROOT, provider: 'Bibliothèque Najah', status: 'available' },
  // Fix: Added missing 'status' property to satisfy LessonResource interface requirement
  { id: 'math-sec-cours', chapterId: 'global', title: 'Cours Complets', type: 'course', url: MATH_ROOT, provider: 'Bibliothèque Najah', status: 'available' },
  // Fix: Added missing 'status' property to satisfy LessonResource interface requirement
  { id: 'math-sec-exams', chapterId: 'global', title: 'Séries & Examens', type: 'exercise', url: MATH_ROOT, provider: 'Bibliothèque Najah', status: 'available' },
  
  // Chapter Specific Resources
  { id: 'res-m1-allo', chapterId: 'ch-math-1', title: 'Fiche: Résumé Limites', type: 'course', url: SAMPLE_PDF, status: 'available', provider: 'AlloSchool' },
  { id: 'res-m1-drive', chapterId: 'ch-math-1', title: 'Espace Drive: Continuité', type: 'course', url: MATH_ROOT, status: 'available', provider: 'Google Drive' },
  
  { id: 'res-p1-drive', chapterId: 'ch-pc-1', title: 'Dossier Ondes', type: 'course', url: PHYSICS_ROOT, status: 'available', provider: 'Google Drive' },
  { id: 'res-e1-drive', chapterId: 'ch-eng-1', title: 'Writing Samples', type: 'course', url: ENGLISH_ROOT, status: 'available', provider: 'Google Drive' },
];

const years = Array.from({ length: 2024 - 2015 + 1 }, (_, i) => 2015 + i).reverse();

export const MOCK_EXAMS: Exam[] = [
  ...years.flatMap(year => [
    { id: `exam-math-${year}-n`, subjectId: 'math', year, session: 'Normal' as const, pdfUrl: SAMPLE_PDF, solutionUrl: SAMPLE_PDF },
    { id: `exam-pc-${year}-n`, subjectId: 'pc', year, session: 'Normal' as const, pdfUrl: SAMPLE_PDF, solutionUrl: SAMPLE_PDF }
  ])
];