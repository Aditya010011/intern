
// Replace hardcoded API key with environment variable
const API_KEY = import.meta.env.VITE_NVIDIA_API_KEY || '';

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface OpenAIResponse {
  choices: {
    message: ChatMessage;
    finish_reason: string;
    index: number;
  }[];
}

// Add this function to try a fallback model if the main one times out
const tryWithFallbackModel = async (
  messages: ChatMessage[],
  proxyUrl: string
): Promise<OpenAIResponse> => {
  try {
    const response = await fetch(proxyUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        // Use a smaller, faster model as fallback
        model: 'meta/llama-3-8b-instruct',
        messages: messages,
        temperature: 0.7,
        top_p: 0.9,
        max_tokens: 256
      })
    });

    if (!response.ok) {
      throw new Error(`Fallback API request failed with status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Fallback model error:', error);
    throw error;
  }
};

export const generateTutorResponse = async (
  messages: ChatMessage[],
  technology: string
): Promise<string> => {
  try {
    // Prepare context for the specific technology
    const systemMessage: ChatMessage = {
      role: 'system',
      content: `You are an expert tutor in ${technology}. Provide helpful, accurate, and educational responses to help the user learn ${technology}. Include code examples when relevant. Keep your responses concise but informative.`
    };

    const allMessages = [systemMessage, ...messages];

    // Use the proxy URL to avoid CORS issues
    const proxyUrl = '/api/chat';

    // Set a timeout for the fetch request
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout

    try {
      const response = await fetch(proxyUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`,
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          model: 'meta/llama-4-maverick-17b-128e-instruct',
          messages: allMessages,
          temperature: 1.0,
          top_p: 1.0,
          max_tokens: 512
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        const data: OpenAIResponse = await response.json();
        return data.choices[0].message.content;
      } else {
        const errorText = await response.text();
        console.warn('API request failed:', errorText);
        throw new Error(`API request failed with status ${response.status}: ${errorText}`);
      }
    } catch (fetchError) {
      if (fetchError.name === 'AbortError') {
        throw new Error('Request timed out. The NVIDIA API is taking too long to respond.');
      }
      throw fetchError;
    }
  } catch (error) {
    console.error('Error generating tutor response:', error);
    return "I'm having trouble connecting right now, but I'll try to help with your question about " + technology + ". Could you please try again or rephrase your question?";
  }
};

export const generateCodeFeedback = async (
  code: string,
  language: string
): Promise<string> => {
  try {
    const messages: ChatMessage[] = [
      {
        role: 'system',
        content: `You are an expert coding tutor specializing in ${language}. Analyze the provided code, identify potential issues, suggest improvements for best practices, and provide constructive feedback. Be specific and educational in your feedback.`
      },
      {
        role: 'user',
        content: `Please review this ${language} code and provide feedback:\n\n\`\`\`${language}\n${code}\n\`\`\``
      }
    ];

    // Use the proxy URL to avoid CORS issues
    const proxyUrl = '/api/chat';

    const response = await fetch(proxyUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        model: 'meta/llama-4-maverick-17b-128e-instruct',
        messages: messages,
        temperature: 1.0,
        top_p: 1.0,
        max_tokens: 512
      })
    });

    if (response.ok) {
      const data: OpenAIResponse = await response.json();
      return data.choices[0].message.content;
    } else {
      const errorText = await response.text();
      console.warn('API request failed:', errorText);
      throw new Error(`API request failed with status ${response.status}: ${errorText}`);
    }
  } catch (error) {
    console.error('Error generating code feedback:', error);
    return "I'm having trouble analyzing your code right now. Please try again in a moment.";
  }
};
