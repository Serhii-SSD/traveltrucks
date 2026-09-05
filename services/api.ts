import axios from 'axios';
import { BookData, CamperID, CampersData, FilterData, FormData, Review } from '@/types/camper';
axios.defaults.baseURL = 'https://campers-api.goit.study';

export const getCamper = async ({ dataFilter, page, perPage }: FormData) => {
  const cleanFilter = Object.fromEntries(
    Object.entries(dataFilter ?? {}).filter(([, value]) => value !== '')
  );
  const { data } = await axios.get<CampersData>('/campers', {
    params: { ...cleanFilter, page, perPage },
  });
  return data;
};

export const getCamperID = async (dataID: string) => {
  const { data } = await axios.get<CamperID>(`/campers/${dataID}`);
  return data;
};
export const getReviews = async (dataID: string) => {
  const { data } = await axios.get<Review[]>(`/campers/${dataID}/reviews`);
  return data;
};
interface PostBookRequest {
  dataID: string;
  bookData: BookData;
}

interface BookingResponse {
  message: string;
}

export const postBook = async ({ dataID, bookData }: PostBookRequest) => {
  const { data } = await axios.post<BookingResponse>(
    `/campers/${dataID}/booking-requests`,
    bookData
  );
  return data;
};

export const getFilter = async () => {
  const { data } = await axios.get<FilterData>('/campers/filters');
  return data;
};