import { PetListItem } from '../../pet-list-item';
import { PetfinderPetDetails } from '../../petfinder/petfinder-service/models';

export interface DashboardDetails {
  bookmarkedPet: PetfinderPetDetails;
  pets: PetListItem[];
}
