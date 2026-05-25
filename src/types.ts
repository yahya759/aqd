export interface Project {
  id: string;
  title: string;
  category: string;
  expectedReturn: number;
  durationMonths: number;
  targetAmount: number;
  raisedAmount: number;
  status: 'active' | 'upcoming';
  description: string;
  imagePrompt: string;
  imageUrl: string;
  opensInDays?: number;
}

export interface Investment {
  projectId: string;
  projectTitle: string;
  amount: number;
  returnRate: number;
  date: string;
}

export interface Transaction {
  id: string;
  date: string;
  type: 'deposit' | 'withdraw' | 'invest';
  amount: number;
  currency: string;
  projectName?: string;
  status: 'completed' | 'pending';
}

export interface UserProfile {
  name: string;
  tier: string;
  avatarUrl: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}
