import { UserService } from './user.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';

// DTO
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly _user: UserService) {}

  @Get()
  private async getUsers(@Res() response: Response) {
    try {
      const users = await this._user.getUsers();
      return response.status(HttpStatus.OK).json({ ok: true, users });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({ ok: false, error });
    }
  }

  @Post()
  private async createUser(
    @Body() createUserDTO: CreateUserDto,
    @Res() response: Response,
  ) {
    try {
      const user = await this._user.createUser(createUserDTO);
      if (user?.length < 1) {
        return response
          .status(HttpStatus.BAD_REQUEST)
          .json({ ok: false, error: 'User already exists.' });
      }
      return response.status(HttpStatus.OK).json({ ok: true, user });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({ ok: false, error });
    }
  }

  @Put()
  private async updateUser(
    @Body() updateUserDto: UpdateUserDto,
    @Res() response: Response,
  ) {
    try {
      const user = await this._user.updateUser(updateUserDto);

      if (user.affected === 0) {
        return response
          .status(HttpStatus.BAD_REQUEST)
          .json({ ok: false, error: 'User does not exists.' });
      }
      return response
        .status(HttpStatus.OK)
        .json({ ok: true, user: updateUserDto });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({ ok: false, error });
    }
  }

  @Delete()
  private async deleteUser(
    @Query('email') email: string,
    @Res() response: Response,
  ) {
    try {
      const user = await this._user.deleteUser(email);

      if (user.affected === 0) {
        return response
          .status(HttpStatus.BAD_REQUEST)
          .json({ ok: false, error: 'User does not exists.' });
      }
      return response.status(HttpStatus.OK).json({ ok: true, user: [] });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({ ok: false, error });
    }
  }
}
