interface TypingStats {
  wpm: number;
  accuracy: number;
  time: number;
  mistakes: number;
}

export const calculateWPM = (text: string, timeInSeconds: number, mistakes: number): TypingStats => {
  // Standard word length is considered 5 characters
  const standardWordLength = 5;
  
  // Calculate total characters typed correctly
  const correctChars = text.length - mistakes;
  
  // Calculate words (based on standard word length)
  const words = correctChars / standardWordLength;
  
  // Convert time to minutes (handle edge case where time is 0)
  const minutes = Math.max(timeInSeconds / 60, 0.001);
  
  // Calculate WPM (words per minute)
  // WPM = (correct characters / 5) / (time in minutes)
  const wpm = Math.round(words / minutes);
  
  // Calculate accuracy percentage
  // Accuracy = (correct characters / total characters) * 100
  const accuracy = Math.round((correctChars / text.length) * 100);
  
  // Ensure all values are non-negative and within valid ranges
  return {
    wpm: Math.max(wpm, 0),
    accuracy: Math.min(Math.max(accuracy, 0), 100),
    time: Math.round(timeInSeconds),
    mistakes: Math.max(mistakes, 0)
  };
}; 