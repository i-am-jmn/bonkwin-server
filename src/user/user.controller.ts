import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { LocalAuthGuard } from './local.auth.guard';
import { AuthenticatedGuard } from './authenticated.guard';
import { User } from '@prisma/client';
import { Session } from 'express-session';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthenticatedGuard)
  @Get()
  public getCurrentUser(@Request() req: { user: User }) {
    return {
      id: req.user.id,
      email: req.user.email,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
    };
  }

  @Post('/sign-up')
  public async signUp(@Body() createUserDto: CreateUserDto) {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      saltOrRounds,
    );

    const user = await this.userService.create({
      email: createUserDto.email,
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      password: hashedPassword,
    });

    return {
      id: user.id,
    };
  }

  @UseGuards(LocalAuthGuard)
  @Post('/sign-in')
  public signIn(@Request() req: { user: User }) {
    return {
      id: req.user.id,
    };
  }

  @UseGuards(AuthenticatedGuard)
  @Post('/sign-out')
  public signOut(@Request() req: { session: Session }) {
    req.session.destroy(null);
  }
}
