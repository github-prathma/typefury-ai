import React from 'react';

interface Difficulty {
  id: string;
  label: string;
  words: number;
}

interface DifficultySelectorProps {
  selectedDifficulty: Difficulty;
  onDifficultyChange: (difficulty: Difficulty) => void;
}

const DifficultySelector: React.FC<DifficultySelectorProps> = ({ onDifficultyChange, selectedDifficulty }) => {
  const difficulties: Difficulty[] = [
    { id: 'easy', label: 'Easy', words: 10 },
    { id: 'medium', label: 'Medium', words: 25 },
    { id: 'hard', label: 'Hard', words: 50 }
  ];

  return (
    <div className="flex justify-center gap-4 p-4">
      {difficulties.map((difficulty) => (
        <button
          key={difficulty.id}
          onClick={() => onDifficultyChange(difficulty)}
          className={`px-6 py-2 rounded-lg transition-colors ${
            selectedDifficulty.id === difficulty.id
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {difficulty.label}
        </button>
      ))}
    </div>
  );
};

export default DifficultySelector; 