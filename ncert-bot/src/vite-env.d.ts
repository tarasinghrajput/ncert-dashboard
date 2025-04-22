/// <reference types="vite/client" />

// src/types.ts
export type User = {
    id: number;
    name: string;
    email: string;
    lastLogin: string;
    subscription: boolean;
    subscriptionType?: 'monthly' | 'yearly';
    subscriptionDate?: string;
  };
  
  export type QuizResult = {
    id: number;
    userId: number;
    pdfName: string;
    score: number;
    date: string;
  };
  
  export type PdfUsage = {
    id: number;
    name: string;
    subject: string;
    class: string;
    usageCount: number;
  };
  
  export type TimeFilter = 'all' | '1year' | '6months' | '3months' | '1month' | '3weeks' | '2weeks';
