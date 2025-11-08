export enum Page {
  Landing = 'landing',
  App = 'app',
}

export type UserType = 'signer' | 'learner';

export interface DictionaryEntry {
  word: string;
  category: string;
  video: string; // Using emoji as placeholder
}
