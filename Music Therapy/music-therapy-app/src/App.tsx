// import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IsoMoodPlayer from './components/IsoMoodPlayer';
import Dashboard from './components/Dashboard';
import EmotionMirror from './components/EmotionMirror';
import RhythmFarm from './components/RhythmFarm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/iso-mood" element={<IsoMoodPlayer />} />
        <Route path="/emotion-mirror" element={<EmotionMirror />} />
        <Route path="/rhythm-farm" element={<RhythmFarm />} />
      </Routes>
    </Router>
  );
}

export default App;
