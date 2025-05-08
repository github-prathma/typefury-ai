import React from 'react';

interface ScoreBoardProps {
  wpm: number;
  accuracy: number;
  time: number;
  mistakes: number;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ wpm, accuracy, time, mistakes }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-gray-800 rounded-lg shadow-lg">
      <div className="text-center">
        <div className="text-3xl font-bold text-blue-400">{wpm}</div>
        <div className="text-sm text-gray-400">WPM</div>
      </div>
      <div className="text-center">
        <div className="text-3xl font-bold text-green-400">{accuracy}%</div>
        <div className="text-sm text-gray-400">Accuracy</div>
      </div>
      <div className="text-center">
        <div className="text-3xl font-bold text-purple-400">{time}s</div>
        <div className="text-sm text-gray-400">Time</div>
      </div>
      <div className="text-center">
        <div className="text-3xl font-bold text-red-400">{mistakes}</div>
        <div className="text-sm text-gray-400">Mistakes</div>
      </div>
    </div>
  );
};

export default ScoreBoard; 