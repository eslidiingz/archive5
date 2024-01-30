import { Module } from '@nestjs/common';
import { PromotionHistoryService } from './promotion_history.service';
import { PromotionHistoryResolver } from './promotion_history.resolver';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [PromotionHistoryResolver, PromotionHistoryService, PrismaService]
})
export class PromotionHistoryModule {}
