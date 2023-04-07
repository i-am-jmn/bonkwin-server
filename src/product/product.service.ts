import { Injectable } from '@nestjs/common';
import { Product } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProductService {
  constructor(private prismaService: PrismaService) {}

  public async create(product: Omit<Product, 'id' | 'owner'>) {
    return await this.prismaService.product.create({
      data: product,
    });
  }

  public async findById(id: string) {
    return await this.prismaService.product.findUnique({
      where: {
        id,
      },
    });
  }

  public async findByOwner(ownerId: string) {
    return await this.prismaService.product.findMany({
      where: {
        ownerId,
      },
    });
  }

  public async delete(id: string) {
    return await this.prismaService.product.delete({
      where: {
        id,
      },
    });
  }
}
