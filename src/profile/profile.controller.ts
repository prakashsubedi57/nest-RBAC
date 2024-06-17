import { Controller, Get, Post, Body, Param, UseInterceptors, UseGuards, Request, UploadedFile, } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FileUploadInterceptor } from 'src/common/interceptors/file-upload.interceptor';
import { SearchProfileDto } from './dto/search.dto';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileUploadInterceptor('profile'))
  create(@Request() req, @Body() createProfileDto: CreateProfileDto, @UploadedFile() file: Express.Multer.File) {
    return this.profileService.create(req.user, createProfileDto, file);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Request() request: any) {
    return this.profileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.profileService.findOne(+id);
  }

  @Post('search')
  // @UseGuards(JwtAuthGuard)
  search(@Body() searchProfileDto: SearchProfileDto) {
    return this.profileService.search(searchProfileDto);
  }

}
