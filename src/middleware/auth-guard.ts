import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class JwtMiddlewareGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.getTokenEncabezado(request.headers.authorization);

    if (!token) {
      return false;
    }

    try {
      const usuarioEnToken = this.jwtService.decode(token);
      request.user = usuarioEnToken;
      return true;
    } catch (error) {
      return false;
    }
  }

  private getTokenEncabezado(encabezadoAuth: string): string | null {
    if (!encabezadoAuth || !encabezadoAuth.startsWith('Bearer ')) {
      return null;
    }
    return encabezadoAuth.split(' ')[1];
  }
}
