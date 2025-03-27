import React from 'react';

interface Difficulty {
  id: string;
  label: string;
  words: number;
}

interface DifficultySelectorProps {
  onSelect: (difficulty: Difficulty) => void;
  selectedDifficulty?: Difficulty;
}

const DifficultySelector: React.FC<DifficultySelectorProps> = ({ onSelect, selectedDifficulty }) => {
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
          onClick={() => onSelect(difficulty)}
          className={`px-6 py-2 rounded-lg transition-colors ${
            selectedDifficulty?.id === difficulty.id
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