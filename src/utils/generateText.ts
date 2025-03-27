interface Difficulty {
  id: string;
  label: string;
  words: number;
}

export const generateText = async (difficulty: Difficulty): Promise<string> => {
  const prompt = `Generate a ${difficulty.label} difficulty text for typing practice with approximately ${difficulty.words} words. The text should be engaging and suitable for typing practice.`;

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

    const data = await response.json();
    return data.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error generating text:', error);
    return 'Failed to generate text. Please try again.';
  }
}; 