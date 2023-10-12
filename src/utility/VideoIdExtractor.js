export function extractVideoId(url) {
    console.log(url)
    try {
      const urlParts = url.split('?');
      if (urlParts.length < 2) {
        throw new Error('Invalid URL: No query string found');
      }
  
      const queryString = urlParts[1];
      const params = queryString.split('&');
      for (const param of params) {
        const [key, value] = param.split('=');
        if (key === 'v') {
          return value;
        }
      }
  
      throw new Error('Video ID not found in query string');
    } catch (error) {
      console.error('Error extracting video ID:', error.message);
      return null;
    }
  }
  
 