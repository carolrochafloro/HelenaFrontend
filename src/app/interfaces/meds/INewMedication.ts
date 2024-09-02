import { INewTimeDTO } from './INewTimes';

export interface INewMedication {
  Name: string;
  Lab: string;
  Type: string;
  Dosage: string;
  Notes: string;
  Img: string;
  Start: string;
  End: string;
  FrequencyType: number;
  Recurrency: number;
  DoctorId: string;
  IndicatedFor: string;
  Times: INewTimeDTO[];
}
