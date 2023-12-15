export interface Topic {
  name: string;
  isSelected: boolean;
}

export const topicsInitialState: Topic[] = [
  {
    name: 'Angular',
    isSelected: true
  }
];