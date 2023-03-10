import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AdminUser } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, providedPassword: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);

    const validPassword = bcrypt.compare(providedPassword, user.password);

    if (!validPassword) return null;

    const { password, ...result } = user;

    return result;
  }

  async login(user: AdminUser) {
    const payload = { email: user.email, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
