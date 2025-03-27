import React, { useState, useEffect } from 'react';

interface TypingBoxProps {
  text: string;
  onComplete: (time: number) => void;
  difficulty: string;
}

const TypingBox: React.FC<TypingBoxProps> = ({ text, onComplete, difficulty }) => {
  const [input, setInput] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (input.length === 1 && !startTime) {
      setStartTime(Date.now());
      setIsActive(true);
    }
  }, [input, startTime]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    
    if (value === text) {
      setIsActive(false);
      onComplete(Date.now() - startTime!);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <div className="mb-4 text-xl font-mono text-gray-700">
        {text.split('').map((char, index) => (
          <span
            key={index}
            className={`${
              input[index] === char
                ? 'text-green-500'
                : input[index]
                ? 'text-red-500'
                : 'text-gray-400'
            }`}
          >
            {char}
          </span>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={handleInput}
        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Start typing..."
        disabled={!isActive && input === text}
      />
    </div>
  );
};

export default TypingBox; 