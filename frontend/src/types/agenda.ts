export type SessionType = 'all' | 'keynote' | 'panel' | 'networking';

export interface Speaker {
  name: string;
  role: string;
}

export interface AgendaItem {
  time: string;
  title: string;
  type: SessionType;
  speakers: Speaker[];
}
