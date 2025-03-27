export const calculateWPM = (text, timeInSeconds, mistakes) => {
  const words = text.trim().split(/\s+/).length;
  const minutes = timeInSeconds / 60;
  const grossWPM = words / minutes;
  const netWPM = grossWPM - (mistakes / minutes);
  
  return {
    grossWPM: Math.round(grossWPM),
    netWPM: Math.round(netWPM),
    accuracy: Math.round(((text.length - mistakes) / text.length) * 100)
  };
}; 