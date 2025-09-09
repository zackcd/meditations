import meditationsData from './meditations.json';

export interface Meditation {
  id: number;
  book: number;
  passage: number;
  text: string;
}

export const meditations: Meditation[] = meditationsData;

export const getRandomMeditation = (): Meditation => {
  const randomIndex = Math.floor(Math.random() * meditations.length);
  return meditations[randomIndex];
};
