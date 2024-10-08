export async function retryOriginalRequest(originalResponse: Response, newToken: string): Promise<any> {
  const originalRequest = {
    method: originalResponse.url,
    headers: {
      ...originalResponse.headers,
      'Authorization': `Bearer ${newToken}`
    },
    body: originalResponse.body
  };

  const retryResponse = await fetch(originalResponse.url, originalRequest);
  const retryText = await retryResponse.text();
  return retryText && JSON.parse(retryText);
}

export const formatCardNumber = (value:string) => {
  const cleaned = value.replace(/\s+/g, '');
  const limited = cleaned.slice(0, 16);
  return limited.replace(/(\d{4})/g, '$1 ').trim();
};