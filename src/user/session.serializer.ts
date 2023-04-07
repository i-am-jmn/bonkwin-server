import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { User } from '@prisma/client';
import { UserService } from './user.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private usersService: UserService) {
    super();
  }

  public serializeUser(
    user: User,
    done: (err: Error | null, user: string | null) => void,
  ): void {
    done(null, user.id);
  }

  public async deserializeUser(
    payload: string,
    done: (err: Error | null, user: User | null) => void,
  ): Promise<void> {
    const user = await this.usersService.findById(payload);
    if (user === null) done(new UnauthorizedException(), null);
    else done(null, user);
  }
}
