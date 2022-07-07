export interface Pet {
  id: number;
  name: string;
  breed: string;
  sex: string;
  birthday: Date;
  microchip: string;
  upcoming: string;
  vaccines: Vaccination[]
  imageUrl: string;
}

export interface Vaccination {
  id: number;
  name: string;
  date: Date;
  dose?: number;
  due?: Date;
}
