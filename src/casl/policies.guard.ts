import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserService } from 'src/user/user.service';
import { CHECK_ABILITY, RequiredRule } from './abilities.decorator';

@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private userService: UserService,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {

    const rules: any =
      this.reflector.get<RequiredRule[]>(CHECK_ABILITY, context.getHandler()) ||
      [];

    if (!rules) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    const thisuser = await this.userService.findUserById(user._id);

    if (!user) {
      throw new ForbiddenException('User not found');
    }

    if (!thisuser.role) {
      throw new ForbiddenException('User does not have a role assigned');
    }

    if (thisuser.role.name === 'superuser') {
      return true;
    }

    let hasAccess = false;

    thisuser.role.policies.forEach(policy => {
      if (policy.policyId.policy == rules[0]['subject']) {
        if (rules[0]['action'] == 'Manage' && policy.MANAGE == true) {
          hasAccess = true;
        }
        if (rules[0]['action'] == 'Read' && policy.READ == true) {
          hasAccess = true;
        }
        if (rules[0]['action'] == 'Create' && policy.CREATE == true) {
          hasAccess = true;
        }
        if (rules[0]['action'] == 'Update' && policy.UPDATE == true) {
          hasAccess = true;
        }
        if (rules[0]['action'] == 'Delete' && policy.DELETE == true) {
          hasAccess = true;
        }
      }
    });

    if (!hasAccess) {
      throw new ForbiddenException('You do not have permission to perform this action');
    }
    return hasAccess;
  }
}
