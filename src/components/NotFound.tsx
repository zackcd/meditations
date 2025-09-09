import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
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
          <div className="meditation-card">
            <div className="meditation-text">
              The path you seek does not exist.
            </div>
            <Link 
              to="/" 
              style={{
                display: 'inline-block',
                marginTop: '1.5rem',
                padding: '0.75rem 1.5rem',
                background: 'var(--color-accent)',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '6px',
                fontSize: '0.9rem',
                fontFamily: 'var(--font-family-sans)'
              }}
            >
              Return to Wisdom
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
};

export default NotFound;
