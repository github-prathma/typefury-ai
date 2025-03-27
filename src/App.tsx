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
    <div className="h-screen w-screen bg-gray-900 text-white flex flex-col">
      <div className="flex-1 w-full px-4 py-8 flex flex-col">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">🔥 TypeFury AI</h1>
          <p className="text-gray-400 text-sm md:text-base">Improve your typing speed with AI-generated texts</p>
        </header>

        <main className="flex-1 flex flex-col justify-center w-full max-w-6xl mx-auto space-y-8">
          <DifficultySelector onSelect={setDifficulty} selectedDifficulty={difficulty} />
          
          <div className="bg-gray-800 rounded-lg p-6 shadow-xl flex-1 flex flex-col min-h-[400px]">
            {isLoading ? (
              <div className="flex-1 flex items-center justify-center text-xl">Generating text...</div>
            ) : (
              <TypingBox text={text} onComplete={handleComplete} difficulty={difficulty.id} />
            )}
          </div>

          <ScoreBoard {...stats} />
        </main>
      </div>

      <footer className="w-full py-4 text-center text-gray-400 text-sm border-t border-gray-800">
        <p>Press space to start typing</p>
      </footer>
    </div>
  );
}

export default App;