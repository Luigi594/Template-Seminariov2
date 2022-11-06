const apiKeys = (process.env.API_KEYS || '').split('|');

const validateApiKey = (apiKey: string) => {
  return apiKeys.includes(apiKey);
};

export default validateApiKey;
