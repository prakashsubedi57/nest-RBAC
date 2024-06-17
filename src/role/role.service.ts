import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role } from './entities/role.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRolePolicyDto } from './dto/update-role-policy.dto';

@Injectable()
export class RoleService {
  constructor(@InjectModel(Role.name) private readonly roleModel: Model<Role>) { }

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const createdRole = new this.roleModel(createRoleDto);
    return createdRole.save();
  }

  async updateRolePolicy(roleId: string, policyId: string, updateRolePolicyDto: UpdateRolePolicyDto) {
    // return 'here';
    try {
      // return roleId;
      const role = await this.roleModel.findById(roleId);

      if (!role) {
        throw new Error('Role not found');
      }

      const policy = role.policies.find((p) => p.policyId.toString() === policyId);
      if (!policy) {
        throw new Error('Policy not found');
      }
      // return policy;

      policy.MANAGE = updateRolePolicyDto.MANAGE ;
      policy.CREATE = updateRolePolicyDto.CREATE ;
      policy.READ = updateRolePolicyDto.READ ;
      policy.UPDATE = updateRolePolicyDto.UPDATE ;
      policy.DELETE = updateRolePolicyDto.DELETE ;

      role.save();
      return role;
    } catch (error) {
      throw new Error(`Failed to update policy for role: ${error.message}`);
    }
  }

  getRoles() {
    return this.roleModel.find().populate('policies.policyId').exec();
  }
}
