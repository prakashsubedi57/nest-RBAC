import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from 'src/auth/dto/LoginUser.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { checkAbilites } from 'src/casl/abilities.decorator';
import { PoliciesGuard } from 'src/casl/policies.guard';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @checkAbilites({ action: 'Manage', subject: 'Student'})
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @checkAbilites({ action: 'Read', subject: 'User'})
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @checkAbilites({ action: 'Update', subject: 'Student'})
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @checkAbilites({ action: 'Delete', subject: 'Student'})
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  
  @Post('login')
  @UsePipes(new ValidationPipe())
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.userService.loginUser(loginUserDto);
  }

}
