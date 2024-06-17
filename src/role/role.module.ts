import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';
import { Role, RoleSchema } from './entities/role.entity';
import { Policy, PolicySchema } from 'src/policy/entities/policy.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }]),
            MongooseModule.forFeature([{ name: Policy.name, schema: PolicySchema }]),
  ],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule { }
