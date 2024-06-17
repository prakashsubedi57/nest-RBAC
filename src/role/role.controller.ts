import { Controller, Post, Body, Param, Put, Get } from '@nestjs/common';
import { RoleService } from './role.service';
import { Role } from './entities/role.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRolePolicyDto } from './dto/update-role-policy.dto';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) { }

  @Post()
  async create(@Body() createRoleDto: CreateRoleDto): Promise<Role> {
    return this.roleService.create(createRoleDto);
  }

  @Post(':roleId/policies/:policyId')
  updateRolePolicy(
    @Param('roleId') roleId: string,
    @Param('policyId') policyId: string,
    @Body() updateRolePolicyDto: UpdateRolePolicyDto) {
    return this.roleService.updateRolePolicy(roleId, policyId, updateRolePolicyDto);
  }

  @Get()
  getRoles() {
    return this.roleService.getRoles();
  }
}
