import { Injectable, ForbiddenException } from '@nestjs/common';
import { RequiredRule } from './abilities.decorator';

@Injectable()
export class PolicyCheckerService {
    checkPolicies(user, rules: RequiredRule[]): boolean {
        if (user.role.name === 'superuser') {
            return true;
        }

        let hasAccess = false;

        user.role.policies.forEach(policy => {
            if (policy.policyId.policy === rules[0]['subject']) {
                if (rules[0]['action'] === 'Manage'&& policy.MANAGE === true) {
                    hasAccess = true;
                }
                if (rules[0]['action'] === 'Read' && policy.READ === true) {
                    hasAccess = true;
                }
                if (rules[0]['action'] === 'Create' && policy.CREATE === true) {
                    hasAccess = true;
                }
                if (rules[0]['action'] === 'Update' && policy.UPDATE === true) {
                    hasAccess = true;
                }
                if (rules[0]['action'] === 'Delete' && policy.DELETE === true) {
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
