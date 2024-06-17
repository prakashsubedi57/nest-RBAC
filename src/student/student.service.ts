import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Student } from './entities/student.entity';
import { Model } from 'mongoose';
import { SearchStudentDto } from './dto/search-student.dto';

@Injectable()
export class StudentService {
  constructor(@InjectModel(Student.name) private studentData: Model<Student>) { }
  create(createStudentDto: CreateStudentDto) {
    const student = new this.studentData(createStudentDto);
    return student.save();
  }

  findAll() {
    const students = this.studentData.find()
    return students.exec();
  }

  findOne(id: string) {
    const student = this.studentData.findById(id);
    return student.exec();
  }

  update(id: string, updateStudentDto: UpdateStudentDto) {
    const student = this.studentData.findByIdAndUpdate(id, updateStudentDto);
    return student.exec();
  }

  remove(id: string) {
    const student = this.studentData.findByIdAndDelete(id);
    return student.exec();
  }

  filter(searchStudentDto: SearchStudentDto) {
    const { name, email, contact, createdAt, updatedAt, page, limit } = searchStudentDto;
    const query: any = {};

    if (name) query.name = new RegExp(name, 'i');
    if (email) query.email = new RegExp(email, 'i');
    if (contact) query.contact = new RegExp(contact, 'i');

    const sort: any = {};
    if (createdAt) sort['createdAt'] = createdAt === 'asc' ? 1 : -1;
    if (updatedAt) sort['updatedAt'] = updatedAt === 'asc' ? 1 : -1;


    const skip = (page - 1) * limit;

    const student = this.studentData
                        .find(query)
                        .sort(sort)
                        .skip(skip)
                        .limit(limit);
    return student.exec();
  }
}
