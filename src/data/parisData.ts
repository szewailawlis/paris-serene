import { LatLngExpression } from 'leaflet';

// Import landmark images
import eiffelTowerImg from '@/assets/landmarks/eiffel-tower.png';
import louvreImg from '@/assets/landmarks/louvre.png';
import arcDeTriompheImg from '@/assets/landmarks/arc-de-triomphe.png';
import notreDameImg from '@/assets/landmarks/notre-dame.png';
import sacreCoeurImg from '@/assets/landmarks/sacre-coeur.png';
import moulinRougeImg from '@/assets/landmarks/moulin-rouge.png';
import pantheonImg from '@/assets/landmarks/pantheon.png';
import operaGarnierImg from '@/assets/landmarks/opera-garnier.png';
import pompidouImg from '@/assets/landmarks/pompidou.png';
import luxembourgImg from '@/assets/landmarks/luxembourg.png';
import orsayImg from '@/assets/landmarks/orsay.png';
import concordeImg from '@/assets/landmarks/concorde.png';

export interface Arrondissement {
  id: number;
  name: string;
  safetyScore: number;
  safetyLevel: 'safe' | 'caution' | 'danger';
  tips: string[];
  center: LatLngExpression;
}

export interface Landmark {
  id: string;
  name: string;
  position: LatLngExpression;
  icon: string;
  image: string;
  description: string;
  arrondissement: number;
}

export interface Hotel {
  id: string;
  name: string;
  landmarkId: string;
  distance: number;
  districtSafetyScore: number;
  arrondissement: number;
  pricePerNight: number;
  rating: number;
  imageUrl: string;
}

export const arrondissements: Arrondissement[] = [
  { id: 1, name: "1er - Louvre", safetyScore: 9.2, safetyLevel: 'safe', tips: ["Very safe tourist area", "Well-lit at night", "Heavy police presence"], center: [48.8606, 2.3376] },
  { id: 2, name: "2e - Bourse", safetyScore: 8.8, safetyLevel: 'safe', tips: ["Business district, safe during day", "Watch belongings near metro", "Avoid Rue Saint-Denis late"], center: [48.8678, 2.3415] },
  { id: 3, name: "3e - Temple", safetyScore: 8.5, safetyLevel: 'safe', tips: ["Trendy Marais area", "Safe for evening walks", "Pickpockets at markets"], center: [48.8637, 2.3615] },
  { id: 4, name: "4e - Hôtel de Ville", safetyScore: 9.0, safetyLevel: 'safe', tips: ["Notre Dame area well-patrolled", "Safe at all hours", "Tourist crowd pickpockets"], center: [48.8545, 2.3565] },
  { id: 5, name: "5e - Panthéon", safetyScore: 8.7, safetyLevel: 'safe', tips: ["Latin Quarter - student area", "Safe overall", "Watch at Saint-Michel"], center: [48.8462, 2.3499] },
  { id: 6, name: "6e - Luxembourg", safetyScore: 9.1, safetyLevel: 'safe', tips: ["Upscale residential", "Very safe neighborhood", "Popular with families"], center: [48.8489, 2.3323] },
  { id: 7, name: "7e - Palais Bourbon", safetyScore: 9.3, safetyLevel: 'safe', tips: ["Eiffel Tower district", "Government buildings - secure", "Premium safety area"], center: [48.8566, 2.3150] },
  { id: 8, name: "8e - Élysée", safetyScore: 9.0, safetyLevel: 'safe', tips: ["Champs-Élysées area", "High security", "Watch for scams"], center: [48.8744, 2.3106] },
  { id: 9, name: "9e - Opéra", safetyScore: 7.5, safetyLevel: 'caution', tips: ["Tourist hub - be alert", "Pickpockets common", "Avoid Pigalle at night"], center: [48.8768, 2.3378] },
  { id: 10, name: "10e - Entrepôt", safetyScore: 6.2, safetyLevel: 'caution', tips: ["Gare du Nord caution", "Canal St-Martin nice daytime", "Stay aware at night"], center: [48.8761, 2.3610] },
  { id: 11, name: "11e - Popincourt", safetyScore: 7.0, safetyLevel: 'caution', tips: ["Nightlife district", "Safe in groups", "Oberkampf can be rowdy"], center: [48.8588, 2.3797] },
  { id: 12, name: "12e - Reuilly", safetyScore: 7.3, safetyLevel: 'caution', tips: ["Bercy area improving", "Nation square caution", "Generally residential"], center: [48.8413, 2.3876] },
  { id: 13, name: "13e - Gobelins", safetyScore: 6.8, safetyLevel: 'caution', tips: ["Chinatown active", "Some isolated areas", "Improving rapidly"], center: [48.8322, 2.3561] },
  { id: 14, name: "14e - Observatoire", safetyScore: 7.4, safetyLevel: 'caution', tips: ["Montparnasse tourist friendly", "Residential south", "Safe overall"], center: [48.8286, 2.3262] },
  { id: 15, name: "15e - Vaugirard", safetyScore: 8.4, safetyLevel: 'safe', tips: ["Largest arrondissement", "Family friendly", "Very residential"], center: [48.8405, 2.2918] },
  { id: 16, name: "16e - Passy", safetyScore: 9.4, safetyLevel: 'safe', tips: ["Upscale area", "Very secure", "Embassy district"], center: [48.8632, 2.2680] },
  { id: 17, name: "17e - Batignolles-Monceau", safetyScore: 7.2, safetyLevel: 'caution', tips: ["Mixed area - varies", "South part affluent", "North needs caution"], center: [48.8872, 2.3140] },
  { id: 18, name: "18e - Butte-Montmartre", safetyScore: 5.5, safetyLevel: 'danger', tips: ["Sacré-Cœur tourist zone safe", "Barbès-Rochechouart avoid", "Stay on main paths"], center: [48.8924, 2.3444] },
  { id: 19, name: "19e - Buttes-Chaumont", safetyScore: 5.0, safetyLevel: 'danger', tips: ["Park beautiful but isolated", "La Villette area improving", "Extra caution at night"], center: [48.8817, 2.3838] },
  { id: 20, name: "20e - Ménilmontant", safetyScore: 5.3, safetyLevel: 'danger', tips: ["Gentrifying but mixed", "Père Lachaise safe daytime", "Belleville needs awareness"], center: [48.8638, 2.3988] },
];

export const landmarks: Landmark[] = [
  {
    id: 'eiffel',
    name: 'Eiffel Tower',
    position: [48.8584, 2.2945],
    icon: '🗼',
    image: eiffelTowerImg,
    description: 'Iconic iron lattice tower on the Champ de Mars',
    arrondissement: 7,
  },
  {
    id: 'louvre',
    name: 'Louvre Museum',
    position: [48.8606, 2.3376],
    icon: '🏛️',
    image: louvreImg,
    description: 'World\'s largest art museum and historic monument',
    arrondissement: 1,
  },
  {
    id: 'arc',
    name: 'Arc de Triomphe',
    position: [48.8738, 2.2950],
    icon: '🏛️',
    image: arcDeTriompheImg,
    description: 'Triumphal arch honoring those who fought for France',
    arrondissement: 8,
  },
  {
    id: 'notre-dame',
    name: 'Notre Dame',
    position: [48.8530, 2.3499],
    icon: '⛪',
    image: notreDameImg,
    description: 'Medieval Catholic cathedral on the Île de la Cité',
    arrondissement: 4,
  },
  {
    id: 'sacre-coeur',
    name: 'Sacré-Cœur',
    position: [48.8867, 2.3431],
    icon: '⛪',
    image: sacreCoeurImg,
    description: 'Romano-Byzantine basilica on Montmartre',
    arrondissement: 18,
  },
  {
    id: 'moulin-rouge',
    name: 'Moulin Rouge',
    position: [48.8841, 2.3322],
    icon: '🎭',
    image: moulinRougeImg,
    description: 'Famous cabaret in Pigalle district',
    arrondissement: 18,
  },
  {
    id: 'pantheon',
    name: 'Panthéon',
    position: [48.8462, 2.3464],
    icon: '🏛️',
    image: pantheonImg,
    description: 'Mausoleum containing remains of French citizens',
    arrondissement: 5,
  },
  {
    id: 'opera',
    name: 'Opéra Garnier',
    position: [48.8720, 2.3316],
    icon: '🎭',
    image: operaGarnierImg,
    description: 'Opulent 19th-century opera house',
    arrondissement: 9,
  },
  {
    id: 'pompidou',
    name: 'Centre Pompidou',
    position: [48.8606, 2.3522],
    icon: '🎨',
    image: pompidouImg,
    description: 'Modern art museum with inside-out architecture',
    arrondissement: 4,
  },
  {
    id: 'luxembourg',
    name: 'Luxembourg Gardens',
    position: [48.8462, 2.3371],
    icon: '🏰',
    image: luxembourgImg,
    description: 'Beautiful palace and gardens in the 6th',
    arrondissement: 6,
  },
  {
    id: 'orsay',
    name: 'Musée d\'Orsay',
    position: [48.8600, 2.3266],
    icon: '🖼️',
    image: orsayImg,
    description: 'Impressionist art in a former railway station',
    arrondissement: 7,
  },
  {
    id: 'concorde',
    name: 'Place de la Concorde',
    position: [48.8656, 2.3212],
    icon: '⛲',
    image: concordeImg,
    description: 'Historic square with Egyptian obelisk',
    arrondissement: 8,
  },
];

export const hotels: Hotel[] = [
  // Eiffel Tower Hotels
  { id: 'h1', name: 'Pullman Paris Tour Eiffel', landmarkId: 'eiffel', distance: 0.3, districtSafetyScore: 9.3, arrondissement: 7, pricePerNight: 420, rating: 4.5, imageUrl: '' },
  { id: 'h2', name: 'Hôtel Plaza Athénée', landmarkId: 'eiffel', distance: 0.8, districtSafetyScore: 9.0, arrondissement: 8, pricePerNight: 1200, rating: 4.9, imageUrl: '' },
  { id: 'h3', name: 'Shangri-La Hotel', landmarkId: 'eiffel', distance: 0.5, districtSafetyScore: 9.4, arrondissement: 16, pricePerNight: 980, rating: 4.8, imageUrl: '' },
  { id: 'h4', name: 'Le Cinq Codet', landmarkId: 'eiffel', distance: 0.6, districtSafetyScore: 9.3, arrondissement: 7, pricePerNight: 450, rating: 4.6, imageUrl: '' },
  { id: 'h5', name: 'Hôtel de la Motte Picquet', landmarkId: 'eiffel', distance: 0.4, districtSafetyScore: 9.3, arrondissement: 7, pricePerNight: 280, rating: 4.3, imageUrl: '' },
  
  // Louvre Hotels
  { id: 'h6', name: 'Hôtel du Louvre', landmarkId: 'louvre', distance: 0.1, districtSafetyScore: 9.2, arrondissement: 1, pricePerNight: 380, rating: 4.4, imageUrl: '' },
  { id: 'h7', name: 'Le Meurice', landmarkId: 'louvre', distance: 0.3, districtSafetyScore: 9.2, arrondissement: 1, pricePerNight: 1100, rating: 4.9, imageUrl: '' },
  { id: 'h8', name: 'Hôtel Regina Louvre', landmarkId: 'louvre', distance: 0.2, districtSafetyScore: 9.2, arrondissement: 1, pricePerNight: 420, rating: 4.5, imageUrl: '' },
  { id: 'h9', name: 'Grand Hôtel du Palais Royal', landmarkId: 'louvre', distance: 0.4, districtSafetyScore: 9.2, arrondissement: 1, pricePerNight: 550, rating: 4.7, imageUrl: '' },
  { id: 'h10', name: 'Hôtel Molière', landmarkId: 'louvre', distance: 0.5, districtSafetyScore: 9.2, arrondissement: 1, pricePerNight: 220, rating: 4.2, imageUrl: '' },
  
  // Arc de Triomphe Hotels
  { id: 'h11', name: 'Sofitel Arc de Triomphe', landmarkId: 'arc', distance: 0.2, districtSafetyScore: 9.0, arrondissement: 8, pricePerNight: 480, rating: 4.6, imageUrl: '' },
  { id: 'h12', name: 'Hôtel Splendid Étoile', landmarkId: 'arc', distance: 0.3, districtSafetyScore: 9.0, arrondissement: 8, pricePerNight: 320, rating: 4.4, imageUrl: '' },
  { id: 'h13', name: 'Hôtel Mac Mahon', landmarkId: 'arc', distance: 0.4, districtSafetyScore: 9.0, arrondissement: 8, pricePerNight: 280, rating: 4.3, imageUrl: '' },
  { id: 'h14', name: 'Hôtel Napoleon Paris', landmarkId: 'arc', distance: 0.1, districtSafetyScore: 9.0, arrondissement: 8, pricePerNight: 420, rating: 4.5, imageUrl: '' },
  { id: 'h15', name: 'Le Royal Monceau', landmarkId: 'arc', distance: 0.6, districtSafetyScore: 9.0, arrondissement: 8, pricePerNight: 950, rating: 4.8, imageUrl: '' },
  
  // Notre Dame Hotels
  { id: 'h16', name: 'Hôtel Le Notre Dame', landmarkId: 'notre-dame', distance: 0.1, districtSafetyScore: 9.0, arrondissement: 4, pricePerNight: 350, rating: 4.4, imageUrl: '' },
  { id: 'h17', name: 'Hôtel de Lutèce', landmarkId: 'notre-dame', distance: 0.2, districtSafetyScore: 9.0, arrondissement: 4, pricePerNight: 280, rating: 4.3, imageUrl: '' },
  { id: 'h18', name: 'Hôtel Duo', landmarkId: 'notre-dame', distance: 0.3, districtSafetyScore: 8.5, arrondissement: 3, pricePerNight: 220, rating: 4.2, imageUrl: '' },
  { id: 'h19', name: 'Pavillon de la Reine', landmarkId: 'notre-dame', distance: 0.5, districtSafetyScore: 8.5, arrondissement: 3, pricePerNight: 480, rating: 4.7, imageUrl: '' },
  { id: 'h20', name: 'Hôtel Saint-Louis en l\'Isle', landmarkId: 'notre-dame', distance: 0.2, districtSafetyScore: 9.0, arrondissement: 4, pricePerNight: 250, rating: 4.3, imageUrl: '' },
  
  // Sacré-Cœur Hotels
  { id: 'h21', name: 'Hôtel Terrass', landmarkId: 'sacre-coeur', distance: 0.3, districtSafetyScore: 5.5, arrondissement: 18, pricePerNight: 280, rating: 4.3, imageUrl: '' },
  { id: 'h22', name: 'Timhotel Montmartre', landmarkId: 'sacre-coeur', distance: 0.2, districtSafetyScore: 5.5, arrondissement: 18, pricePerNight: 150, rating: 4.0, imageUrl: '' },
  { id: 'h23', name: 'Le Relais Montmartre', landmarkId: 'sacre-coeur', distance: 0.4, districtSafetyScore: 5.5, arrondissement: 18, pricePerNight: 180, rating: 4.2, imageUrl: '' },
  { id: 'h24', name: 'Hôtel Particulier Montmartre', landmarkId: 'sacre-coeur', distance: 0.3, districtSafetyScore: 5.5, arrondissement: 18, pricePerNight: 450, rating: 4.6, imageUrl: '' },
  { id: 'h25', name: 'Mercure Montmartre', landmarkId: 'sacre-coeur', distance: 0.5, districtSafetyScore: 7.5, arrondissement: 9, pricePerNight: 200, rating: 4.1, imageUrl: '' },
];

export const getHotelsForLandmark = (landmarkId: string): Hotel[] => {
  return hotels
    .filter(hotel => hotel.landmarkId === landmarkId)
    .sort((a, b) => a.distance - b.distance);
};

export const getArrondissementById = (id: number): Arrondissement | undefined => {
  return arrondissements.find(a => a.id === id);
};

export const getSafetyColor = (level: 'safe' | 'caution' | 'danger'): string => {
  switch (level) {
    case 'safe': return '#22c55e';
    case 'caution': return '#f59e0b';
    case 'danger': return '#ef4444';
  }
};

export const getSafetyOpacity = (level: 'safe' | 'caution' | 'danger'): number => {
  switch (level) {
    case 'safe': return 0.2;
    case 'caution': return 0.3;
    case 'danger': return 0.4;
  }
};
