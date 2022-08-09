export interface Pet {
  id?: number;
  name: string;
  breed: string;
  color: string;
  description: string;
  microchip?: string;
  sex: string;
  fixed: boolean;
  weight: number;
  birthday?: Date;
  adoptionDay?: Date;
  vetRecords?: string;
  petPhoto: string;
  prescriptions?: Prescription[];
  vaccines?: Vaccine[];
  conditions?: Condition[];
}
export interface Prescription {
  id: number;
  name: string;
  doctor: string;
  due: Date;
  refills: number;
}

export interface Vaccine {
  id: number;
  name: string;
  dateAdministered: Date;
  dueDate: Date;
}

export interface Condition {
  id: number;
  name: string;
  notes?: string;
}
