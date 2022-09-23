import { FileLink } from "./file-upload/file-upload-response";

export interface PetListItem {
  id?: number;
  name: string;
  breed: string;
  microchip?: string;
  sex: string;
  birthday?: Date;
  adoptionDay?: Date;
  petPhoto?: FileLink;
  prescriptionsCount: number;
  vaccinesCount: number;
  conditions: number;
  link: string;
}
