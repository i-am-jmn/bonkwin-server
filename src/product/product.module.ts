import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { PrismaService } from 'src/prisma.service';
import { ProductService } from './product.service';

@Module({
  controllers: [ProductController],
  providers: [PrismaService, ProductService],
})
export class ProductModule {}
