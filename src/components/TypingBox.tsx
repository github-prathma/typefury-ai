import React, { useState, useEffect } from 'react';

interface TypingBoxProps {
  text: string;
  onComplete: (time: number) => void;
  onInput: (input: string) => void;
  difficulty: string;
}

const TypingBox: React.FC<TypingBoxProps> = ({ text, onComplete, onInput }) => {
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
    onInput(value);
    
    if (value === text) {
      setIsActive(false);
      onComplete(Date.now() - startTime!);
    }
  };

  return (
    <div className="w-full">
      <div className="mb-6 text-lg md:text-xl font-mono text-gray-300 leading-relaxed">
        {text.split('').map((char, index) => (
          <span
            key={index}
            className={`${
              input[index] === char
                ? 'text-green-500'
                : input[index]
                ? 'text-red-500'
                : 'text-gray-500'
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
        className="w-full p-4 text-lg bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
        placeholder="Start typing..."
        disabled={!isActive && input === text}
        autoFocus
      />
    </div>
  );
};

export default TypingBox; 