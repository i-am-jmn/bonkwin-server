import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  public async create(user: Omit<User, 'id'>) {
    return await this.prismaService.user.create({
      data: user,
    });
  }

  public async findById(id: string): Promise<User | null> {
    return await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });
  }

  public async findByEmail(email: string): Promise<User | null> {
    return await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
  }

  public async validate(email: string, password: string): Promise<User | null> {
    try {
      const user = await this.findByEmail(email);

      if (user !== null && (await bcrypt.compare(password, user.password))) {
        return user;
      }
    } catch {
      throw new UnauthorizedException();
    }
  }
}
