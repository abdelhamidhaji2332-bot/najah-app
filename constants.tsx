
import { Subject, Filiere, Exam, BacLevel, Chapter } from './types';

const SAMPLE_PDF = "https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf";

export const SUBJECTS_MAP: Record<Filiere, Subject[]> = {
  [Filiere.PC]: [
    { id: 'math', name: 'Mathématiques', icon: 'Calculator', color: 'bg-indigo-600' },
    { id: 'pc', name: 'Physique', icon: 'Zap', color: 'bg-blue-600' },
    { id: 'chimie', name: 'Chimie', icon: 'FlaskConical', color: 'bg-cyan-600' },
    { id: 'svt', name: 'SVT', icon: 'Database', color: 'bg-emerald-600' },
    { id: 'phil', name: 'Philosophie', icon: 'PenTool', color: 'bg-amber-600' },
    { id: 'eng', name: 'Anglais', icon: 'Globe', color: 'bg-purple-600' },
  ],
  [Filiere.SVT]: [
    { id: 'math', name: 'Mathématiques', icon: 'Calculator', color: 'bg-indigo-600' },
    { id: 'pc', name: 'Physique', icon: 'Zap', color: 'bg-blue-600' },
    { id: 'chimie', name: 'Chimie', icon: 'FlaskConical', color: 'bg-cyan-600' },
    { id: 'svt-major', name: 'SVT (Spécialité)', icon: 'Database', color: 'bg-emerald-700' },
    { id: 'phil', name: 'Philosophie', icon: 'PenTool', color: 'bg-amber-600' },
  ],
  [Filiere.SM_A]: [
    { id: 'math-sm', name: 'Mathématiques A', icon: 'Calculator', color: 'bg-indigo-800' },
    { id: 'pc-sm', name: 'Physique A', icon: 'Zap', color: 'bg-blue-700' },
    { id: 'chimie-sm', name: 'Chimie A', icon: 'FlaskConical', color: 'bg-cyan-700' },
    { id: 'svt', name: 'SVT', icon: 'Database', color: 'bg-emerald-600' },
  ],
  [Filiere.SM_B]: [
    { id: 'math-sm', name: 'Mathématiques B', icon: 'Calculator', color: 'bg-indigo-800' },
    { id: 'pc-sm', name: 'Physique B', icon: 'Zap', color: 'bg-blue-700' },
    { id: 'si', name: 'Sciences de l\'Ingénieur', icon: 'Cpu', color: 'bg-slate-700' },
    { id: 'phil', name: 'Philosophie', icon: 'PenTool', color: 'bg-amber-600' },
  ],
  [Filiere.ECO]: [
    { id: 'eco-gen', name: 'Économie Générale', icon: 'TrendingUp', color: 'bg-cyan-600' },
    { id: 'org-admin', name: 'Organisation Admin', icon: 'LayoutGrid', color: 'bg-blue-500' },
    { id: 'math-eco', name: 'Mathématiques', icon: 'Calculator', color: 'bg-indigo-500' },
    { id: 'compta', name: 'Comptabilité', icon: 'Table', color: 'bg-blue-800' },
  ],
  [Filiere.SGC]: [
    { id: 'compta', name: 'Comptabilité', icon: 'Table', color: 'bg-blue-800' },
    { id: 'math-fin', name: 'Maths Financières', icon: 'Calculator', color: 'bg-indigo-600' },
    { id: 'eco-gen', name: 'Économie Générale', icon: 'TrendingUp', color: 'bg-cyan-600' },
  ],
  [Filiere.LET]: [
    { id: 'arab-let', name: 'Langue Arabe', icon: 'BookOpen', color: 'bg-red-700' },
    { id: 'hist-geo', name: 'Histoire-Géo', icon: 'Map', color: 'bg-cyan-700' },
    { id: 'phil-maj', name: 'Philosophie (Spé)', icon: 'PenTool', color: 'bg-amber-700' },
  ],
  [Filiere.SHU]: [
    { id: 'hist-geo', name: 'Histoire-Géo', icon: 'Map', color: 'bg-cyan-700' },
    { id: 'arab-let', name: 'Langue Arabe', icon: 'BookOpen', color: 'bg-red-700' },
    { id: 'phil-maj', name: 'Philosophie (Spé)', icon: 'PenTool', color: 'bg-amber-700' },
  ],
  [Filiere.STE]: [
    { id: 'si-elec', name: 'Sciences de l\'Elec', icon: 'Zap', color: 'bg-yellow-600' },
    { id: 'math', name: 'Mathématiques', icon: 'Calculator', color: 'bg-indigo-600' },
    { id: 'pc', name: 'Physique', icon: 'Zap', color: 'bg-blue-600' },
  ],
  [Filiere.STM]: [
    { id: 'si-meca', name: 'Sciences de la Meca', icon: 'Settings', color: 'bg-slate-600' },
    { id: 'math', name: 'Mathématiques', icon: 'Calculator', color: 'bg-indigo-600' },
    { id: 'pc', name: 'Physique', icon: 'Zap', color: 'bg-blue-600' },
  ],
};

const years = Array.from({ length: 2024 - 2008 + 1 }, (_, i) => 2008 + i).reverse();

export const MOCK_EXAMS: Record<string, Exam[]> = {
  'math': years.flatMap(year => [
    { id: `math-${year}-n`, subjectId: 'math', year, session: 'Normal', pdfUrl: SAMPLE_PDF, solutionUrl: SAMPLE_PDF },
    { id: `math-${year}-r`, subjectId: 'math', year, session: 'Rattrapage', pdfUrl: SAMPLE_PDF, solutionUrl: SAMPLE_PDF }
  ]),
  'pc': years.flatMap(year => [
    { id: `pc-${year}-n`, subjectId: 'pc', year, session: 'Normal', pdfUrl: SAMPLE_PDF, solutionUrl: SAMPLE_PDF },
    { id: `pc-${year}-r`, subjectId: 'pc', year, session: 'Rattrapage', pdfUrl: SAMPLE_PDF, solutionUrl: SAMPLE_PDF }
  ]),
  'chimie': years.slice(0, 3).flatMap(year => [
    { id: `chimie-${year}-n`, subjectId: 'chimie', year, session: 'Normal', pdfUrl: SAMPLE_PDF, solutionUrl: SAMPLE_PDF }
  ]),
  'svt': years.slice(0, 5).flatMap(year => [
    { id: `svt-${year}-n`, subjectId: 'svt', year, session: 'Normal', pdfUrl: SAMPLE_PDF, solutionUrl: SAMPLE_PDF }
  ])
};

// Added MOCK_CHAPTERS to provide data for the SubjectDetail page components
export const MOCK_CHAPTERS: Record<string, Chapter[]> = {
  'math': [
    {
      id: 'math-ch1',
      title: 'Limites et Continuité',
      description: 'Maîtrisez les concepts fondamentaux de l\'analyse pour le BAC.',
      difficulty: 'Moyen',
      examWeight: 5,
      keyConcepts: ['Limites usuelles', 'TVT', 'Continuité sur intervalle'],
      outline: ['Définition de la limite', 'Opérations et limites', 'Théorème des valeurs intermédiaires'],
      resources: [
        { id: 'm1r1', title: 'Cours complet: Limites', type: 'course', url: SAMPLE_PDF, status: 'available', provider: 'AlloSchool' },
        { id: 'm1r2', title: 'Exercices d\'application', type: 'exercise', url: SAMPLE_PDF, status: 'available', provider: 'Moutamadris' }
      ]
    },
    {
      id: 'math-ch2',
      title: 'Dérivabilité',
      description: 'Étude locale et globale des fonctions numériques.',
      difficulty: 'Moyen',
      examWeight: 4,
      keyConcepts: ['Nombre dérivé', 'Taux de variation', 'Extremums'],
      outline: ['Dérivabilité en un point', 'Fonction dérivée', 'Variations et extremums'],
      resources: [
        { id: 'm2r1', title: 'Résumé de cours: Dérivation', type: 'course', url: SAMPLE_PDF, status: 'available', provider: 'AlloSchool' }
      ]
    }
  ],
  'pc': [
    {
      id: 'pc-ch1',
      title: 'Ondes Mécaniques Progressives',
      description: 'Propagation d\'une perturbation dans un milieu matériel.',
      difficulty: 'Facile',
      examWeight: 2,
      keyConcepts: ['Célérité', 'Retard temporel', 'Ondes transversales'],
      outline: ['Définition d\'une onde', 'Propriétés générales', 'Ondes périodiques'],
      resources: [
        { id: 'p1r1', title: 'Cours: Les Ondes', type: 'course', url: SAMPLE_PDF, status: 'available', provider: 'AlloSchool' }
      ]
    }
  ]
};
