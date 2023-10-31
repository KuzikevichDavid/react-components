import { State } from './ShowResults';

export interface ResponceType {
  count: number;
  next: string | null;
  previous: string | null;
  results: State;
}
