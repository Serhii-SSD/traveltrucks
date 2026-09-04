export interface FormDataValue {
  location: string;
  form: string;
  engine: string;
  transmission: string;
}
export interface CampersData {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  campers: Campers[];
}
export interface FormData {
  dataFilter?: FormDataValue;
  perPage: number;
  page: number;
}

export type Forms = 'alcove' | 'panel_van' | 'integrated' | 'semi_integrated';

export type Transmissions = 'automatic' | 'manual';

export type Engines = 'diesel' | 'petrol' | 'hybrid' | 'electric';

export interface FilterData {
  forms: Forms[];
  transmissions: Transmissions[];
  engines: Engines[];
}

export interface Campers {
  id: string;
  name: string;
  price: number;
  rating: number;
  location: string;
  description: string;
  form: string;
  length: string;
  width: string;
  height: string;
  tank: string;
  consumption: string;
  transmission: string;
  engine: string;
  amenities: string[];
  createdAt: string;
  updatedAt: string;
  coverImage: string;
  totalReviews: number;
}

export interface Gallery {
  id: string;
  camperId: string;
  thumb: string;
  original: string;
  order: number;
}

export interface CamperID {
  id: string;
  name: string;
  price: number;
  rating: number;
  location: string;
  description: string;
  form: Forms;
  length: string;
  width: string;
  height: string;
  tank: string;
  consumption: string;
  transmission: Transmissions;
  engine: Engines;
  amenities: string[];
  createdAt: string;
  updatedAt: string;
  gallery: Gallery[];
  totalReviews: number;
}



export interface Review {
  id: string;
  camperId: CamperID['id'];
  reviewer_name: string;
  reviewer_rating: number;
  comment: string;
  createdAt: string;
}

export interface BookData {
  name: string;
  email: string;
}