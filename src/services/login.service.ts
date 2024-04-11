import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class LoginService {
  constructor(private jwtService: JwtService) {}

  validateUser(username: string, password: string): any {
    if (username === 'jose' && password === 'jose') {
      return {
        username: 'Jose',
        roles: ['Admin'],
      };
    }
    if (username === 'juan' && password === 'juan') {
      return {
        username: 'Juan',
        roles: ['user, reg-latam', 'co-argentina'],
      };
    }
    return false;
  }

  login(user: any) {
    const payload = user;
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
