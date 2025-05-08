export const calculateWPM = (text, timeInSeconds, mistakes) => {
  // Standard word length is considered 5 characters
  const standardWordLength = 5;
  
  // Calculate total characters typed correctly
  const correctChars = text.length - mistakes;
  
  // Calculate words (based on standard word length)
  const words = correctChars / standardWordLength;
  
  // Convert time to minutes
  const minutes = timeInSeconds / 60;
  
  // Calculate WPM (words per minute)
  const wpm = Math.round(words / minutes);
  
  // Calculate accuracy percentage
  const accuracy = Math.round((correctChars / text.length) * 100);
  
  return {
    wpm: wpm || 0,
    accuracy: accuracy || 0,
    time: Math.round(timeInSeconds),
    mistakes
  };
}; 