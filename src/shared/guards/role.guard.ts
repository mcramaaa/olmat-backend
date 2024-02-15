import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // const requiredRoles = this.reflector.getAllAndOverride<APP_ROLES[]>(
    //   ROLES_KEY,
    //   [context.getHandler(), context.getClass()],
    // );
    // if (!requiredRoles) {
    //   return true;
    // }
    context.switchToHttp().getRequest();
    return true;
    // return requiredRoles.some((role) => user.role?.includes(role));
  }
}
