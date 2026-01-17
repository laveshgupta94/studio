export type NavItem = {
  href: string;
  title: string;
  icon: React.ElementType;
};

export type Deadline = {
  id: string;
  subject: string;
  title: string;
  dueDate: string;
};

export type RecentActivityItem = {
  id: string;
  type: 'chat' | 'timetable' | 'analytics';
  description: string;
  timestamp: string;
};

export type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};
