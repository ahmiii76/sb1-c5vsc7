export interface Reply {
  id: string;
  content: string;
  timestamp: number;
}

export interface Post {
  id: string;
  content: string;
  timestamp: number;
  replies: Reply[];
}