import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import { JwtPayload } from '../interfaces';

import jwt from 'jsonwebtoken';

const secretKey = process.env?.JWT_SECRET || '123456789';

export const authMiddleware =
  (handler: NextApiHandler): NextApiHandler =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    if (
      !req.headers.authorization ||
      !req.headers.authorization.startsWith('Bearer ')
    ) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const accessToken = req.headers.authorization.split(' ')[1];

    try {
      const jwtPayload: JwtPayload = jwt.verify(
        accessToken,
        secretKey
      ) as JwtPayload;

      //@ts-ignore
      req.jwtPayload = jwtPayload;
      return await handler(req, res);
    } catch (error) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  };
