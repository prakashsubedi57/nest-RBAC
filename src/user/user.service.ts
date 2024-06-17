import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcryptjs';
import { LoginUserDto } from 'src/auth/dto/LoginUser.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>,
  private jwtService: JwtService,
) { }

  async findAll() {
    return this.userModel.find().populate({ path: 'role', populate: { path: 'policies.policyId' } }).exec();

  }
  
  async findOne(id: string) {
    return this.userModel.findById(id).exec();
  }

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const createdUser = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
    }); return createdUser.save();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
  }

  async remove(id: string) {
    return this.userModel.findByIdAndDelete(id).exec();
  }

  async validateUserById(userId: string): Promise<User | null> {
    // return this.userModel.findById(userId).exec();
    return this.userModel.findById(userId).populate({
      path: 'role',
      populate: {
        path: 'policies.policyId'
      }
    }).exec();
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userModel.findOne({ email }).exec();
    if (user && await bcrypt.compare(pass, user.password as string)) {
      const { password, ...result } = user.toObject();
      return result;
    }
    return null;
  }

  async loginUser(loginUserDto: LoginUserDto) {
    const user = await this.validateUser(loginUserDto.email, loginUserDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { email: user.email, sub: user._id, role: user.role };
    return {
      user: user,
      access_token: this.jwtService.sign(payload, {
        secret: 'anonymous',
      }),      
    };
  }

  async findUserById(userId: string): Promise<User> {
    return this.userModel.findById(userId).populate({
      path: 'role',
      populate: {
        path: 'policies.policyId'
      }
    }).exec();
  }

  // async findAllPermissionsOfUser(user: User) {
  //   return await this.userModel.(user);
  // }
}
