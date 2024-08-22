export interface IMedToday {
  id: string;
  medicationId: string;
  date: string;
  medication: {
    name: string;
    dosage: string;
    notes: string;
  };
}
