export interface Breeds {
  breeds: Details[];
}

interface Details {
  name: string;
  _links: BreedLink;
}

interface BreedLink {
  type: Link;
}

interface Link {
  href: string;
}
