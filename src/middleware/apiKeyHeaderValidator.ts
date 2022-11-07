import validateApiKey from '@server/utils/apiKeyValidator';
import { NextFunction, Request, Response } from 'express';

const apiKeyMW = (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.get('apiKey') || '';

  if (validateApiKey(apiKey)) {
    return next();
  }

  return res.status(406).json({ error: 'APIKEY not valid!' });
};

export default apiKeyMW;
