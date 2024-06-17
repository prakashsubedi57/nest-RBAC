import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema },]),
    JwtModule.register({
      secret: 'anonymous',
      signOptions: { expiresIn: '60m' },
    }),
  ],

  controllers: [UserController],
  providers: [UserService,JwtService],
  exports: [UserService,MongooseModule],
})
export class UserModule { }
