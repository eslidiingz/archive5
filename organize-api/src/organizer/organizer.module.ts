import { Module } from '@nestjs/common';
import { OrganizerService } from './organizer.service';
import { OrganizerResolver } from './organizer.resolver';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [OrganizerResolver, OrganizerService, PrismaService, JwtService],
  exports: [OrganizerService],
})
export class OrganizerModule {}
