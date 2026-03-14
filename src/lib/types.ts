
export interface Guest {
  id: string;
  name: string;
  timestamp: number;
}

export interface EventDetails {
  title: string;
  date: string;
  time: string;
  venue: string;
  description: string;
  isOpen: boolean;
}
