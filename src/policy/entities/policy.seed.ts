import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { PolicyService } from '../policy.service';
import { Policy } from './policy.entity';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const policyService = app.get(PolicyService);

  const policies: Policy[] = [
    { policy: 'User', description: 'User Management' },
    { policy: 'Role', description: 'Role Management' },
    { policy: 'Student', description: 'Student Management' },
    { policy: 'Profile', description: 'Profile Management' },
  ];

  for (const policy of policies) {
    await policyService.create(policy);
  }

  await app.close();
}
bootstrap();
