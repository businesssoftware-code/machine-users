import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import { Payload } from './userDeserializer';

@Injectable()
export class JwtService {
  private secret: string;
  constructor(private configService: ConfigService) {
    this.secret = this.configService.get<string>('JWT_SECRET');
  }

  createAccessToken(userId: number, name: string) {
    const token = jwt.sign({ userId, name }, this.secret);
    return token;
  }

  createRefreshToken(userId: number, name: string) {
    const token = jwt.sign({ userId, name }, this.secret);
    return token;
  }

  validateJwtToken(token: string) {
    try {
      const payload = jwt.verify(token, this.secret) as Payload;
      return { payload};
    } catch (error) {
      return {
        payload: null,
        error: 'Invalid token',};
    }
  }

  exchangeRefreshTokenForAccess(refreshToken: string) {
    const decoded = jwt.verify(refreshToken, this.secret) as {
      userId: number;
      name: string;
    };

    return this.createAccessToken(decoded.userId, decoded.name);
  }
}
