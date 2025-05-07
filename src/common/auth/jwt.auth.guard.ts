import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from './jwt.service';
import { UserService } from '../../users/user.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers['authorization'];

    if (!authorization) {
      throw new UnauthorizedException('Authorization header missing');
    }

    const token = authorization.split('Bearer ')[1];
    if (!token) {
      throw new UnauthorizedException('Token missing');
    }

    const decoded = this.jwtService.validateJwtToken(token);
    if (decoded.payload && decoded.payload.userId) {
      request.user = await this.userService.getUserById(decoded.payload.userId); // Ensure userService is injected
      return true;
    }

    throw new UnauthorizedException('Invalid token');
  }
}
