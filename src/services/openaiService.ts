
// NVIDIA API Key
const API_KEY = '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';

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
      })
    });

    if (response.ok) {
      const data: OpenAIResponse = await response.json();
      return data.choices[0].message.content;
    } else {
      console.warn('API request failed:', await response.text());
      throw new Error(`API request failed with status ${response.status}`);
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
      console.warn('API request failed:', await response.text());
      throw new Error(`API request failed with status ${response.status}`);
    }
  } catch (error) {
    console.error('Error generating code feedback:', error);
    return "I'm having trouble analyzing your code right now. Please try again in a moment.";
  }
};
