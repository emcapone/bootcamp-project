export interface Breeds {
  breeds: BreedDetails[];
}

interface BreedDetails {
  name: string;
  _links: BreedLink;
}

interface BreedLink {
  type: Link;
}

interface Link {
  href: string;
}
