import { Request, Response, NextFunction } from 'express';
import { Timestamp } from 'typeorm';
import { verify } from 'jsonwebtoken';
import authConfig from '@config/auth';

import AppError from '@shared/errors/AppError';

interface TokenPayloadType {
  expiresIn: string;
  iat: Timestamp;
  subject: string;
}

export default function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError('Missing JWT token.', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.jwt.secret);

    const { subject: userId } = decoded as TokenPayloadType;

    req.user = {
      id: userId,
    };

    return next();
  } catch {
    throw new AppError('JWT token is invalid.', 401);
  }
}
