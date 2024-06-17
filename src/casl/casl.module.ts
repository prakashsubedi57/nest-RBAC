import { Module } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';
import { JwtService } from '@nestjs/jwt';


@Module({
  imports:[UserModule],
  providers: [UserService,JwtService],
  exports: [CaslModule],
})
export class CaslModule {}
