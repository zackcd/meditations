export interface Meditation {
  id: number;
  book: number;
  passage: number;
  text: string;
}

// Available book numbers (1-12, all books have content now)
const AVAILABLE_BOOKS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

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
