export interface PetfinderPets {
  animals: PetfinderPetDetails[];
  pagination: Pagination;
}

export interface PetfinderPet {
  animal: PetfinderPetDetails;
}

export interface PetfinderPetDetails {
  age: string;
  attributes: Attributes;
  breeds: Breeds;
  coat: string;
  colors: Colors;
  contact: Contact;
  description: string;
  distance: number;
  environment: Environment;
  gender: string;
  id: number;
  name: string;
  organization_animal_id: string;
  organization_id: string;
  photos: Photo[];
  primary_photo_cropped: Photo;
  published_at: Date;
  size: string;
  species: string;
  status: string;
  status_changed_at: Date;
  tags: string[];
  type: string;
  url: string;
  video: Video;
  _links: DetailsLink;
}

interface Address {
  address1: string;
  address2: string;
  city: string;
  postcode: string;
  state: string;
}

interface Attributes {
  declawed: boolean;
  house_trained: boolean;
  shots_current: boolean;
  spayed_neutered: boolean;
  special_needs: boolean;
}

interface Breeds {
  mixed: boolean;
  primary: string;
  secondary: string;
  unknown: boolean;
}

interface Colors {
  primary: string;
  secondary: string;
  tertiary: string;
}

interface Contact {
  address: Address;
  email: string;
  phone: string;
}

interface DetailsLink {
  organization: Link;
  self: Link;
  type: Link;
}

interface Environment {
  cats: boolean;
  children: boolean;
  dogs: boolean;
}

interface Photo {
  full: string;
  large: string;
  medium: string;
  small: string;
}

interface Video {
  href: string;
}

interface Pagination {
  count_per_page: number;
  current_page: number;
  total_count: number;
  total_pages: number;
  _links: PaginationLink;
}

interface PaginationLink {
  next: Link,
  previous: Link
}

interface Link {
  href: string;
}
