import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentModule } from './student/student.module';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { PolicyModule } from './policy/policy.module';
import { CaslModule } from './casl/casl.module';
import { JwtStrategy } from './auth/jwt.strategy';
import { PoliciesGuard } from './casl/policies.guard';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://lpsubedi2002:tWAJcYvOYB8wJHdQ@cluster0.3ikyyqc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'),
    StudentModule,
    RoleModule,
    PolicyModule,
    UserModule,
    CaslModule, 
  ],
  controllers: [],
  providers: [JwtStrategy, PoliciesGuard],
  exports: [],
})
export class AppModule {}
