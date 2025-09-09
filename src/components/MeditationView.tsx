import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMeditationByRoman, getRandomMeditation, numberToRoman, Meditation } from '../data/meditations';

interface MeditationViewProps {
  isSpecific?: boolean;
}

const MeditationView: React.FC<MeditationViewProps> = ({ isSpecific = false }) => {
  const [meditation, setMeditation] = useState<Meditation | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { book, passage } = useParams<{ book: string; passage: string }>();
  const navigate = useNavigate();

  const toRoman = (num: number): string => {
    return numberToRoman(num) || '';
  };

  const loadMeditation = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      let newMeditation: Meditation | null = null;
      
      if (isSpecific && book && passage) {
        const passageNum = parseInt(passage);
        if (isNaN(passageNum)) {
          setError('Invalid passage number');
          return;
        }
        
        newMeditation = await getMeditationByRoman(book, passageNum);
        
        if (!newMeditation) {
          setError(`Meditation ${book}.${passage} not found`);
          return;
        }
      } else {
        newMeditation = await getRandomMeditation();
        
        // Update URL to reflect the random meditation
        if (newMeditation) {
          const romanBook = toRoman(newMeditation.book);
          navigate(`/${romanBook}/${newMeditation.passage}`, { replace: true });
        }
      }
      
      setMeditation(newMeditation);
    } catch (error) {
      console.error('Error loading meditation:', error);
      setError('Failed to load meditation');
    } finally {
      setIsLoading(false);
    }
  };

  const loadNewRandomMeditation = async () => {
    const newMeditation = await getRandomMeditation();
    if (newMeditation) {
      const romanBook = toRoman(newMeditation.book);
      navigate(`/${romanBook}/${newMeditation.passage}`);
    }
  };

  useEffect(() => {
    loadMeditation();
  }, [book, passage, isSpecific]);

  if (error) {
    return (
      <div className="app">
        <div className="container">
          <header className="header">
            <h1 className="title">
              <button 
                className="title-button"
                onClick={loadNewRandomMeditation}
                aria-label="Load new meditation"
              >
                <img src="/aurelius-portrait.svg" alt="Marcus Aurelius" className="title-portrait" />
                meditations
              </button>
            </h1>
          </header>

          <main className="main">
            <div className="meditation-card">
              <div className="meditation-text">
                {error}
              </div>
              <button 
                className="error-button"
                onClick={loadNewRandomMeditation}
                style={{
                  background: 'var(--color-accent)',
                  color: 'white',
                  border: 'none',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  marginTop: '1rem'
                }}
              >
                Go to Random Meditation
              </button>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1 className="title">
            <button 
              className="title-button"
              onClick={loadNewRandomMeditation}
              aria-label="Load new meditation"
            >
              <img src="/aurelius-portrait.svg" alt="Marcus Aurelius" className="title-portrait" />
              meditations
            </button>
          </h1>
        </header>

        {!isLoading && meditation && (
          <div className="meditation-source">
            {toRoman(meditation.book)}.{meditation.passage}
          </div>
        )}

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
            </div>
          ) : null}
        </main>
      </div>
    </div>
  );
};

export default MeditationView;
