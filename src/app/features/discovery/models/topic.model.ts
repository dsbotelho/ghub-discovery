export interface Topic {
  name: string;
  isSelected: boolean;
}

export const topicsInitialState: Topic[] = [
  {
    name: 'Angular',
    isSelected: true
  },
  {
    name: 'React',
    isSelected: false
  },
  {
    name: 'Vue',
    isSelected: false
  },
  {
    name: 'TypeScript',
    isSelected: false
  },
  {
    name: 'CSS',
    isSelected: false
  }
];
