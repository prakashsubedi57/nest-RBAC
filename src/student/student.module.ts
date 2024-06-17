import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { Student, StudentSchema } from './entities/student.entity';
import { CaslModule } from '../casl/casl.module'; 
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Student.name, schema: StudentSchema }]),
    // CaslModule, 
    UserModule
  ],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
