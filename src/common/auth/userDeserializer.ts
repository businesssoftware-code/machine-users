import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '../../../../src/common/utils';
import { UserService } from '../../../../src/lms/users/user.service';

export interface Payload {
  id?: number;
  userId?: number;
  email?: string;
}

@Injectable()
export class UserDeserializer implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authorization = req.headers['authorization'];
    if (!authorization) {
      return next();
    }

    const token = authorization.split('Bearer ')[1];
    if (!token) {
      return next();
    }

    const decoded = this.jwtService.validateJwtToken(token);
    if (decoded && decoded.payload?.userId) {
      const user = await this.userService.getUserById(decoded.payload.userId);
      if (user) {
        (req as any).user = user; // or extend `Request` type if you want full typing
      }
    }

    next();
  }
}
