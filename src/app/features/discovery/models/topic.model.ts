import { TopicLanguages } from './enums/topic-languages.enum';

export interface Topic {
  id: number;
  name: string;
  isSelected: boolean;
}

export const topicsInitialState: Topic[] = [
  {
    id: 1,
    name: TopicLanguages.javascript,
    isSelected: true,
  },
  {
    id: 2,
    name: TopicLanguages.typescript,
    isSelected: false,
  },
  {
    id: 3,
    name: TopicLanguages.html,
    isSelected: false,
  },
  {
    id: 4,
    name: TopicLanguages.scss,
    isSelected: false,
  },
  {
    id: 5,
    name: TopicLanguages.vue,
    isSelected: false,
  },
];
