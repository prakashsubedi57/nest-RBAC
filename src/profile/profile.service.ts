import { BadRequestException, Injectable, Req } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Profile } from './entities/profile.entity';
import { Model } from 'mongoose';
import { SearchProfileDto } from './dto/search.dto';

@Injectable()
export class ProfileService {
  constructor(@InjectModel(Profile.name) private profileModel: Model<Profile>) { }

  create(user: any, createProfileDto: CreateProfileDto, image: Express.Multer.File) {
    if (!image) {
      throw new BadRequestException('Image file is required');
    }
    const checkProfile = this.profileModel.find({ user: user._id });
    if (checkProfile) {
      const profile = checkProfile.updateOne({ ...createProfileDto, image: image.filename }).exec();
      return profile;
    } else {
      const profile = new this.profileModel({ ...createProfileDto, image: image.filename, user: user._id }).save();
      return profile;
    }
  }

  findAll() {
    return this.profileModel.find().populate('user').exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} profile`;
  }

  search(searchProfileDto: SearchProfileDto) {
    let data = this.profileModel.find();
    if (searchProfileDto.dob_order) {
      data = data.sort({ dob: searchProfileDto.dob_order === 'ASC' ? 1 : -1 });
    }
    if (searchProfileDto.created_order) {
      data = data.sort({ createdAt: searchProfileDto.created_order === 'ASC' ? 1 : -1 });
    }
    if (searchProfileDto.updated_order) {
      data = data.sort({ updatedAt: searchProfileDto.updated_order === 'ASC' ? 1 : -1 });
    }
    if (searchProfileDto.title) {
      const titleRegex = new RegExp(searchProfileDto.title, 'i');
      data = data.or([{ name: titleRegex }, { address: titleRegex }]);
    }
    return data.exec();
  }

}
