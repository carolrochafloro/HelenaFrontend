import { ITimes } from './ITimes';

export interface IMedByDay {
  medicationId: string;
  name: string;
  notes: string;
  times: ITimes[];
  dosage: string;
  type: string;
}
