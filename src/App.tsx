import React, { useState, useEffect } from 'react';
import { getRandomMeditation, Meditation } from './data/meditations';
import './App.css';

const App: React.FC = () => {
  const [meditation, setMeditation] = useState<Meditation | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const toRoman = (num: number): string => {
    const romanNumerals = [
      { value: 12, numeral: 'XII' },
      { value: 11, numeral: 'XI' },
      { value: 10, numeral: 'X' },
      { value: 9, numeral: 'IX' },
      { value: 8, numeral: 'VIII' },
      { value: 7, numeral: 'VII' },
      { value: 6, numeral: 'VI' },
      { value: 5, numeral: 'V' },
      { value: 4, numeral: 'IV' },
      { value: 3, numeral: 'III' },
      { value: 2, numeral: 'II' },
      { value: 1, numeral: 'I' }
    ];
    
    for (const { value, numeral } of romanNumerals) {
      if (num >= value) {
        return numeral;
      }
    }
    return '';
  };

  const loadNewMeditation = () => {
    setIsLoading(true);
    // Add a small delay for better UX
    setTimeout(() => {
      setMeditation(getRandomMeditation());
      setIsLoading(false);
    }, 300);
  };

  useEffect(() => {
    loadNewMeditation();
  }, []);

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1 className="title">
            <img src="/aurelius-portrait.svg" alt="Marcus Aurelius" className="title-portrait" />
            meditations
          </h1>
        </header>

        <main className="main">
          {isLoading ? (
            <div className="loading">
              <div className="loader"></div>
            </div>
          ) : meditation ? (
            <div className="meditation-card">
              <div className="meditation-text">
                {meditation.text}
              </div>
              <div className="meditation-attribution">
                <div className="meditation-source">
                  {toRoman(meditation.book)}.{meditation.passage}
                </div>
              </div>
            </div>
          ) : null}

        </main>

      </div>
    </div>
  );
};

export default App;
