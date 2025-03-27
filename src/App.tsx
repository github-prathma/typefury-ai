import { useState, useEffect } from 'react';
import TypingBox from './components/TypingBox.tsx';
import ScoreBoard from './components/ScoreBoard.tsx';
import DifficultySelector from './components/DifficultySelector.tsx';
import { generateText } from './utils/generateText';

function App() {
  const [difficulty, setDifficulty] = useState({ id: 'easy', label: 'Easy', words: 10 });
  const [text, setText] = useState('');
  const [stats, setStats] = useState({ wpm: 0, accuracy: 0, time: 0, mistakes: 0 });
  const [isLoading, setIsLoading] = useState(false);

  const loadNewText = async () => {
    setIsLoading(true);
    const newText = await generateText(difficulty);
    setText(newText);
    setIsLoading(false);
  };

  useEffect(() => {
    loadNewText();
  }, [difficulty]);

  const handleComplete = (time: number) => {
    setStats(prev => ({ ...prev, time }));
    loadNewText();
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">🔥 TypeFury AI</h1>
      <DifficultySelector onSelect={setDifficulty} selectedDifficulty={difficulty} />
      {isLoading ? (
        <div className="text-xl">Generating text...</div>
      ) : (
        <TypingBox text={text} onComplete={handleComplete} difficulty={difficulty.id} />
      )}
      <ScoreBoard {...stats} />
    </div>
  );
}

export default App;