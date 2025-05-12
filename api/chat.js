export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const API_KEY = process.env.VITE_NVIDIA_API_KEY;
    
    if (!API_KEY) {
      return res.status(500).json({ error: 'API key not configured' });
    }

    // Set a timeout for the fetch request
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout

    try {
      const response = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`,
          'Accept': 'application/json'
        },
        body: JSON.stringify(req.body),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('NVIDIA API error:', response.status, errorText);
        return res.status(response.status).json({ 
          error: `NVIDIA API returned ${response.status}`,
          details: errorText
        });
      }

      const data = await response.json();
      return res.status(200).json(data);
    } catch (fetchError) {
      if (fetchError.name === 'AbortError') {
        return res.status(504).json({ 
          error: 'Request timeout', 
          message: 'The request to the NVIDIA API timed out' 
        });
      }
      throw fetchError;
    }
  } catch (error) {
    console.error('Proxy error:', error.message);
    return res.status(500).json({ 
      error: 'Failed to proxy request', 
      message: error.message 
    });
  }
}

