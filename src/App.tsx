import { useState } from 'react';
import TypingBox from './components/TypingBox.tsx';
import ScoreBoard from './components/ScoreBoard.tsx';
import DifficultySelector from './components/DifficultySelector.tsx';

function App() {
  const [difficulty, setDifficulty] = useState('easy');
  const [stats, setStats] = useState({ wpm: 0, accuracy: 0, time: 0, mistakes: 0 });

  const handleComplete = (time: number) => {
    setStats(prev => ({ ...prev, time }));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">🔥 TypeFury AI</h1>
      <DifficultySelector onSelect={(d) => setDifficulty(d.id)} selectedDifficulty={{ id: difficulty, label: difficulty, words: 10 }} />
      <TypingBox text="Sample text for typing" onComplete={handleComplete} difficulty={difficulty} />
      <ScoreBoard {...stats} />
    </div>
  );
}

export default App;