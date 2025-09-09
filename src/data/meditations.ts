export interface Meditation {
  id: number;
  book: number;
  passage: number;
  text: string;
}

// Available book numbers (1-12, all books have content now)
const AVAILABLE_BOOKS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

// Roman numeral conversion helpers
const ROMAN_TO_NUMBER: { [key: string]: number } = {
  'I': 1, 'II': 2, 'III': 3, 'IV': 4, 'V': 5, 'VI': 6,
  'VII': 7, 'VIII': 8, 'IX': 9, 'X': 10, 'XI': 11, 'XII': 12
};

const NUMBER_TO_ROMAN: { [key: number]: string } = {
  1: 'I', 2: 'II', 3: 'III', 4: 'IV', 5: 'V', 6: 'VI',
  7: 'VII', 8: 'VIII', 9: 'IX', 10: 'X', 11: 'XI', 12: 'XII'
};

export const romanToNumber = (roman: string): number | null => {
  return ROMAN_TO_NUMBER[roman.toUpperCase()] || null;
};

export const numberToRoman = (num: number): string | null => {
  return NUMBER_TO_ROMAN[num] || null;
};

// Function to load a specific book's JSON
const loadBook = async (bookNumber: number): Promise<Meditation[]> => {
  try {
    const bookModule = await import(`./books/json/book-${bookNumber}.json`);
    return bookModule.default;
  } catch (error) {
    console.error(`Error loading book ${bookNumber}:`, error);
    return [];
  }
};

export const getRandomMeditation = async (): Promise<Meditation> => {
  // Step 1: Randomly pick a book number
  const randomBookNumber = AVAILABLE_BOOKS[Math.floor(Math.random() * AVAILABLE_BOOKS.length)];
  
  // Step 2: Load that book's JSON
  const bookMeditations = await loadBook(randomBookNumber);
  
  // Step 3: Randomly pick a meditation from that book
  if (bookMeditations.length === 0) {
    // Fallback: try book 1 if the selected book is empty
    const fallbackMeditations = await loadBook(1);
    const randomIndex = Math.floor(Math.random() * fallbackMeditations.length);
    return fallbackMeditations[randomIndex];
  }
  
  const randomIndex = Math.floor(Math.random() * bookMeditations.length);
  return bookMeditations[randomIndex];
};

// Get random meditation from a specific book
export const getRandomMeditationFromBook = async (bookNumber: number): Promise<Meditation | null> => {
  if (!AVAILABLE_BOOKS.includes(bookNumber)) {
    return null;
  }
  
  const bookMeditations = await loadBook(bookNumber);
  
  if (bookMeditations.length === 0) {
    return null;
  }
  
  const randomIndex = Math.floor(Math.random() * bookMeditations.length);
  return bookMeditations[randomIndex];
};

// Get specific meditation by book and passage number
export const getSpecificMeditation = async (bookNumber: number, passageNumber: number): Promise<Meditation | null> => {
  if (!AVAILABLE_BOOKS.includes(bookNumber)) {
    return null;
  }
  
  const bookMeditations = await loadBook(bookNumber);
  const meditation = bookMeditations.find(m => m.passage === passageNumber);
  
  return meditation || null;
};

// Get specific meditation by Roman numeral and passage
export const getMeditationByRoman = async (romanNumeral: string, passageNumber: number): Promise<Meditation | null> => {
  const bookNumber = romanToNumber(romanNumeral);
  if (!bookNumber) {
    return null;
  }
  
  return getSpecificMeditation(bookNumber, passageNumber);
};
