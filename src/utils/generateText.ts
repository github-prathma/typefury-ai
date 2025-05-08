interface Difficulty {
  id: string;
  label: string;
  words: number;
}

export const generateText = async (difficulty: Difficulty): Promise<string> => {
  const prompt = `Generate a ${difficulty.label} difficulty text for typing practice with approximately ${difficulty.words} words. The text should be engaging and suitable for typing practice.`;
  const maxRetries = 3;
  let retryCount = 0;

  while (retryCount < maxRetries) {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'You are a helpful assistant that generates typing practice texts.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.7,
          max_tokens: 200,
        }),
      });

      if (!response.ok) {
        if (response.status === 429) {
          retryCount++;
          const retryAfter = response.headers.get('Retry-After');
          const waitTime = retryAfter ? parseInt(retryAfter) * 1000 : Math.min(1000 * Math.pow(2, retryCount), 10000);
          await new Promise(resolve => setTimeout(resolve, waitTime));
          continue;
        }
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      
      if (!data?.choices?.[0]?.message?.content) {
        throw new Error('Invalid response format from OpenAI API');
      }

      const generatedText = data.choices[0].message.content.trim();
      if (!generatedText) {
        throw new Error('Generated text is empty');
      }

      return generatedText;
    } catch (error) {
      console.error(`Attempt ${retryCount + 1} failed:`, error);
      retryCount++;
      
      if (retryCount === maxRetries) {
        return 'The quick brown fox jumps over the lazy dog. This is a fallback text for typing practice. Please try again in a few moments.';
      }
      
      await new Promise(resolve => setTimeout(resolve, Math.min(1000 * Math.pow(2, retryCount), 10000)));
    }
  }

  return 'The quick brown fox jumps over the lazy dog. This is a fallback text for typing practice. Please try again in a few moments.';
}; 