import React from 'react';

interface ScoreBoardProps {
  wpm: number;
  accuracy: number;
  time: number;
  mistakes: number;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ wpm, accuracy, time, mistakes }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-white rounded-lg shadow">
      <div className="text-center">
        <div className="text-2xl font-bold text-blue-600">{wpm}</div>
        <div className="text-sm text-gray-600">WPM</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold text-green-600">{accuracy}%</div>
        <div className="text-sm text-gray-600">Accuracy</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold text-purple-600">{time}s</div>
        <div className="text-sm text-gray-600">Time</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold text-red-600">{mistakes}</div>
        <div className="text-sm text-gray-600">Mistakes</div>
      </div>
    </div>
  );
};

export default ScoreBoard; 