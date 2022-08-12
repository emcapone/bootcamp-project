export interface Types {
  types: TypesDetails[];
}

export interface TypesDetails {
  name: string;
  coats: string[];
  colors: string[];
  genders: string[];
  _links: TypeLink;
}

interface TypeLink {
  self: Link;
  breeds: Link;
}

interface Link {
  href: string;
}
