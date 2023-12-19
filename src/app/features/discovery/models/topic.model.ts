export interface Topic {
  name: string;
  isSelected: boolean;
}

export const topicsInitialState: Topic[] = [
  {
    name: 'Javascript',
    isSelected: true,
  },
  {
    name: 'HTML',
    isSelected: false,
  },
  {
    name: 'TypeScript',
    isSelected: false,
  },
  {
    name: 'CSS',
    isSelected: false,
  },
];
