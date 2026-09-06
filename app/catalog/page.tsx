import { Metadata } from 'next';
import CatalogClient from './CatalogClient';

export const metadata: Metadata = {
  title: 'Camper Catalog | TravelTrucks',
  description:
    'Explore our wide range of campervans and motorhomes available for rent in Ukraine. Filter by transmission, vehicle type, and location.',
  openGraph: {
    title: 'Camper Catalog | TravelTrucks',
    description:
      'Find and book your perfect campervan for your next adventure.',
  },
};

export default function CatalogPage() {
  return <CatalogClient />;
}