import { Metadata } from 'next';
import CamperDetailsClient from './CamperDetailsClient';
import { getCamperID } from '@/services/api';

interface PageProps {
  params: Promise<{
    camperId: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { camperId } = await params;

  try {
    const camper = await getCamperID(camperId);

    return {
      title: `${camper.name} | TravelTrucks`,
      description: camper.description ? camper.description.slice(0, 150) : 'Explore campervan details and book online.',
      openGraph: {
        title: `${camper.name} | TravelTrucks`,
        description: camper.description ? camper.description.slice(0, 150) : 'Explore campervan details and book online.',
        images: camper.gallery?.[0]?.original ? [camper.gallery[0].original] : [],
      },
    };
  } catch {
    return {
      title: 'Camper Details | TravelTrucks',
      description: 'Book your campervan for your next trip.',
    };
  }
}

export default async function CamperDetailsPage({ params }: PageProps) {
  const { camperId } = await params;
  return <CamperDetailsClient camperId={camperId} />;
}