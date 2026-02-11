
export enum Filiere {
  SM_A = 'Sciences Mathématiques A',
  SM_B = 'Sciences Mathématiques B',
  PC = 'Sciences Physiques',
  SVT = 'Sciences de la Vie et de la Terre',
  ECO = 'Sciences Économiques',
  SGC = 'Gestion Comptable',
  LET = 'Lettres',
  SHU = 'Sciences Humaines',
  STE = 'Sciences et Tech Électriques',
  STM = 'Sciences et Tech Mécaniques'
}

export enum BacLevel {
  BAC1 = '1ère Bac',
  BAC2 = '2ème Bac'
}

export type Language = 'FR' | 'AR' | 'EN';

export interface Subject {
  id: string;
  name: string;
  icon: string;
  color: string;
  lessonCount?: number;
}

export interface LessonResource {
  id: string;
  title: string;
  type: 'course' | 'exercise' | 'video' | 'quiz';
  url: string;
  provider?: string;
  status: 'available' | 'locked';
}

export interface Chapter {
  id: string;
  title: string;
  description: string;
  difficulty: 'Facile' | 'Moyen' | 'Difficile';
  examWeight: number; // 1 to 5
  resources: LessonResource[];
  keyConcepts: string[];
  outline: string[];
}

export interface Exam {
  id: string;
  subjectId: string;
  year: number;
  session: 'Normal' | 'Rattrapage';
  pdfUrl: string;
  solutionUrl?: string;
}

export interface Task {
  id: string;
  text: string;
  completed: boolean;
  dueDate: string;
}

export interface UserStats {
  completedChapters: string[];
  favorites: string[];
  lastSeen?: string;
  focusMinutes: number;
}
