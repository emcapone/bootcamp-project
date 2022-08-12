export interface Parameters {
  type: string;
  breed: string;
  size?: string;
  gender?: string;
  age?: string;
  color?: string;
  coat?: string;
  good_with_children: boolean | null;
  good_with_dogs: boolean | null;
  good_with_cats: boolean | null;
  house_trained: boolean | null;
  declawed: boolean | null;
  special_needs: boolean;
  location: string;
  distance: string;
  page: number;
}
