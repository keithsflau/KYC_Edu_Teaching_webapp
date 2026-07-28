import { Type } from "@google/genai";

export enum AppMode {
  READING = 'READING',
  WRITING = 'WRITING',
  QUIZ = 'QUIZ'
}

export interface StorySegment {
  id: number;
  text: string;
}

export interface VocabWord {
  char: string;
  jyutping: string;
  definition: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  answer: string; // The correct answer string
  explanation: string;
}

export interface WritingFeedback {
  score: number;
  comment: string;
}
