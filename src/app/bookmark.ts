export interface Bookmark {
  id?: number;
  petfinder_id: number;
  title: string;
  note: string;
  savedAt: Date;
  external_url: string;
  link?: string;
  petfinder_link?: string;
}
