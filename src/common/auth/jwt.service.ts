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

  createAccessToken(userId: number, email: string, name: string) {
    const token = jwt.sign({ userId, email, name }, this.secret, {
      expiresIn: '1h',
    });
    return token;
  }

  createRefreshToken(userId: number, email: string, name: string) {
    const token = jwt.sign({ userId, email, name }, this.secret, {
      expiresIn: '1y',
    });
    return token;
  }

  validateJwtToken(token: string) {
    try {
      const payload = jwt.verify(token, this.secret) as Payload;
      return { payload, expired: false };
    } catch (error) {
      return {
        payload: null,
        expired: 'Token expired',
      };
    }
  }

  exchangeRefreshTokenForAccess(refreshToken: string) {
    const decoded = jwt.verify(refreshToken, this.secret) as {
      userId: number;
      email: string;
      name: string;
    };

    return this.createAccessToken(decoded.userId, decoded.email, decoded.name);
  }
}
