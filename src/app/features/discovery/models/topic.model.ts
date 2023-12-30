import { TopicLanguages } from './enums/topic-languages.enum';

export interface Topic {
  name: string;
  isSelected: boolean;
}

export const topicsInitialState: Topic[] = [
  {
    name: TopicLanguages.javascript,
    isSelected: true,
  },
  {
    name: TopicLanguages.typescript,
    isSelected: false,
  },
  {
    name: TopicLanguages.html,
    isSelected: false,
  },
  {
    name: TopicLanguages.scss,
    isSelected: false,
  },
  {
    name: TopicLanguages.vue,
    isSelected: false,
  },
];
