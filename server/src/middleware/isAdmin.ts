import { Request, Response, NextFunction } from 'express';
import { IUser } from '../models/User';

interface AuthRequest extends Request {
  user?: IUser;
}

export const isAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }

  next();
};
