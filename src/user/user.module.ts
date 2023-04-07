import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { SessionSerializer } from './session.serializer';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [PassportModule.register({ session: true })],
  controllers: [UserController],
  providers: [UserService, LocalStrategy, SessionSerializer, PrismaService],
})
export class UserModule {}
