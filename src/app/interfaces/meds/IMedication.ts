import { FrequencyType } from './FrequencyType.enum';
import { ITimes } from './ITimes';

export interface IMedication {
  id: string;
  name: string;
  lab: string;
  type: string;
  dosage: string;
  notes: string;
  start: Date;
  end: Date;
  frequencyType: FrequencyType;
  recurrency: number;
  doctorId: string;
  doctorName: string;
  doctorSpecialty: string;
  indicatedFor: string;
  times: ITimes[];
}
