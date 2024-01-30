import { Injectable } from '@nestjs/common';
import { CreatePromotionHistoryInput } from './dto/create-promotion_history.input';
import { UpdatePromotionHistoryInput } from './dto/update-promotion_history.input';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PromotionHistoryService{
constructor(private readonly prisma: PrismaService) {}
  async create(createPromotionHistoryInput: CreatePromotionHistoryInput) {
    try {
      const promotion = await this.prisma.promotion.findUnique({
        where: { id: createPromotionHistoryInput.promotion_id },
      });

      // Check if the promotion limit is 0 (unlimited)
      const isUnlimited = promotion.limit === 0;

      if (!isUnlimited && promotion.amount === 0) {
        throw new Error("Promotion amount is already 0. Cannot create PromotionHistory.");
      }

      const currentDate = new Date();
      const startDate = new Date(promotion.start_at);
      const expiredDate = new Date(promotion.expired_at);

      if (currentDate >= startDate && currentDate <= expiredDate) {
        const newPromotionHistory = await this.prisma.promotionHistory.create({
          data: {
            promotion_id: createPromotionHistoryInput.promotion_id,
            user_uid: createPromotionHistoryInput.user_uid,
          },
        });

        console.log("New PromotionHistory:", newPromotionHistory);

        if (!isUnlimited) {
          const updatedPromotion = await this.prisma.promotion.update({
            where: { id: createPromotionHistoryInput.promotion_id },
            data: {
              history: {
                connect: { id: newPromotionHistory.id },
              },
              amount: {
                decrement: 1,
              },
            },
            include: {
              history: true,
            },
          });

          console.log("Updated Promotion:", updatedPromotion);
        }

        return await newPromotionHistory;
      } else {
        throw new Error("Current date is outside the promotion duration. Cannot create PromotionHistory.");
      }
    } catch (error) {
      console.error("Error creating PromotionHistory:", error);
      throw new Error("Failed to create PromotionHistory.");
    }
  }

  async findAll() {
    return await this.prisma.promotionHistory.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.promotionHistory.findFirst({
      where: {
        id: id,
      }
    });
  }

  async findPromotionHistoryById(id: number) {
    return await this.prisma.promotionHistory.findUnique({
      where: { id: id },
    });
  }

  async findPromotionHistoriesByPromotionId(id: number) {
    return await this.prisma.promotionHistory.findMany({
      where: { promotion_id: id },
    });
  }
  
  

  async findByPromotionId(promotion_id) {
    try {
      return await this.prisma.promotionHistory.findFirst({
        where: {
          promotion_id: promotion_id,
        },
      });
    } catch (error) {
      console.error(error);
      throw new Error("Failed to find promotion history by promotion_id.");
    }
  }
  

  async update(id: number, updatePromotionHistoryInput: UpdatePromotionHistoryInput) {
    const input = { ...updatePromotionHistoryInput };
    return await this.prisma.promotionHistory.update({
      where: {
        id: id,
      },
      data: input,
    });
  }

  async remove(id: number) {
    return await this.prisma.promotionHistory.delete({
      where: {
        id: id,
      },
    });
  }
}
