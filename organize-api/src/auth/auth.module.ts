import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { JwtModule } from '@nestjs/jwt';
import { OrganizerService } from 'src/organizer/organizer.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { OrganizerModule } from 'src/organizer/organizer.module';
import { JWTStrategy } from './strategy/jwt.strategy';
import { LocalStrategy } from './strategy/local.strategy';

@Module({
  imports: [
    OrganizerModule,
    JwtModule.register({
      global: true,
      signOptions: {
        expiresIn: '10h',
      },
      secret: 'test-secret',
    }),
  ],
  providers: [
    AuthResolver,
    AuthService,
    OrganizerService,
    PrismaService,
    JWTStrategy,
    LocalStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}
