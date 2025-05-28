
export interface User {
  id: string;
  name: string;
  avatarUrl: string;
  xp: number;
  badges: Badge[];
  completedModuleIds: string[];
  quizScores: Record<string, number>; // quizId: score
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  iconName: keyof typeof import('./constants').ICONS; // Ensure iconName is a valid key
  color: string; // e.g. 'bg-yellow-500'
}

export interface Module {
  id: string;
  title: string;
  slug: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  longDescription: string;
  xpReward: number;
  iconName: keyof typeof import('./constants').ICONS;
  quizId?: string;
  tags: string[];
}

export interface QuizQuestion {
  id: string;
  text: string;
  options: string[];
  correctOptionIndex: number;
  explanation?: string;
}

export interface Quiz {
  id:string;
  moduleId: string;
  title: string;
  questions: QuizQuestion[];
}

export interface NavLinkItem {
  path: string;
  label: string;
  iconName: keyof typeof import('./constants').ICONS;
}

export interface PipelineTool {
  id: string;
  name: string;
  iconName: keyof typeof import('./constants').ICONS;
  category: 'Source' | 'Build' | 'Test' | 'Deploy' | 'Secure' | 'Infra';
}

export interface UserContextType {
  user: User | null;
  loading: boolean;
  completeModule: (moduleId: string, xp: number) => void;
  earnBadge: (badge: Badge) => void;
  submitQuiz: (quizId: string, score: number, moduleIdForXP?: string) => void;
  login: (userData: User) => void;
  logout: () => void;
}

// Enum for different page states or views
export enum PageView {
  List = 'list',
  Detail = 'detail',
  Quiz = 'quiz',
  QuizResult = 'quiz_result',
}
