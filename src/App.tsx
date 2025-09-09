import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MeditationView from './components/MeditationView';
import NotFound from './components/NotFound';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Default route for random meditation */}
        <Route path="/" element={<MeditationView isSpecific={false} />} />
        {/* Route for specific meditations: /IV/23 */}
        <Route path="/:book/:passage" element={<MeditationView isSpecific={true} />} />
        {/* 404 route for invalid paths */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
