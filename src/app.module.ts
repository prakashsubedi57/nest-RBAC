import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentModule } from './student/student.module';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { PolicyModule } from './policy/policy.module';
import { CaslModule } from './casl/casl.module';
import { JwtStrategy } from './auth/jwt.strategy';
import { PoliciesGuard } from './casl/policies.guard';
import { ProfileModule } from './profile/profile.module';
import { CurrentUserInterceptor } from './interseptor/auth.inceptors';
import { PolicySeeder } from './policy/entities/policy.seeder';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://lpsubedi2002:tWAJcYvOYB8wJHdQ@cluster0.3ikyyqc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'),
    StudentModule,
    RoleModule,
    PolicyModule,
    UserModule,
    CaslModule,
    ProfileModule,
  ],
  controllers: [],
  providers: [JwtStrategy, PoliciesGuard, CurrentUserInterceptor,PolicySeeder],
  exports: [],
})
export class AppModule {
  constructor(private readonly policySeeder: PolicySeeder) {
    this.policySeeder.seed();
  }
}
