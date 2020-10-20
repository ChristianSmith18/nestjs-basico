import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';

// DTO
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  public async getUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  public async createUser(createUserDTO: CreateUserDto): Promise<User | any> {
    if (
      (await this.userRepository.findOne(createUserDTO.email)) === undefined
    ) {
      const user = this.userRepository.create(createUserDTO);
      return await this.userRepository.save(user);
    }
    return [];
  }

  public async updateUser(updateUserDto: UpdateUserDto) {
    return await this.userRepository.update(updateUserDto.email, updateUserDto);
  }

  public async deleteUser(email: string) {
    return await this.userRepository.delete(email);
  }
}
