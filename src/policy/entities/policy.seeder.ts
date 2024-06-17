
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Policy } from './policy.entity';

@Injectable()
export class PolicySeeder {
  constructor(@InjectModel('Policy') private readonly policyModel: Model<Policy>) {}

  async seed() {
    try {
      await this.policyModel.deleteMany({}); 

      await this.policyModel.create({
        policy: 'User',
        description: 'Description for User',
      });

      await this.policyModel.create({
        policy: 'Role',
        description: 'Description for Role',
      });
      await this.policyModel.create({
        policy: 'Student',
        description: 'Description for Student',
      });

      await this.policyModel.create({
        policy: 'Profile',
        description: 'Description for Profile',
      });

      console.log('Policies seeded successfully.');
    } catch (error) {
      console.error('Error seeding policies:', error);
    }
  }
}
