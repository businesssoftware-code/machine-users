import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '../../src/common/auth/jwt.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async getUserById(id: number) {
    return await this.prisma.user.findUnique({
      where: { id: id },
    });
  }

  async userLogin(id: number, password: string) {
    const user = await this.validateUser(id, password);
    const accessToken = await this.jwtService.createAccessToken(
      user.id,
      user.name,
    );
    const refreshToken = await this.jwtService.createRefreshToken(
      user.id,
      user.name,
    );

    return {
      user,
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }

  async validateUser(id: number, password: string) {
    const user = await this.prisma.user.findUnique({ where: { id: id } });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }
}
