import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { SearchStudentDto } from './dto/search-student.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PoliciesGuard } from 'src/casl/policies.guard';
import { checkAbilites } from 'src/casl/abilities.decorator';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) { }

  @Post()
  @checkAbilites({ action: 'Create', subject: 'Student'})
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.create(createStudentDto);
  }

  @Get()
  @checkAbilites({ action: 'Read', subject: 'Student'})
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  findAll() {
    return this.studentService.findAll();
  }

  @Get(':id')
  @checkAbilites({ action: 'View', subject: 'Student'})
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  findOne(@Param('id') id: string) {
    return this.studentService.findOne(id);
  }

  @Patch(':id')
  @checkAbilites({ action: 'Update', subject: 'Student'})
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentService.update(id, updateStudentDto);
  }

  @Delete(':id')
  @checkAbilites({ action: 'Delete', subject: 'Student'})
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  remove(@Param('id') id: string) {
    return this.studentService.remove(id);
  }

  @Post('filter')
  filter(@Body() searchStudentDto: SearchStudentDto) {
    return this.studentService.filter(searchStudentDto);
  }
}
