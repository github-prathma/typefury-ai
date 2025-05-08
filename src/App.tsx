import { useState, useEffect } from 'react';
import TypingBox from './components/TypingBox';
import ScoreBoard from './components/ScoreBoard';
import DifficultySelector from './components/DifficultySelector';
import { generateText } from './utils/generateText';
import { calculateWPM } from './utils/calculateWPM.ts';

interface Difficulty {
  id: string;
  label: string;
  words: number;
}

const difficulties: Difficulty[] = [
  { id: 'easy', label: 'Easy', words: 10 },
  { id: 'medium', label: 'Medium', words: 20 },
  { id: 'hard', label: 'Hard', words: 30 }
];

function App() {
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty>(difficulties[0]);
  const [stats, setStats] = useState<{
    wpm: number;
    accuracy: number;
    time: number;
    mistakes: number;
  }>({
    wpm: 0,
    accuracy: 0,
    time: 0,
    mistakes: 0
  });
  const [startTime, setStartTime] = useState<number | null>(null);
  const [currentInput, setCurrentInput] = useState('');

  const handleDifficultyChange = (newDifficulty: Difficulty) => {
    setDifficulty(newDifficulty);
    setText('');
    setStats({ wpm: 0, accuracy: 0, time: 0, mistakes: 0 });
    setCurrentInput('');
    setStartTime(null);
  };

  const handleInput = (input: string) => {
    if (!startTime) {
      setStartTime(Date.now());
    }
    setCurrentInput(input);
    
    // Calculate mistakes
    let mistakes = 0;
    for (let i = 0; i < input.length; i++) {
      if (input[i] !== text[i]) {
        mistakes++;
      }
    }

    // Calculate time elapsed in seconds
    const timeElapsed = startTime ? (Date.now() - startTime) / 1000 : 0;
    
    // Update stats
    const newStats = calculateWPM(text, timeElapsed, mistakes);
    setStats(newStats);
  };

  const handleComplete = (timeElapsed: number) => {
    const mistakes = currentInput.split('').reduce((acc, char, i) => 
      acc + (char !== text[i] ? 1 : 0), 0
    );
    const finalStats = calculateWPM(text, timeElapsed / 1000, mistakes);
    setStats(finalStats);
    loadNewText();
  };

  const loadNewText = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const newText = await generateText(difficulty);
      setText(newText);
      setStats({ wpm: 0, accuracy: 0, time: 0, mistakes: 0 });
      setCurrentInput('');
      setStartTime(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate text');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadNewText();
  }, [difficulty]);

  return (
    <div className="h-screen w-screen bg-gray-900 text-white flex flex-col">
      <div className="flex-1 w-full px-4 py-8 flex flex-col">
        <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-center mb-8">TypeFury AI</h1>
        <p className="text-center text-gray-400">A typing test app powered by AI</p>
        </header>
        
        
        <div className="max-w-4xl mx-auto">
          <DifficultySelector
            selectedDifficulty={difficulty}
            onDifficultyChange={handleDifficultyChange}
          />
          
          {error && (
            <div className="mb-4 p-4 bg-red-500/10 border border-red-500 rounded-lg text-red-500">
              {error}
            </div>
          )}
          
          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-4 text-gray-400">Generating text...</p>
            </div>
          ) : (
            <>
              {text && (
                <div className="mb-8">
                  <TypingBox
                    text={text}
                    onComplete={handleComplete}
                    difficulty={difficulty.id}
                    onInput={handleInput}
                  />
                </div>
              )}
              
              <ScoreBoard
                wpm={stats.wpm}
                accuracy={stats.accuracy}
                time={stats.time}
                mistakes={stats.mistakes}
              />
              
              {!text && !isLoading && (
                <div className="text-center">
                  <button
                    onClick={loadNewText}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors"
                  >
                    Start Typing Test
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;