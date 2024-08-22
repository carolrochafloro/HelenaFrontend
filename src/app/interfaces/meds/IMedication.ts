import { FrequencyType } from './FrequencyType.enum';

export interface IMedication {
  id: string;
  name: string;
  lab: string;
  type: string;
  dosage: string;
  notes: string;
  img: string;
  start: Date;
  end: Date;
  frequencyType: FrequencyType;
  recurrency: number;
}
