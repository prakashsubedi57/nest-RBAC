import { Injectable } from '@nestjs/common';
import { CreatePolicyDto } from './dto/create-policy.dto';
import { UpdatePolicyDto } from './dto/update-policy.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Policy } from './entities/policy.entity';
import { Model } from 'mongoose';

@Injectable()
export class PolicyService {
  constructor(@InjectModel(Policy.name) private readonly policyModel: Model<Policy>) { }
  create(createPolicyDto: CreatePolicyDto) {
    const policy = new this.policyModel(createPolicyDto);
    return policy.save();
  }

  findAll() {
    return this.policyModel.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} policy`;
  }

  update(id: number, updatePolicyDto: UpdatePolicyDto) {
    return `This action updates a #${id} policy`;
  }

  remove(id: number) {
    return `This action removes a #${id} policy`;
  }
}
